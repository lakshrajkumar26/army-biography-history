# Quick Setup Guide

## Step-by-Step Instructions

### 1. Install Dependencies

**Server:**
```bash
cd server
npm install
```

**Client:**
```bash
cd client
npm install
```

### 2. Start MongoDB
Make sure MongoDB is running on your system:
```bash
# Windows (if installed as service)
net start MongoDB

# Or run mongod directly
mongod
```

### 3. Seed the Database
```bash
cd server
npm run seed
```

You should see:
```
Connected to MongoDB
Cleared existing heroes
Successfully seeded heroes data
```

### 4. Start the Backend
```bash
cd server
npm run dev
```

Expected output:
```
Server running at http://localhost:5000
MongoDB Connected: 127.0.0.1
```

### 5. Start the Frontend
Open a new terminal:
```bash
cd client
npm run dev
```

Expected output:
```
VITE v7.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
```

### 6. Open in Browser
Navigate to: `http://localhost:5173/`

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check connection string in `server/config/db.js`
- Default: `mongodb://127.0.0.1:27017/armydata`

### Port Already in Use
**Backend (5000):**
- Change PORT in `server/.env`
- Update API URL in `client/src/pages/Landing.jsx`

**Frontend (5173):**
- Vite will automatically suggest another port

### CORS Errors
- Ensure backend is running
- Check allowed origins in `server/index.js`
- Default allows: `http://localhost:5173` and `http://localhost:3000`

### Missing Dependencies
```bash
# Server
cd server
npm install express mongoose cors dotenv bcrypt jsonwebtoken

# Client
cd client
npm install react react-dom axios framer-motion gsap
npm install -D tailwindcss postcss autoprefixer
```

### Animation Not Working
- Clear browser cache
- Check browser console for errors
- Ensure GSAP is installed: `npm list gsap` in client folder

## Testing the Application

### Test Backend API
```bash
# Get all heroes
curl http://localhost:5000/api/heroes

# Health check
curl http://localhost:5000/healthy
```

### Test Frontend
1. Page should load with animated title
2. Filter buttons should appear with animation
3. Hero cards should animate on scroll
4. Click a card to open modal
5. Scroll down to see stats section animate
6. Scroll to top button should appear after scrolling

## Features to Test

- [ ] Loading screen appears
- [ ] Particle background is visible
- [ ] Title has glitch and neon effects
- [ ] Filter buttons work (All, Army, Air Force, Navy)
- [ ] Hero cards animate on scroll
- [ ] Cards have hover effects
- [ ] Modal opens with animations
- [ ] Modal shows biography and timeline
- [ ] Stats section animates on scroll
- [ ] Quote section fades in
- [ ] Scroll to top button appears/works
- [ ] Responsive on mobile devices

## Performance Tips

### If animations are laggy:
1. Reduce particle count in `ParticleBackground.jsx` (line ~30)
2. Disable some GSAP animations in `Landing.jsx`
3. Use Chrome for best performance

### If page loads slowly:
1. Optimize images (use smaller sizes)
2. Enable production build: `npm run build` in client
3. Check network tab for slow API calls

## Next Steps

### Add More Heroes
Edit `server/utils/seedHeroes.js` and run:
```bash
npm run seed
```

### Customize Animations
- Edit GSAP timelines in component files
- Modify CSS animations in `client/src/index.css`
- Adjust Tailwind config for colors

### Deploy
1. Build frontend: `cd client && npm run build`
2. Serve static files from backend
3. Deploy to Heroku, Vercel, or AWS

## Need Help?

Check the main README.md for detailed documentation.
