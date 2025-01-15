# This is a Proof Of Concept (POC) Sales-Assistant bot created with Next js, Tailwind-css, Langchain, Vercel AI SDK & OpenAI API

## Introduction

The digital commerce landscape demands intelligent systems that enhance customer engagement by offering seamless, interactive, and personalized experiences. This project leverages Next.js, Tailwind CSS, and MongoDB for a robust front-end and back-end setup, coupled with LangChain, OpenAI API, and Vercel AI SDK to create an AI-driven sales assistant bot. The bot answers product-related queries, provides recommendations, and guides users through the sales process with precision and efficiency.

## Table of Contents

[1. **Design Phase**](#1-Design-Phase)
   - Solution Architecture
   - Prompt Engineering
     
[2. **Implementation Phase**](#2-Implementation-Phase)
   - Prototype Development
   - Integration with external data

[3. **Testing Phase**](#3-Testing-Phase)
   - Test cases for validation
  
4. **Analysis Phase**  
   - Bot Performance Evaluation  
   - Bot Limitations and Areas for Improvement
  
5. **Conclusion**  
    - Summary of Achievements  
    - Future Directions for Scalability and Improvement
  
## 1. Design Phase  

![Design Process](public/images/Neexa%20design.drawio.png)  

The design process consists of the following steps:

1. **Dataset Preparation**:  
   A CSV file containing product data from Costco's online marketplace is used as the dataset; find it here [Dataset](https://www.kaggle.com/datasets/bhavikjikadara/grocery-store-dataset). It includes 19 sub-categories, with each product having attributes    such as price, ratings, discounts, title, features, and product descriptions.
   
   This dataset is embedded into **Pinecone**, a vector database, using the **OpenAI text-embedding model** for efficient similarity search.  

3. **Query Handling**:  
   When a user sends a query:  
   - If the query does not require additional context (e.g., "Hey"), it is directly combined with the prompt and sent to the **LLM** (Large Language Model), which generates a response.  
   - If the query requires contextual data from the Costco dataset (e.g., "What products do you have?"), the query is embedded and a similarity search is performed in the vector database 
     to retrieve relevant information.  

4. **Generating the Output**:  
   The relevant information retrieved from the similarity search is combined with the user query and prompt. This enriched data is then sent to the **LLM**, which generates the desired      output for the user.  

This design ensures the bot can handle both general and context-specific queries effectively, leveraging the power of embeddings and similarity search for precise responses.

## 2. Implementation Phase

The implementation phase is divided into two key steps:

### a) User Phone Number Data Gathering

![Login](public/images/lg.JPG)

In this step, a **MongoDB database** was used to store customer phone numbers.  
The primary purpose of collecting users' phone numbers is to enable **cold marketing campaigns**, allowing targeted outreach to potential customers.

### b) Creating an AI-Powered Shopping Assistant

![shopping-assistant](public/images/imp.JPG)

An **AI-powered shopping assistant** was developed using the embedded dataset stored in the **Pinecone database**.  
This setup provides the chatbot with **context-awareness**, enabling it to understand and address user needs effectively. By leveraging the embedded dataset, the chatbot can deliver relevant and personalized assistance to users.

## 3. Testing Phase

The chatbot underwent rigorous testing to ensure its functionality and effectiveness. The following tests were conducted:

### a) Context-Aware Test
This test evaluated the bot's ability to retrieve accurate information from the **vector store**. The results demonstrate that the bot successfully provides relevant and accurate responses, as shown in the image below:

![Context-Aware Test](public/images/test_1.JPG)

### b) Chat History Test
This test assessed the bot's capability to retain and reference information from previous conversations. The results indicate that the chatbot successfully maintains a **chat history**, as illustrated in the image below:

![Chat History Test](public/images/test_2.JPG)

### c) Recommendation Test
This test measured the bot's effectiveness in recommending products to customers. The chatbot performed exceptionally well, delivering relevant and valuable product recommendations, as depicted in the image below:

![Recommendation Test](public/images/test_3.JPG)


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
