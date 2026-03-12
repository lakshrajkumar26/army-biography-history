# Heroes of India - Animated Web Application

A heavily animated, tribute web application honoring the brave heroes of India's armed forces. Built with React, GSAP, ScrollTrigger, Tailwind CSS, and Node.js.

## Features

- **Heavy Animations**: Powered by GSAP and ScrollTrigger for smooth, engaging animations
- **Particle Background**: Dynamic particle system for visual appeal
- **Interactive Hero Cards**: Animated cards with hover effects and transitions
- **Detailed Hero Modals**: Full-screen modals with biography and timeline
- **Responsive Design**: Works seamlessly across all devices
- **Filter System**: Filter heroes by Army, Air Force, or Navy
- **Loading Screen**: Animated loading experience
- **Neon Effects**: Glowing text and visual effects

## Tech Stack

### Frontend
- React 19
- GSAP 3.12 (with ScrollTrigger)
- Framer Motion
- Tailwind CSS
- Vite
- Axios

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- JWT Authentication
- Bcrypt

## Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (running locally or connection string)

### Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd <project-folder>
```

2. **Install Server Dependencies**
```bash
cd server
npm install
```

3. **Install Client Dependencies**
```bash
cd ../client
npm install
```

4. **Configure Environment Variables**

Create a `.env` file in the `server` directory (copy from `.env.example`):
```bash
cd server
cp .env.example .env
```

Then edit the `.env` file with your configuration:
```env
MONGO_URI=mongodb://127.0.0.1:27017/armydata
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
```

**IMPORTANT**: Never commit the `.env` file to version control. It contains sensitive information.

5. **Seed the Database**
```bash
cd server
npm run seed
```

## Running the Application

### Start the Backend Server
```bash
cd server
npm run dev
```
Server will run on `http://localhost:5000`

### Start the Frontend
```bash
cd client
npm run dev
```
Client will run on `http://localhost:5173`

## Project Structure

```
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── HeroCard.jsx          # Animated hero card component
│   │   │   ├── HeroModal.jsx         # Full-screen hero details modal
│   │   │   ├── LoadingScreen.jsx     # Animated loading screen
│   │   │   └── ParticleBackground.jsx # Canvas-based particle system
│   │   ├── pages/
│   │   │   └── Landing.jsx           # Main landing page with animations
│   │   ├── data/
│   │   │   └── artists.js            # Static hero data (reference)
│   │   ├── App.jsx
│   │   ├── index.css                 # Global styles with animations
│   │   └── main.jsx
│   ├── tailwind.config.js            # Tailwind configuration
│   └── package.json
│
├── server/
│   ├── config/
│   │   └── db.js                     # MongoDB connection
│   ├── controllers/
│   │   ├── heroController.js         # Hero CRUD operations
│   │   └── userController.js         # User authentication
│   ├── middleware/
│   │   └── authMiddleware.js         # JWT authentication
│   ├── models/
│   │   ├── heroModel.js              # Hero schema
│   │   └── userModel.js              # User schema
│   ├── routes/
│   │   ├── heroRoutes.js             # Hero API routes
│   │   └── userRoute.js              # User API routes
│   ├── utils/
│   │   └── seedHeroes.js             # Database seeding script
│   ├── index.js                      # Server entry point
│   └── package.json
│
└── README.md
```

## API Endpoints

### Heroes
- `GET /api/heroes` - Get all heroes
- `POST /api/heroes/create` - Create a new hero (Admin only)

### Users
- `POST /api/users/admin/login` - Admin login
- `POST /api/users/create` - Create user
- `GET /api/users/admin/dashboard` - Admin dashboard (Protected)

## Animation Features

### GSAP Animations
- Title entrance with elastic easing
- Filter button animations with stagger
- Hero card entrance with 3D rotation
- Parallax scrolling effects
- Floating animations
- Modal entrance animations
- Timeline item reveals

### ScrollTrigger
- Cards animate on scroll into view
- Parallax background elements
- Stats section reveal
- Quote section fade-in

### CSS Animations
- Glitch effect on title
- Neon glow pulse
- Gradient text animation
- Shimmer effects
- Custom scrollbar styling
- Particle floating animation

## Customization

### Adding New Heroes
Run the seed script or use the API:
```bash
cd server
npm run seed
```

### Modifying Animations
Edit animation parameters in:
- `client/src/pages/Landing.jsx` - Main page animations
- `client/src/components/HeroCard.jsx` - Card animations
- `client/src/components/HeroModal.jsx` - Modal animations
- `client/src/index.css` - CSS animations

### Changing Colors
Update Tailwind config in `client/tailwind.config.js`:
```javascript
colors: {
  'hero-dark': '#0a0f14',
  'hero-red': '#dc2626',
  'hero-gold': '#fbbf24',
}
```

## Browser Support
- Chrome (recommended)
- Firefox
- Safari
- Edge

## Performance Tips
- Animations are optimized with GSAP's performance features
- Particle count can be adjusted in `ParticleBackground.jsx`
- ScrollTrigger uses efficient scroll detection
- Images should be optimized for web

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
This project is created as a tribute to India's heroes.

## Acknowledgments
- Indian Armed Forces
- All the brave heroes who sacrificed for the nation
- GSAP for amazing animation library
- Tailwind CSS for styling utilities
