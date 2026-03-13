# Admin Panel Guide

## Overview
A complete admin panel has been created to manage heroes (add, edit, delete).

## Features

### 1. Navigation
- Top navigation bar with two buttons:
  - **Gallery**: View the public heroes gallery
  - **Admin Panel**: Access the admin dashboard

### 2. Admin Panel Features
- **View All Heroes**: Table view with hero details
- **Add New Hero**: Form to create new heroes
- **Edit Hero**: Update existing hero information
- **Delete Hero**: Remove heroes from database
- **Timeline Management**: Add/remove timeline events for each hero

### 3. Form Fields
- Name (required)
- Title (required)
- Category (Army/Air Force/Navy)
- Years (e.g., 1974 - 1999)
- Image URL (required)
- Biography (required)
- Timeline (optional, multiple entries)

## How to Use

### Access Admin Panel
1. Start your development server: `npm run dev`
2. Click "Admin Panel" in the navigation bar
3. Or navigate directly to: `http://localhost:5173/admin`

### Add a New Hero
1. Click "+ Add New Hero" button
2. Fill in all required fields
3. Add timeline events (optional):
   - Enter year and event
   - Click "Add" to add to timeline
   - Repeat for multiple events
4. Click "Add Hero" to save

### Edit a Hero
1. Find the hero in the table
2. Click "Edit" button
3. Modify the fields
4. Click "Update Hero" to save changes

### Delete a Hero
1. Find the hero in the table
2. Click "Delete" button
3. Confirm deletion in the popup

## API Endpoints

### Backend Routes (server/routes/heroRoutes.js)
- `GET /api/heroes` - Get all heroes
- `POST /api/heroes` - Create new hero
- `PUT /api/heroes/:id` - Update hero
- `DELETE /api/heroes/:id` - Delete hero

### Controllers (server/controllers/heroController.js)
- `createHero` - Create new hero
- `getHeroes` - Fetch all heroes
- `updateHero` - Update hero by ID
- `deleteHero` - Delete hero by ID

## Files Created/Modified

### New Files
- `client/src/pages/Admin.jsx` - Admin panel component
- `ADMIN_PANEL_GUIDE.md` - This guide

### Modified Files
- `client/src/App.jsx` - Added navigation and routing
- `server/routes/heroRoutes.js` - Added PUT and DELETE routes
- `server/controllers/heroController.js` - Added update and delete functions

## Notes
- No authentication required (for development)
- Image URLs must be valid and accessible
- Timeline entries are optional
- All changes are immediately reflected in the gallery
