from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# In-memory storage
users = []
complaints = []
complaint_id_counter = 1

# Helper function to find user by email
def find_user_by_email(email):
    for user in users:
        if user['email'] == email:
            return user
    return None

# Helper function to find complaint by id
def find_complaint_by_id(complaint_id):
    for complaint in complaints:
        if complaint['id'] == complaint_id:
            return complaint
    return None

# Health check endpoint
@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok', 'message': 'Backend is running'}), 200

# Auth Endpoints
@app.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No JSON data received'}), 400
            
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        role = data.get('role', 'Resident')
        
        if not username or not email or not password:
            return jsonify({'error': 'Missing required fields'}), 400
        
        # Check if user already exists
        if find_user_by_email(email):
            return jsonify({'error': 'User already exists'}), 400
        
        # Create new user
        new_user = {
            'username': username,
            'email': email,
            'password': password,  # In real app, this would be hashed
            'role': role
        }
        users.append(new_user)
        
        return jsonify({'message': 'User registered successfully'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No JSON data received'}), 400
            
        email = data.get('email')
        password = data.get('password')
        
        if not email or not password:
            return jsonify({'error': 'Missing email or password'}), 400
        
        user = find_user_by_email(email)
        if not user or user['password'] != password:
            return jsonify({'error': 'Invalid credentials'}), 401
        
        # Return fake token
        return jsonify({
            'token': 'abcd1234',
            'user': {
                'username': user['username'],
                'email': user['email'],
                'role': user['role']
            }
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Complaint Endpoints
@app.route('/complaints', methods=['POST'])
def create_complaint():
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No JSON data received'}), 400
            
        title = data.get('title')
        description = data.get('description')
        user_email = data.get('user_email')
        
        if not title or not description or not user_email:
            return jsonify({'error': 'Missing required fields'}), 400
        
        global complaint_id_counter
        new_complaint = {
            'id': complaint_id_counter,
            'title': title,
            'description': description,
            'user_email': user_email,
            'created_at': datetime.now().isoformat()
        }
        complaints.append(new_complaint)
        complaint_id_counter += 1
        
        return jsonify({'message': 'Complaint created successfully', 'complaint': new_complaint}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/complaints', methods=['GET'])
def get_complaints():
    user_email = request.args.get('user_email')
    
    if not user_email:
        return jsonify({'error': 'user_email parameter required'}), 400
    
    # Filter complaints by user email
    user_complaints = [c for c in complaints if c['user_email'] == user_email]
    
    return jsonify({'complaints': user_complaints}), 200

@app.route('/complaints/<int:complaint_id>', methods=['DELETE'])
def delete_complaint(complaint_id):
    user_email = request.args.get('user_email')
    
    if not user_email:
        return jsonify({'error': 'user_email parameter required'}), 400
    
    complaint = find_complaint_by_id(complaint_id)
    if not complaint:
        return jsonify({'error': 'Complaint not found'}), 404
    
    # Check if user owns the complaint
    if complaint['user_email'] != user_email:
        return jsonify({'error': 'Unauthorized'}), 403
    
    complaints.remove(complaint)
    return jsonify({'message': 'Complaint deleted successfully'}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)

