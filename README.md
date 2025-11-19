#️⃣ Candidate Referral Management System

A full-stack MERN application that allows users to refer candidates, upload resumes, update candidate statuses, and manage referrals via a professional dashboard UI.
This project is structured like a real production system and is fully ready for interviews.

🚀 Tech Stack
Frontend

React (Vite)

Context API for State Management

Axios for API Calls

Responsive Black & Gold Theme UI

Fully Mobile Responsive

Backend

Node.js + Express

MongoDB + Mongoose

Multer (PDF Upload Handling)

CORS Enabled

MVC Architecture

📌 Features Implemented
Frontend

✔ Responsive professional UI (black + gold theme)
✔ Dashboard with:

Total candidates

Filter by status

Search by name/job/email

Animated metrics

Responsive cards

✔ Referral Form:

Name, Email, Phone, Job Title

PDF Resume Upload

Frontend validation

✔ Status Management

Update to Pending / Reviewed / Hired

✔ Delete Candidate Feature

✔ Global State (Context API)

Backend

✔ REST API (Express)
✔ MongoDB database
✔ Candidate CRUD operations
✔ File upload with Multer (.pdf only)
✔ Email + Phone Validation
✔ Error Handling Middleware
✔ Clean MVC Architecture
✔ Static File Serving for Uploads

📁 Project Folder Structure
candidate-referral-system/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   ├── uploads/
│   └── package.json
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── context/
    │   ├── services/
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    └── package.json

🔌 Backend API Documentation
Base URL:
http://localhost:5000

➤ 1. Create Candidate

POST /candidates

Body (multipart/form-data)
name: string
email: string
phone: string
jobTitle: string
resume: pdf file (optional)

Response:
{
  "success": true,
  "candidate": { ... }
}

➤ 2. Get All Candidates

GET /candidates

Response:
{
  "success": true,
  "candidates": []
}

➤ 3. Update Candidate Status

PUT /candidates/:id/status

Body:
{
  "status": "Reviewed"
}

Response:
{"success": true, "message": "Status Updated"}

➤ 4. Delete Candidate

DELETE /candidates/:id

Response:
{"success": true, "message": "Candidate deleted"}

⚙️ How to Run the Project Locally
1. Clone the Repository
git clone <your-repo-url>
cd candidate-referral-system

🟦 Backend Setup
cd backend
npm install

Create .env file
MONGO_URI=your_mongodb_url
PORT=5000

Start Backend
npm run dev


Backend runs at:

http://localhost:5000

🟩 Frontend Setup
cd frontend
npm install

Create .env file
VITE_API_URL=http://localhost:5000

Start Frontend
npm run dev


Frontend runs at:

http://localhost:5173
