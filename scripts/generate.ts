import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { CSVLoader } from "@langchain/community/document_loaders/fs/csv";
import { Document } from "langchain/document";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { CharacterTextSplitter } from "langchain/text_splitter";
import { getVectorStore } from "../src/lib/pineconedb";

async function generate_embeddings() {
  const vectorstores = await getVectorStore();

  const loader = new DirectoryLoader(
    "src/app/retailStore",
    {
      ".csv": (path) => new CSVLoader(path),
    },
    true
  );

  const docs = await loader.load();

  // Process documents
  const updatedDocs = docs.map((doc) => {
    const contentLines = doc.pageContent
      .split("\n")
      .filter((line) => line.trim() !== "");
    const metadata: Record<string, string> = {};

    contentLines.forEach((line) => {
      const [key, value] = line.split(":").map((part) => part.trim());
      if (key && value !== undefined) {
        metadata[key] = value;
      }
    });

    // Update the document's metadata field
    return {
      ...doc,
      metadata,
    };
  });

  // Split the processed documents into chunks
  const splitter = new CharacterTextSplitter({
    separator: "\n",
    chunkSize: 500,
    chunkOverlap: 0,
    lengthFunction: (text) => text.length,
  });

  // // Await the result of splitText
  const splitDocs = await Promise.all(
    updatedDocs.map(async (doc) => {
      const chunks = await splitter.splitText(doc.pageContent); // Await the Promise here

      return chunks.map((chunk: string) => {
        return new Document({
          pageContent: chunk,
          metadata: doc.metadata,
        });
      });
    })
  );

  // Flatten the array of arrays into a single array
  const flattenedDocs = splitDocs.flat();

  await vectorstores.addDocuments(flattenedDocs);
}

generate_embeddings();
