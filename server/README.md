# Server README excerpt

Server runs on port specified in PORT environment variable (default 4000).

API endpoints
- POST /api/auth/login { email, password } -> { token }
- GET /api/products
- POST /api/products (auth)
- POST /api/enquiries
- GET /api/enquiries (auth)
- POST /api/gallery (auth, multipart form-data file)

.env.example contains placeholders for required config.
