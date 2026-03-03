# Quick Setup Guide - Python Installation

## Python is Not Installed

You need to install Python first before running the backend.

### Step 1: Install Python

1. **Download Python:**
   - Go to: https://www.python.org/downloads/
   - Click "Download Python 3.x.x" (latest version)

2. **Install Python:**
   - Run the downloaded installer
   - **IMPORTANT:** Check the box "Add Python to PATH" at the bottom of the installer
   - Click "Install Now"

3. **Verify Installation:**
   - Close and reopen your terminal/PowerShell
   - Run: `python --version` or `py --version`
   - You should see something like: `Python 3.11.5`

### Step 2: Run the Backend

After Python is installed:

1. Open a new terminal/PowerShell window
2. Navigate to the backend folder:
   ```bash
   cd backend
   ```

3. Install Flask and dependencies:
   ```bash
   pip install flask flask-cors
   ```
   Or if that doesn't work:
   ```bash
   python -m pip install flask flask-cors
   ```

4. Run the server:
   ```bash
   python app.py
   ```
   Or:
   ```bash
   py app.py
   ```

5. You should see: `Running on http://127.0.0.1:5000`

### Alternative: Use Python Launcher (py)

If `python` doesn't work but `py` does:
- Use `py` instead of `python` in all commands
- Example: `py app.py` instead of `python app.py`

### Still Having Issues?

1. **Check if Python is installed:**
   - Open Windows Start Menu
   - Search for "Python"
   - If you see Python in the results, it's installed but not in PATH

2. **Add Python to PATH manually:**
   - Find where Python is installed (usually `C:\Users\YourName\AppData\Local\Programs\Python\Python3xx`)
   - Add it to System Environment Variables PATH

3. **Reinstall Python:**
   - Uninstall Python
   - Reinstall and make sure to check "Add Python to PATH"


