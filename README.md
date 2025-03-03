# MGM NGO - Empowering Lives

<img src="public/logo.png" alt="MGM NGO Logo" width="200"/>

## About the Project

MGM NGO is a web platform developed during the Hackathon at BMN College, focused on empowering underprivileged communities through education, healthcare, and skill development initiatives.

## Tech Stack

### Frontend
- HTML5
- CSS3 with Tailwind CSS
- JavaScript
- Vite (Build tool)
- GSAP (Animations)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for Authentication
- bcryptjs for Password Hashing

### Development Tools
- Concurrently (Run multiple commands)
- Nodemon (Development server)
- PostCSS with Autoprefixer
- Vite for development and production builds

## Features

- 🏠 Responsive Landing Page
- 👤 User Authentication (Signup/Login)
- 💰 Donation System
- 📧 Contact Form
- 📱 Mobile-Friendly Design
- 🎨 Smooth Animations
- 🔒 Secure API Endpoints

## Project Structure
```
mgm-ngo/
├── public/           # Static assets
├── src/
│   ├── server/       # Backend code
│   │   ├── models/   # MongoDB models
│   │   └── routes/   # API routes
│   ├── main.js       # Frontend entry
│   └── style.css     # Global styles
├── *.html            # HTML pages
└── package.json      # Project dependencies
```

## Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/mgm-ngo.git
cd mgm-ngo

# Install dependencies
npm install
```

### Configuration
1. Create `.env` file based on `.env.example`
2. Add your MongoDB URI and other credentials

### Running the Application
```bash
# Development mode
npm run dev

# The application will be available at:
# Frontend: http://localhost:5173
# Backend API: http://localhost:5000
```

### Build for Production
```bash
npm run build
```

## Team Members
- MGM Tigers Team Member 1
- MGM Tigers Team Member 2
- MGM Tigers Team Member 3

## Acknowledgments
- BMN College for hosting the Hackathon
- [Add other acknowledgments]

## License
This project is licensed under the MIT License

Developed with ❤️ during BMN College Hackathon 2024
