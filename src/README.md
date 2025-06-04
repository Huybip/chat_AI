# Chat AI Application

A web-based chat application with user authentication and AI integration.

## Project Structure
```
chat_AI/
├── app/
│   ├── __init__.py
│   ├── routes/
│   │   ├── __init__.py
│   │   ├── auth.py
│   │   └── chat.py
│   ├── models/
│   │   ├── __init__.py
│   │   └── user.py
│   ├── static/
│   │   ├── css/
│   │   │   └── style.css
│   │   └── js/
│   │       ├── auth.js
│   │       └── chat.js
│   └── templates/
│       ├── base.html
│       ├── login.html
│       ├── register.html
│       └── chat.html
├── config.py
├── requirements.txt
└── run.py
```

## Tasks and Requirements

### Authentication System
- [x] User registration with email and password
- [x] User login functionality
- [x] Password hashing for security
- [x] Session management
- [ ] Password reset functionality
- [ ] Email verification

### Database
- [x] MySQL database setup
- [x] User table creation
- [x] Basic CRUD operations
- [ ] Message history storage
- [ ] User preferences storage

### Chat Interface
- [x] Basic chat UI
- [x] Real-time message updates
- [ ] Message history display
- [ ] User typing indicators
- [ ] File sharing capabilities
- [ ] Emoji support

### AI Integration
- [ ] AI model integration
- [ ] Message processing
- [ ] Context management
- [ ] Response generation
- [ ] Error handling

### Security
- [x] Basic authentication
- [ ] CSRF protection
- [ ] Rate limiting
- [ ] Input validation
- [ ] XSS protection

### Performance
- [ ] Message caching
- [ ] Database optimization
- [ ] Load balancing
- [ ] Error logging

## Setup Instructions

1. Clone the repository
2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Configure database in `config.py`
5. Run the application:
   ```bash
   python run.py
   ```

## Dependencies
- Flask
- Flask-SQLAlchemy
- Flask-Login
- MySQL-connector-python
- python-dotenv
- Flask-WTF
- Flask-Migrate

## Contributing
Please read CONTRIBUTING.md for details on our code of conduct and the process for submitting pull requests.

## License
This project is licensed under the MIT License - see the LICENSE file for details 