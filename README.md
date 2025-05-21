# Task Management Web App



## Features
- ✅ Google OAuth 2.0 authentication (pending)
- ✅ Create, read, update, and delete tasks(completed)
- ✅ Task filtering and sorting(completed)
- ✅ PDF report generation(pending)
- ✅ Responsive design(completed)


## Tech Stack

### Frontend - used Lovable AI
- **React** with TypeScript
- **Vite** (Next-gen frontend tooling)
- **Shadcn/ui** (Beautifully designed components)
- **Tailwind CSS** (Utility-first CSS framework)
- **React Router** (Navigation)
- **Axios** (HTTP requests)

### Backend
- **Node.js** with Express
- **MongoDB** (Database)
- **Mongoose** (ODM)
- **Passport.js** (Authentication)
- **PDFKit** (PDF generation)

## Prerequisites
- Node.js (v18+ recommended)
- npm (v9+ recommended) or yarn
- MongoDB Atlas account (or local MongoDB instance)



## Setup Instructions

### 1. Clone the Repository

git clone https://github.com/your-username/task-manager.git

cd task-manager

### 2. Setup Backend

cd backend

npm install

### 3. Create a .env file in the backend directory

PORT=5001
MONGODB_URI=your_mongodb_connection_string
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_secret
JWT_SECRET=your_jwt_secret_key

## 4. Start the backend

npm run dev

## 5. Setup Frontend

cd ../frontend

npm install

## 6. Create a .env file in the frontend directory

VITE_API_URL=http://localhost:5001

## 7. Start the frontend

npm run dev

## Running the Application
Access the frontend at: http://localhost:5173
Access the backend at: http://localhost:5001


### Deployment
## Option 1: Vercel (Frontend)
- ✅Push your code to GitHub
- ✅Create a new project in Vercel
- ✅Connect your GitHub repository
- ✅Set environment variables
- ✅Deploy!

## Option 2: Render (Full-stack)
- ✅Create a new Web Service on Render
- ✅Connect your GitHub repository
- ✅Set environment variables
- ✅Deploy both frontend and backend


### Project Structure

## Project Structure

<details>
<summary>Backend Structure</summary>
backend/
├── src/
│ ├── config/
│ ├── controllers/
│ ├── models/
│ └── ...
└── package.json
</details>

<details>
<summary>Frontend Structure</summary>
frontend/
├── src/
│ ├── api/
│ ├── components/
│ └── ...
└── package.json
</details>

