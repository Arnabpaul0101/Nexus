# Nexus - Internal Team Micro-Blogging

Nexus is a responsive MERN stack application designed for internal company communication. 
It features secure authentication, user profiles, and a full CRUD system for "Pulses" (posts).

## 🚀 Tech Stack
- [cite_start]**Frontend:** React.js, Tailwind CSS, Redux Toolkit, Framer Motion [cite: 15, 16]
- [cite_start]**Backend:** Node.js, Express.js, MongoDB [cite: 26, 41]
- [cite_start]**Security:** JWT Authentication, Bcrypt Password Hashing [cite: 31, 50]

## 🛠️ Setup Instructions
1. Clone the repo: `git clone <your-repo-url>`
2. **Backend Setup:**
   - `cd server`
   - `npm install`
   - Create a `.env` file with `MONGO_URI` and `JWT_SECRET`.
   - `npm run dev`
3. **Frontend Setup:**
   - `cd client`
   - `npm install`
   - `npm run dev`

## 💡 Scalability Note
To scale Nexus for production, I would:
- [cite_start]Implement **Redis** for caching frequently accessed feed posts. [cite: 65, 66]
- [cite_start]Use **Docker** to containerize services for consistent deployment. [cite: 55]
- [cite_start]Add **Database Indexing** on the `author` and `createdAt` fields in MongoDB to speed up queries. [cite: 66]
- [cite_start]Implement **Refresh Tokens** for a more secure and seamless user experience. [cite: 55]
