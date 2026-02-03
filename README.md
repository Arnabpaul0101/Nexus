# Nexus - Internal Team Micro-Blogging

Nexus is a responsive MERN stack application designed for internal company communication. 
It features secure authentication, user profiles, and a full CRUD system for "Pulses" (posts).

## 🚀 Tech Stack
-**Frontend:** React.js, Tailwind CSS, Redux Toolkit, Framer Motion 
-**Backend:** Node.js, Express.js, MongoDB 
-**Security:** JWT Authentication, Bcrypt Password Hashing 

## 🛠️ Setup Instructions
1. Clone the repo: `git clone https://github.com/Arnabpaul0101/Nexus.git`
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
- Implement **Redis** for caching frequently accessed feed posts.
- Use **Docker** to containerize services for consistent deployment.
- Add **Database Indexing** on the `author` and `createdAt` fields in MongoDB to speed up queries. 
- Implement **Refresh Tokens** for a more secure and seamless user experience.
