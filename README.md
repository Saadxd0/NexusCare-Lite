# NexusCare Lite - No Database Version

A simple full-stack web application for managing complaints with in-memory storage.

## Tech Stack

- **Frontend**: React (Vite), HTML, CSS, Axios
- **Backend**: Python Flask
- **Storage**: In-memory Python lists (no database)

## Features

- User registration and login
- Create complaints
- View complaints
- Delete complaints
- Simple authentication (in-memory, not secure)

## Prerequisites

- **Python 3.7+** - [Download Python](https://www.python.org/downloads/)
  - During installation, make sure to check "Add Python to PATH"
  - After installation, verify by running: `python --version` or `py --version`
- **Node.js and npm** - [Download Node.js](https://nodejs.org/)

## Setup Instructions

### Backend Setup

1. **Install Python** (if not already installed):
   - Download from [python.org](https://www.python.org/downloads/)
   - During installation, check "Add Python to PATH"
   - Verify installation: Open a new terminal and run `python --version` or `py --version`

2. Navigate to the backend directory:
```bash
cd backend
```

3. Create a virtual environment (recommended):
   - If `python` works:
   ```bash
   python -m venv venv
   ```
   - If only `py` works:
   ```bash
   py -m venv venv
   ```

4. Activate the virtual environment:
   - Windows (PowerShell):
   ```bash
   venv\Scripts\Activate.ps1
   ```
   - Windows (Command Prompt):
   ```bash
   venv\Scripts\activate.bat
   ```
   - Linux/Mac:
   ```bash
   source venv/bin/activate
   ```

5. Install dependencies:
```bash
pip install -r requirements.txt
```

6. Run the Flask server:
   - If `python` works:
   ```bash
   python app.py
   ```
   - If only `py` works:
   ```bash
   py app.py
   ```

The backend will run on `http://localhost:5000`

**Troubleshooting:**
- If `python` is not recognized, try `py` instead
- If you get a permission error when activating venv in PowerShell, run: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## Usage

1. Open your browser and go to `http://localhost:3000`
2. Register a new account (or login if you already have one)
3. Once logged in, you can:
   - Create new complaints
   - View all your complaints
   - Delete complaints

## Important Notes

- **No Database**: All data is stored in-memory. When you restart the backend server, all data will be lost.
- **Not Secure**: This is a demo application. The authentication is not secure and passwords are stored in plain text.
- **CORS**: The backend has CORS enabled to allow frontend requests.

## Project Structure

```
.
├── backend/
│   ├── app.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── components/
│   │   │   ├── CreateComplaint.jsx
│   │   │   └── ViewComplaints.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## API Endpoints

### Authentication
- `POST /register` - Register a new user
- `POST /login` - Login and get token

### Complaints
- `POST /complaints` - Create a new complaint
- `GET /complaints?user_email=<email>` - Get all complaints for a user
- `DELETE /complaints/<id>?user_email=<email>` - Delete a complaint

