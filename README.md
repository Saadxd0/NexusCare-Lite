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

### Option A — Docker (recommended)
- **Docker** - [Download Docker Desktop](https://www.docker.com/products/docker-desktop/)

### Option B — Manual setup
- **Python 3.7+** - [Download Python](https://www.python.org/downloads/)
  - During installation, make sure to check "Add Python to PATH"
- **Node.js and npm** - [Download Node.js](https://nodejs.org/)

---

## Running with Docker

This is the easiest way to get both services running with a single command.

```bash
docker compose up --build
```

| Service  | URL                      |
|----------|--------------------------|
| Frontend | http://localhost:3000    |
| Backend  | http://localhost:5000    |

To stop the containers:
```bash
docker compose down
```

---

## Manual Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment (recommended):
```bash
python -m venv venv
```

3. Activate the virtual environment:
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

4. Install dependencies:
```bash
pip install -r requirements.txt
```

5. Run the Flask server:
```bash
python app.py
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
│   ├── requirements.txt
│   └── Dockerfile
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
│   ├── vite.config.js
│   ├── nginx.conf
│   └── Dockerfile
├── docker-compose.yml
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

