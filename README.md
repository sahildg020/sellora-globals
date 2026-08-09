# Updated README

This repository contains the Sellora Globals full-stack application (frontend + backend).

See the README in the root for basic instructions. The app includes:

- React + Vite + TypeScript frontend (client/)
- Express + TypeScript backend (server/)
- MongoDB via mongoose
- JWT authentication for admin
- Cloudinary uploads for images
- Nodemailer (Gmail SMTP) for enquiry notifications

Local development

1. Install dependencies
   - cd server && npm install
   - cd ../client && npm install

2. Create environment variables from .env.example files (root and server)

3. Run the server
   - cd server
   - npm run dev

4. Run the client
   - cd client
   - npm run dev

Seeding admin account

Set ADMIN_EMAIL and ADMIN_PASSWORD in your environment, then run:

  cd server
  npm run seed

Deployment

Frontend: Vercel (client)
Backend: Render (server)
Database: MongoDB Atlas
Images: Cloudinary
Email: Gmail SMTP

Keep secrets in the provider's secret store — do not commit them to the repository.
