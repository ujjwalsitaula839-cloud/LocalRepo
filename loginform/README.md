# 🔐 TaskApp — Full-Stack Login & Auth System

A full-stack authentication app built with **React + Vite** (frontend) and **FastAPI + SQLite** (backend). Features include user registration, login, and a complete password reset flow via email.

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, Vite, CSS |
| Backend | FastAPI, Python |
| Database | SQLite |
| Auth | JWT tokens |
| Email | Gmail SMTP |

---

## ⚙️ Setup & Installation

### 1. Clone the Repository
```bash
git clone https://github.com/ujjwalsitaula839-cloud/LocalRepo.git
cd LocalRepo/loginform
```

### 2. Frontend Setup
```bash
npm install
```

### 3. Backend Setup
```bash
cd backend
python -m venv venv

# Activate virtual environment
# Windows:
.\venv\Scripts\Activate
# Mac/Linux:
source venv/bin/activate

pip install -r requirements.txt
```

### 4. Configure Environment Variables
The backend requires a `.env` file for email credentials.

```bash
# Copy the example file
copy backend\.env.example backend\.env   # Windows
cp backend/.env.example backend/.env     # Mac/Linux
```

Then open `backend/.env` and fill in your own values:
```env
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_16_char_app_password
FRONTEND_URL=http://localhost:5173
```

> 💡 **Gmail App Password**: Enable 2FA on your Google account, then generate an App Password at [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)

---

## ▶️ Running the App

You need **two terminals** open at the same time:

**Terminal 1 — Backend:**
```bash
cd backend
.\venv\Scripts\Activate
uvicorn main:app --reload
```
Backend runs at: `http://127.0.0.1:8000`

**Terminal 2 — Frontend:**
```bash
npm run dev
```
Frontend runs at: `http://localhost:5173`

---

## 📡 API Endpoints

| Method | Route | Description |
|---|---|---|
| POST | `/register` | Create a new account |
| POST | `/login` | Login and receive JWT token |
| POST | `/forgot-password` | Send password reset email |
| POST | `/reset-password` | Reset password using token |

Swagger API docs available at: `http://127.0.0.1:8000/docs`

---

## 🔒 Security Notes

- Passwords are hashed with **bcrypt**
- Auth uses **JWT tokens**
- Email credentials are stored in `.env` (never committed to git)
- Password reset tokens expire in **30 minutes**
