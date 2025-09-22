# SIH Alumni Portal

A comprehensive MERN (MongoDB, Express.js, React, Node.js) stack application for managing alumni networks, built for the Smart India Hackathon.

## 🚀 Features

### Multi-Role Dashboard System

- **Alumni Dashboard**: Profile management, networking, mentorship, job opportunities
- **Faculty Dashboard**: Student progress tracking, alumni connections, event management
- **Institute Admin Dashboard**: User management, event oversight, analytics
- **Recruiter Dashboard**: Job posting, candidate management, application tracking
- **Super Admin Dashboard**: System-wide management and analytics

### Key Functionalities

- **User Authentication & Authorization**: Role-based access control
- **Alumni Networking**: Connect with fellow alumni across batches and departments
- **Mentorship Program**: Alumni can mentor current students
- **Job Opportunities**: Post and apply for job openings
- **Event Management**: Create and manage alumni events
- **Real-time Notifications**: Stay updated with relevant activities
- **Analytics Dashboard**: Comprehensive insights and reporting

## 🛠️ Tech Stack

### Frontend

- **React 18**: Modern UI library with hooks and functional components
- **React Router**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client for API calls

### Backend (To be implemented)

- **Node.js**: JavaScript runtime
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **JWT**: Authentication tokens
- **bcrypt**: Password hashing

## 📁 Project Structure

```
sih-alumni-portal/
├── public/                 # Static assets
│   ├── assets/
│   │   └── images/
│   ├── favicon.ico
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── components/         # Reusable components
│   │   ├── ui/            # UI components (Button, Input, etc.)
│   │   ├── AppIcon.jsx
│   │   ├── AppImage.jsx
│   │   ├── ErrorBoundary.jsx
│   │   └── ScrollToTop.jsx
│   ├── pages/             # Page components
│   │   ├── alumni-dashboard/
│   │   ├── faculty-dashboard/
│   │   ├── institute-admin-dashboard/
│   │   ├── recruiter-dashboard/
│   │   ├── super-admin-dashboard/
│   │   └── NotFound.jsx
│   ├── styles/            # CSS files
│   ├── utils/             # Utility functions
│   ├── App.jsx            # Main app component
│   ├── index.jsx          # Entry point
│   └── Routes.jsx         # Route definitions
├── backend/               # Backend API (to be implemented)
├── package.json
├── tailwind.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (for backend)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/sih-alumni-portal.git
   cd sih-alumni-portal
   ```

2. **Install frontend dependencies**

   ```bash
   npm install
   ```

3. **Install backend dependencies** (when backend is implemented)

   ```bash
   cd backend
   npm install
   ```

4. **Set up environment variables**

   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. **Start the development server**

   ```bash
   # Frontend only
   npm start

   # Full stack (when backend is ready)
   npm run dev:full
   ```

### Available Scripts

- `npm start` - Start the frontend development server
- `npm run build` - Build the app for production
- `npm test` - Run the test suite
- `npm run dev:full` - Start both frontend and backend
- `npm run backend` - Start backend only
- `npm run frontend` - Start frontend only

## 🎨 UI Components

The project includes a comprehensive set of reusable UI components:

- **Button**: Customizable button with multiple variants
- **Input**: Form input with validation support
- **Select**: Dropdown select component
- **Checkbox**: Checkbox input component
- **ModuleContainer**: Container for dashboard modules
- **DashboardSidebar**: Navigation sidebar
- **NotificationCenter**: Real-time notification system
- **RoleDashboardHeader**: Role-specific header component

## 🔐 Authentication & Authorization

The application implements role-based access control with the following roles:

1. **Alumni**: Access to networking, mentorship, and job features
2. **Faculty**: Manage students and connect with alumni
3. **Institute Admin**: Oversee institute-wide activities
4. **Recruiter**: Post jobs and manage applications
5. **Super Admin**: System-wide administration

## 📱 Responsive Design

The application is fully responsive and works seamlessly across:

- Desktop computers
- Tablets
- Mobile devices

## 🚀 Deployment

### Frontend Deployment

The React app can be deployed to:

- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront

### Backend Deployment (when ready)

The backend can be deployed to:

- Heroku
- AWS EC2
- DigitalOcean
- Railway

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- Frontend Developer: [Your Name]
- Backend Developer: [Team Member]
- UI/UX Designer: [Team Member]
- Project Manager: [Team Member]

## 📞 Support

For support, email team@sihalumniportal.com or join our Slack channel.

## 🙏 Acknowledgments

- Smart India Hackathon organizers
- React community
- Tailwind CSS team
- All contributors and supporters

---

**Built with ❤️ for Smart India Hackathon**
