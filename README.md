# Neuro Lead

## Overview

This project is an **AI-Powered Lead Management System** that scores, nurtures, and converts leads for you—automatically. It fetches data from n8n using custom workflows and scratch integrations, seamlessly connecting your lead generation efforts with a robust machine learning pipeline.

The system leverages a modern tech stack:
- **Frontend:** Developed with Next.js and React.js to deliver a dynamic and responsive user interface.
- **Backend:** Powered by Node.js, ensuring robust and scalable server-side operations.
- **Machine Learning:** Implements advanced NLP techniques such as word tokenization, stop word filtering, and WordNet lemmatization. A pre-trained BERT model computes cosine similarities to generate a lead score between 0 and 1. Based on these scores, leads are routed to appropriate visualization and analysis tools including Streamlit, Matplotlib, Seaborn, Harshlib, TF-IDF vectorization, and Word Cloud generation.

## Features

- **Conversational Interface:** Users can have dynamic and natural language conversations by inputting prompts or queries.
- **Backend Integration:** The Express backend manages communication with the OpenAI API, handling requests and responses seamlessly.
- **Data Persistence:** MongoDB is employed for storing user data, including prompts and model responses.

## Prerequisites

Before running the application, ensure you have the following installed:
- Node.js
- npm (Node Package Manager)
- MongoDB

## Setup

1.  Clone the repository:

    ```
    git clone https://github.com/bighnesh0007/Drcode
    ```
2.  Navigate to the project directory:
    
    cd Drcode 
    
3.  Install dependencies for both the client and server:
    ```
    # Install frontend dependencies
    cd frontend
    npm install
    # Install backend dependencies
    cd backend
    npm install
    ```
4.  Start the application:
    ```
    # Start the client (in the frontend directory)
    cd frontend
    npm run dev
    # Start the server (in the backed directory)
    cd backend
    npm run dev
    ```

## Website Screenshots

### Home Page

![1](https://github.com/user-attachments/assets/df919a94-a910-4e3e-8fea-bed569737cf3)

### Signin/Login Page

![2](https://github.com/user-attachments/assets/1241469f-05d6-49de-b929-ae923d9e7bac)

### How it Works

![3](https://github.com/user-attachments/assets/640c267e-9fa9-4c73-88d5-d40f0092a816)

### Other

![4](https://github.com/user-attachments/assets/85340024-4c63-4f98-bfc6-bec3b9ad863f)
