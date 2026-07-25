<div align="center">

# 🚀 Freelance Marketplace Platform

### *Connecting Clients with Talented Freelancers*

[![React](https://img.shields.io/badge/React-18.0+-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Flask](https://img.shields.io/badge/Flask-3.0+-000000?style=for-the-badge&logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![Python](https://img.shields.io/badge/Python-3.8+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0+-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![SQLite](https://img.shields.io/badge/SQLite-3.0+-003B57?style=for-the-badge&logo=sqlite&logoColor=white)](https://www.sqlite.org/)

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Tech Stack](#-tech-stack) • [Documentation](#-documentation)

---

</div>

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Demo](#-demo)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Installation](#-installation)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

A modern, full-stack freelance marketplace platform that connects clients with talented freelancers. Built with React and Flask, this platform provides a seamless experience for posting projects, submitting proposals, managing contracts, and tracking payments.

### 🎯 Key Highlights

- 🔐 **Secure Authentication** - JWT-based authentication with role-based access control
- 💬 **Real-Time Messaging** - Direct communication between clients and freelancers
- 📊 **Analytics Dashboard** - Comprehensive insights for both clients and freelancers
- 💰 **Payment Tracking** - Transparent payment management with milestone support
- ⏱️ **Time Tracking** - Accurate billing with detailed time logs
- 🌓 **Dark Mode** - Eye-friendly dark theme support
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile

---

## ✨ Features

### 👥 User Management
- **Dual Role System**: Separate interfaces for clients and freelancers
- **Profile Management**: Customizable profiles with skills, portfolio, and hourly rates
- **Secure Authentication**: JWT tokens with password hashing
- **Role-Based Access**: Different permissions for clients and freelancers

### 📁 Project Management
- **Post Projects**: Clients can create detailed project listings with budget and requirements
- **Browse Projects**: Freelancers can search and filter available projects
- **Project Details**: Comprehensive view with client info, requirements, and proposals
- **Status Tracking**: Open, In Progress, Completed, Cancelled

### 📝 Proposal System
- **Submit Proposals**: Freelancers can bid on projects with custom pricing
- **Cover Letters**: Detailed proposals with delivery timelines
- **Proposal Review**: Clients can compare and evaluate multiple proposals
- **One-Click Accept**: Instant contract creation upon proposal acceptance

### 📄 Contract Management
- **Automated Creation**: Contracts generated from accepted proposals
- **Payment Tracking**: Monitor total amount, paid amount, and remaining balance
- **Status Updates**: Track contract lifecycle from active to completed
- **Contract Details**: Full visibility of terms, payments, and milestones

### 💬 Messaging System
- **Real-Time Chat**: Direct messaging between users with 3-second polling
- **Image Sharing**: Send and receive images in conversations
- **Temporary Messages**: Ephemeral messages that disappear after reading
- **Smart Navigation**: Open chat directly from projects, proposals, or contracts
- **Conversation History**: Complete message history with timestamps
- **Unread Indicators**: Visual badges for unread messages

### 💰 Payment Management
- **Multiple Payments**: Support for milestone-based payments
- **Payment History**: Complete transaction log with IDs
- **Balance Tracking**: Automatic calculation of remaining amounts
- **Payment Status**: Visual indicators (Not Paid, Partially Paid, Paid)
- **Progress Bars**: Visual representation of payment completion

### 🎯 Milestone Tracking
- **5-Stage Process**: Planning → Design → Development → Testing → Deployment
- **Progress Updates**: Track completion percentage (0-100%)
- **Status Management**: Pending, In Progress, Completed
- **Milestone Comments**: Add updates and notes to each milestone
- **Client Notifications**: Automatic alerts on milestone progress

### ⏱️ Time Tracking
- **Log Hours**: Record time spent on contracts
- **Billable Hours**: Distinguish between billable and non-billable time
- **Daily Entries**: Track work by date with descriptions
- **Total Calculations**: Automatic summation of hours worked
- **Client Visibility**: Transparent time logs for clients

### 📊 Analytics Dashboard
**For Clients:**
- Total projects and spending
- Active contracts count
- Monthly spending trends
- Proposals received statistics

**For Freelancers:**
- Total earnings and proposals
- Active contracts overview
- Monthly earnings trends
- Average rating and reviews
- Total hours logged

### ⭐ Additional Features
- **Reviews & Ratings**: 5-star rating system with comments
- **Notifications**: Real-time alerts for important events
- **Find Freelancers**: Browse and filter freelancer profiles
- **Skill Endorsements**: Peer endorsements for credibility
- **Search & Filter**: Advanced filtering for projects and freelancers
- **Responsive UI**: Mobile-first design with Tailwind CSS

---

## 🎬 Demo

### Demo Accounts

**Client Account:**
```
Email: client@demo.com
Password: password123
```

**Freelancer Account:**
```
Email: freelancer@demo.com
Password: password123
```

### Live Demo
🔗 [Coming Soon - Deploy Link]

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| ![React](https://img.shields.io/badge/-React-61DAFB?style=flat-square&logo=react&logoColor=black) | UI Framework |
| ![Tailwind CSS](https://img.shields.io/badge/-Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white) | Styling |
| ![React Router](https://img.shields.io/badge/-React_Router-CA4245?style=flat-square&logo=react-router&logoColor=white) | Navigation |
| ![Axios](https://img.shields.io/badge/-Axios-5A29E4?style=flat-square&logo=axios&logoColor=white) | HTTP Client |
| ![Lucide Icons](https://img.shields.io/badge/-Lucide-000000?style=flat-square&logo=lucide&logoColor=white) | Icons |

### Backend
| Technology | Purpose |
|------------|---------|
| ![Python](https://img.shields.io/badge/-Python-3776AB?style=flat-square&logo=python&logoColor=white) | Programming Language |
| ![Flask](https://img.shields.io/badge/-Flask-000000?style=flat-square&logo=flask&logoColor=white) | Web Framework |
| ![SQLAlchemy](https://img.shields.io/badge/-SQLAlchemy-D71F00?style=flat-square&logo=sqlalchemy&logoColor=white) | ORM |
| ![JWT](https://img.shields.io/badge/-JWT-000000?style=flat-square&logo=json-web-tokens&logoColor=white) | Authentication |
| ![Flask-CORS](https://img.shields.io/badge/-Flask_CORS-000000?style=flat-square&logo=flask&logoColor=white) | CORS Handling |
| ![Flask-SocketIO](https://img.shields.io/badge/-SocketIO-010101?style=flat-square&logo=socket.io&logoColor=white) | Real-time Features |

### Database
| Technology | Purpose |
|------------|---------|
| ![SQLite](https://img.shields.io/badge/-SQLite-003B57?style=flat-square&logo=sqlite&logoColor=white) | Development Database |
| ![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-336791?style=flat-square&logo=postgresql&logoColor=white) | Production Ready |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend (React)                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │Dashboard │  │ Projects │  │ Messages │  │Analytics │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │Contracts │  │ Proposals│  │  Profile │  │Time Track│   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ HTTP/REST API
                            │ (Axios)
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Backend (Flask REST API)                  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Authentication (JWT)                     │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  Users   │  │ Projects │  │ Messages │  │ Payments │   │
│  │   API    │  │   API    │  │   API    │  │   API    │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │Contracts │  │Proposals │  │Milestones│  │Analytics │   │
│  │   API    │  │   API    │  │   API    │  │   API    │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ SQLAlchemy ORM
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Database (SQLite/PostgreSQL)              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  Users   │  │ Projects │  │ Messages │  │ Contracts│   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │Proposals │  │ Payments │  │Milestones│  │  Reviews │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## 📦 Installation

### Prerequisites

- **Python 3.8+** - [Download](https://www.python.org/downloads/)
- **Node.js 14+** - [Download](https://nodejs.org/)
- **npm or yarn** - Comes with Node.js

### Backend Setup

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/freelance-marketplace.git
cd freelance-marketplace
```

2. **Create virtual environment**
```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate
```

3. **Install dependencies**
```bash
pip install -r requirements.txt
```

4. **Initialize database**
```bash
python create_tables.py
```

5. **Seed demo data (optional)**
```bash
python seed_messages.py
python seed_new_features.py
```

6. **Run the backend server**
```bash
python app.py
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Start development server**
```bash
npm start
# or
yarn start
```

Frontend will run on `http://localhost:3000`

---

## 🚀 Usage

### Starting the Application

1. **Start Backend** (Terminal 1)
```bash
cd backend
python app.py
```

2. **Start Frontend** (Terminal 2)
```bash
cd frontend
npm start
```

3. **Open Browser**
```
http://localhost:3000
```

### Quick Start Guide

#### As a Client:
1. Register/Login with client role
2. Post a new project with requirements and budget
3. Review proposals from freelancers
4. Accept a proposal to create a contract
5. Track progress through milestones
6. Make payments and review work
7. Rate and review the freelancer

#### As a Freelancer:
1. Register/Login with freelancer role
2. Browse available projects
3. Submit proposals with your pricing
4. Chat with clients
5. Update project milestones
6. Log time worked
7. Track your earnings

---

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe",
  "role": "client" // or "freelancer"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### Project Endpoints

#### Get All Projects
```http
GET /api/projects?status=open&search=web
Authorization: Bearer {token}
```

#### Create Project
```http
POST /api/projects
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "E-commerce Website",
  "description": "Need a full-stack e-commerce platform",
  "budget": 5000,
  "duration": "2 months",
  "skills_required": ["React", "Node.js", "MongoDB"]
}
```

#### Get Project Details
```http
GET /api/projects/{project_id}
Authorization: Bearer {token}
```

### Proposal Endpoints

#### Submit Proposal
```http
POST /api/proposals
Authorization: Bearer {token}
Content-Type: application/json

{
  "project_id": 1,
  "cover_letter": "I'm interested in your project...",
  "proposed_amount": 4500,
  "delivery_time": "6 weeks"
}
```

#### Accept Proposal
```http
POST /api/proposals/{proposal_id}/accept
Authorization: Bearer {token}
```

### Message Endpoints

#### Get Conversations
```http
GET /api/conversations
Authorization: Bearer {token}
```

#### Send Message
```http
POST /api/messages
Authorization: Bearer {token}
Content-Type: application/json

{
  "receiver_id": 2,
  "content": "Hello! Let's discuss the project.",
  "message_type": "text",
  "is_temporary": false
}
```

#### Get Messages
```http
GET /api/messages?user_id=2
Authorization: Bearer {token}
```

### Payment Endpoints

#### Create Payment
```http
POST /api/contracts/{contract_id}/payments
Authorization: Bearer {token}
Content-Type: application/json

{
  "amount": 1000,
  "description": "Milestone 1 Payment",
  "payment_method": "credit_card"
}
```

#### Get Payment History
```http
GET /api/contracts/{contract_id}/payments
Authorization: Bearer {token}
```

### More Endpoints

For complete API documentation, see [API_DOCS.md](./API_DOCS.md)

---

## 🗄️ Database Schema

### Core Tables

```sql
-- Users Table
CREATE TABLE user (
    id INTEGER PRIMARY KEY,
    email VARCHAR(120) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL,  -- 'client' or 'freelancer'
    name VARCHAR(100) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Projects Table
CREATE TABLE project (
    id INTEGER PRIMARY KEY,
    client_id INTEGER NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    budget FLOAT NOT NULL,
    duration VARCHAR(50),
    skills_required TEXT,  -- JSON array
    status VARCHAR(20) DEFAULT 'open',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES user(id)
);

-- Proposals Table
CREATE TABLE proposal (
    id INTEGER PRIMARY KEY,
    project_id INTEGER NOT NULL,
    freelancer_id INTEGER NOT NULL,
    cover_letter TEXT NOT NULL,
    proposed_amount FLOAT NOT NULL,
    delivery_time VARCHAR(50),
    status VARCHAR(20) DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES project(id),
    FOREIGN KEY (freelancer_id) REFERENCES user(id)
);

-- Contracts Table
CREATE TABLE contract (
    id INTEGER PRIMARY KEY,
    project_id INTEGER NOT NULL,
    proposal_id INTEGER NOT NULL,
    freelancer_id INTEGER NOT NULL,
    amount FLOAT NOT NULL,
    status VARCHAR(20) DEFAULT 'active',
    start_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    end_date DATETIME,
    FOREIGN KEY (project_id) REFERENCES project(id),
    FOREIGN KEY (proposal_id) REFERENCES proposal(id),
    FOREIGN KEY (freelancer_id) REFERENCES user(id)
);

-- Messages Table
CREATE TABLE message (
    id INTEGER PRIMARY KEY,
    sender_id INTEGER NOT NULL,
    receiver_id INTEGER NOT NULL,
    content TEXT NOT NULL,
    message_type VARCHAR(20) DEFAULT 'text',
    image_url VARCHAR(500),
    is_temporary BOOLEAN DEFAULT FALSE,
    is_read BOOLEAN DEFAULT FALSE,
    read_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES user(id),
    FOREIGN KEY (receiver_id) REFERENCES user(id)
);
```

### Entity Relationship Diagram

```
┌─────────┐         ┌──────────┐         ┌──────────┐
│  User   │────────▶│ Project  │────────▶│ Proposal │
└─────────┘         └──────────┘         └──────────┘
     │                    │                     │
     │                    │                     │
     │                    ▼                     ▼
     │              ┌──────────┐         ┌──────────┐
     │              │ Contract │◀────────│ Payment  │
     │              └──────────┘         └──────────┘
     │                    │
     │                    ▼
     │              ┌──────────┐
     │              │Milestone │
     │              └──────────┘
     │
     ▼
┌─────────┐         ┌──────────┐
│ Message │         │  Review  │
└─────────┘         └──────────┘
```

**Total Tables:** 15+
- Users, Profiles, Projects, Proposals, Contracts
- Messages, Payments, Milestones, MilestoneUpdates
- TimeEntries, Reviews, Notifications
- SkillEndorsements, SavedProjects, Disputes

---

## 📸 Screenshots

### Dashboard
![Dashboard](./screenshots/dashboard.png)
*Comprehensive overview with statistics and recent activity*

### Projects
![Projects](./screenshots/projects.png)
*Browse and filter available projects*

### Project Detail
![Project Detail](./screenshots/project-detail.png)
*Detailed project view with proposals*

### Messaging
![Messages](./screenshots/messages.png)
*Real-time chat with image sharing*

### Contracts
![Contracts](./screenshots/contracts.png)
*Contract management with payment tracking*

### Analytics
![Analytics](./screenshots/analytics.png)
*Comprehensive analytics dashboard*

### Time Tracking
![Time Tracking](./screenshots/time-tracking.png)
*Log and track hours worked*

### Milestones
![Milestones](./screenshots/milestones.png)
*Track project progress through milestones*

---

## 🧪 Testing

### Run Backend Tests
```bash
cd backend
python test_endpoints.py
python test_chat.py
python test_chat_navigation.py
```

### Run Frontend Tests
```bash
cd frontend
npm test
```

### Manual Testing
Use the demo accounts to test all features:
- Client: `client@demo.com` / `password123`
- Freelancer: `freelancer@demo.com` / `password123`

---

## 📊 Project Statistics

- **50+** API Endpoints
- **15+** Database Tables
- **12** Main Features
- **20+** React Components
- **1,700+** Lines of Backend Code
- **2,000+** Lines of Frontend Code
- **100%** Responsive Design
- **Dark Mode** Support

---

## 🔒 Security Features

- ✅ JWT token-based authentication
- ✅ Password hashing with Werkzeug
- ✅ CORS configuration for API security
- ✅ SQL injection prevention with ORM
- ✅ Input validation on frontend and backend
- ✅ Role-based access control
- ✅ Secure session management

---

## 🚧 Roadmap

### Phase 1 (Current)
- [x] User authentication and profiles
- [x] Project and proposal management
- [x] Real-time messaging
- [x] Payment tracking
- [x] Analytics dashboard

### Phase 2 (Upcoming)
- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Email notifications
- [ ] Advanced search and filters
- [ ] File upload for portfolios
- [ ] Video call integration

### Phase 3 (Future)
- [ ] Mobile apps (iOS/Android)
- [ ] AI-powered freelancer matching
- [ ] Multi-language support
- [ ] Advanced analytics and reporting
- [ ] Dispute resolution system

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Development Guidelines
- Follow PEP 8 for Python code
- Use ESLint for JavaScript code
- Write meaningful commit messages
- Add tests for new features
- Update documentation

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Authors

**Your Name**
- GitHub: [@hrushikesh-karthik](https://github.com/hrushikesh-karthik)
- LinkedIn: [Hrushikesh Karthik](https://linkedin.com/in/hrushikeshka)
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- [React Documentation](https://reactjs.org/)
- [Flask Documentation](https://flask.palletsprojects.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [SQLAlchemy](https://www.sqlalchemy.org/)

---

## 📞 Support



---

<div align="center">

### ⭐ Star this repository if you find it helpful!

Made with ❤️ by Infosys Springboard

[⬆ Back to Top](#-freelance-marketplace-platform)

</div>
