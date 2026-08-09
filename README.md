# Sellora Globals

Full-stack Sellora Globals application (React + Vite + TypeScript frontend, Node + Express + TypeScript backend, MongoDB/Mongoose, JWT auth).

Features
- React + Vite + TypeScript frontend
- Node.js + Express + TypeScript backend
- MongoDB + Mongoose
- JWT authentication
- Admin dashboard
- Product management
- Enquiry management
- Gallery management
- Cloudinary integration
- Gmail SMTP enquiry notifications
- Seed script

Setup
1. Clone the repo
2. Create .env files using .env.example values.
3. Install dependencies for server and client:
   - cd server && npm install
   - cd ../client && npm install
4. Seed admin & sample data:
   - cd server && npm run seed
5. Start server and client in development
   - cd server && npm run dev
   - cd ../client && npm run dev

Environment
- See .env.example at project root and in server for placeholders. Do NOT commit real secrets.

Deployment
- Vercel config for client included (vercel.json)
- Render config for server included (render.yaml)

Admin credentials (seed uses environment variables):
- ADMIN_EMAIL (set in .env)
- ADMIN_PASSWORD (set in .env)

License
MIT
