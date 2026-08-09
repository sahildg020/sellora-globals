# Final README

Sellora Globals — production-ready full-stack application for B2B exports.

Local development

1. Clone
  git clone https://github.com/sahildg020/sellora-globals.git

2. Server
  cd sellora-globals/server
  npm install
  # create a .env locally (do NOT commit it). Use .env.example as template.
  # Required env vars: MONGO_URI, JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, GMAIL_USER, GMAIL_PASS, CLIENT_URL
  npm run dev

3. Client
  cd ../client
  npm install
  # Optional: set VITE_API_URL to point to your server
  npm run dev

Seeding admin
  # Ensure ADMIN_EMAIL and ADMIN_PASSWORD are set in environment (or .env when running seed locally)
  cd server
  npm run seed

Production build
  # Client
  cd client && npm run build
  # Server
  cd ../server && npm run build

Deploy
  - Frontend: Vercel (set VITE_API_URL)
  - Backend: Render (set server env vars listed above)
  - Database: MongoDB Atlas (set MONGO_URI in Render)
  - Images: Cloudinary (CLOUDINARY_* in Render)
  - Email: Gmail SMTP (GMAIL_USER, GMAIL_PASS in Render)

Security
  - Never commit .env or secrets.
  - Use provider secret stores.

