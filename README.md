# 🚀 SafeMeds — AI-Powered Drug Interaction Checker

🥈 **1st Runner-Up | 🏆 AI/ML Hackathon 2.0 by Parul University, myOnsite Healthcare & byteXL**

[![React](https://img.shields.io/badge/Frontend-React.js-blue?logo=react)](https://react.dev/)
[![Flask](https://img.shields.io/badge/Backend-Flask-black?logo=flask)](https://flask.palletsprojects.com/)
[![AWS](https://img.shields.io/badge/Cloud-AWS-orange?logo=amazon-aws)](https://aws.amazon.com/)
[![Groq API](https://img.shields.io/badge/AI-Groq_API-purple)](https://groq.com/)

---

## 📖 Overview
SafeMeds is a **real-time, AI-powered clinical decision support tool** that evaluates **drug-to-drug interactions** using **natural language queries**. It helps healthcare professionals reduce medication risks and make faster, safer decisions.

---

## 📁 Repository Structure
The repository is split into two main sections:
- `frontend/` - React.js user interface, styled with Tailwind CSS, built with Vite, and deployed on Vercel.
- `backend/` - Flask API server that integrates Groq API (LLaMA 3) and custom interaction checkers, deployed on AWS EC2.

---

## 🧠 Tech Stack
- **Frontend:** React.js, Tailwind CSS, Vite
- **Backend:** Flask, Python
- **AI Model:** LLaMA3-8B via Groq API
- **Deployment:** AWS EC2, Vercel

---

## ✨ Features
- 🔎 **Natural Language Drug Queries** — e.g., *"Can I take ibuprofen with metformin?"* → AI responds with safety analysis.
- ⚙️ **Groq + LLaMA3 AI Integration** — State-of-the-art LLMs for clinical drug interaction interpretation.
- 🖥️ **Clean & Responsive UI** — Optimized for clarity and accessibility for healthcare professionals.
- 🌐 **Full Stack Deployment** — Scalable cloud infrastructure.

---

## 🛠️ Getting Started

### 1. Backend Setup

The backend is built with Python and Flask.

```bash
# Navigate to the backend directory
cd backend

# Create a virtual environment
python3 -m venv venv

# Activate the virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
# venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create a .env file and add your Groq API Key:
# GROQ_API_KEY=your_api_key_here

# Run the backend server
python app.py
```
The backend server runs locally by default on `http://127.0.0.1:5050` (or `http://localhost:5050`).

### 2. Frontend Setup

The frontend is built with React and Vite.

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Create a .env file and set the API Base URL pointing to your backend:
# VITE_API_BASE_URL=http://localhost:5050

# Start the development server
npm run dev
```
The frontend application will run locally at `http://localhost:5173`.

---

## 👨‍💻 Team Roles
| Name | Role |
|------|------|
| **Marka S Charan** [🔗 GitHub](https://github.com/MARKASCHARAN) • [🔗 LinkedIn](https://linkedin.com/in/markascharan) | Full Stack Developer, Integration |
| **Dhrumin Upadhyay** [🔗 GitHub](https://github.com/dhrumin-upadhyay) • [🔗 LinkedIn](https://www.linkedin.com/in/dhrumin-upadhyay-98b021287/) | Machine Learning |
| **Nidhi Thakore** [🔗 GitHub](https://github.com/nidhi-thakore) • [🔗 LinkedIn](https://www.linkedin.com/in/nidhi-thakore-10b9b825b/) | AWS Deployment, Domain Setup |
| **Ayushi Majumdar** [🔗 GitHub](https://github.com/ayushi-majumdar) • [🔗 LinkedIn](https://www.linkedin.com/in/ayushi-majumdar-4318152a1/) | UI/UX & Frontend Designer |
