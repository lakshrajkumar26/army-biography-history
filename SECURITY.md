# Security Guidelines

## Environment Variables

This project uses environment variables to store sensitive configuration. **NEVER commit the `.env` file to version control.**

### Setup

1. Copy the example file:
   ```bash
   cd server
   cp .env.example .env
   ```

2. Update the `.env` file with your secure values:
   - `JWT_SECRET`: Use a strong, random string (at least 32 characters)
   - `MONGO_URI`: Your MongoDB connection string
   - `PORT`: Server port (default: 5000)

### Generating a Secure JWT Secret

Use one of these methods to generate a secure JWT secret:

```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Using OpenSSL
openssl rand -hex 32
```

## Security Best Practices

### 1. JWT Token Security
- JWT tokens are used for authentication
- Tokens expire after 1 day
- Always use HTTPS in production
- Store tokens securely on the client side

### 2. Password Security
- Passwords are hashed using bcrypt with 10 salt rounds
- Never store plain text passwords
- Enforce strong password policies in production

### 3. CORS Configuration
- Currently allows `localhost:5173` and `localhost:3000`
- Update `server/index.js` to restrict origins in production
- Only allow your production domain

### 4. MongoDB Security
- Use authentication for MongoDB in production
- Never expose MongoDB port publicly
- Use connection string with credentials
- Enable MongoDB access control

### 5. API Security
- Admin routes are protected with JWT middleware
- Validate all user inputs
- Implement rate limiting in production
- Use helmet.js for additional security headers

## Production Deployment Checklist

- [ ] Generate strong JWT_SECRET
- [ ] Use HTTPS/TLS certificates
- [ ] Configure CORS for production domain only
- [ ] Enable MongoDB authentication
- [ ] Set NODE_ENV=production
- [ ] Implement rate limiting
- [ ] Add helmet.js for security headers
- [ ] Enable logging and monitoring
- [ ] Regular security updates for dependencies
- [ ] Implement input validation and sanitization

## Reporting Security Issues

If you discover a security vulnerability, please email the maintainers directly. Do not create public issues for security vulnerabilities.
