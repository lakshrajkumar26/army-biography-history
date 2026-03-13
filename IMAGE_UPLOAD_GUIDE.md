# Image Upload Feature Guide

## Overview
The admin panel now supports direct image uploads in addition to image URLs.

## Features

### Two Ways to Add Images

#### 1. Upload Image File
- Click "Choose File" button
- Select an image from your computer
- Supported formats: JPG, PNG, GIF, WEBP
- Maximum file size: 5MB
- Image preview appears immediately
- Image is uploaded when you submit the form

#### 2. Enter Image URL
- Paste a direct image URL
- Useful for images already hosted online
- No file size limit (external hosting)

## How It Works

### Backend
1. **Multer** - Handles file uploads
2. **Storage** - Images saved to `server/uploads/` folder
3. **Static Serving** - Images accessible at `http://localhost:5000/uploads/filename.jpg`
4. **File Naming** - Unique timestamp-based names prevent conflicts

### Frontend
1. **File Selection** - User selects image file
2. **Preview** - Image preview shown before upload
3. **Upload** - File uploaded to server when form submitted
4. **URL Storage** - Server URL saved to database

## API Endpoints

### Upload Image
```
POST /api/upload/image
Content-Type: multipart/form-data
Body: { image: File }

Response:
{
  "message": "Image uploaded successfully",
  "imageUrl": "/uploads/1234567890-image.jpg",
  "filename": "1234567890-image.jpg"
}
```

## Files Created/Modified

### New Files
- `server/config/upload.js` - Multer configuration
- `server/routes/uploadRoutes.js` - Upload API routes
- `server/uploads/` - Directory for uploaded images (auto-created)

### Modified Files
- `server/index.js` - Added upload routes and static file serving
- `server/.gitignore` - Added uploads/ to ignore list
- `client/src/pages/Admin.jsx` - Added image upload UI and logic

## Usage in Admin Panel

### Adding New Hero with Image Upload
1. Click "+ Add New Hero"
2. Fill in hero details
3. Click "Choose File" under "Upload Image File"
4. Select an image from your computer
5. Preview appears automatically
6. Click "Add Hero" to save (image uploads automatically)

### Using Image URL Instead
1. Skip the file upload
2. Scroll to "Enter Image URL"
3. Paste the image URL
4. Click "Add Hero"

### Editing Hero Image
1. Click "Edit" on any hero
2. Current image shows as preview
3. Upload new file to replace, OR
4. Change the URL field
5. Click "Update Hero"

## Technical Details

### File Storage
- Location: `server/uploads/`
- Naming: `timestamp-randomnumber.extension`
- Example: `1703123456789-987654321.jpg`

### Security
- File type validation (images only)
- File size limit (5MB)
- Unique filenames prevent overwrites
- Uploads folder excluded from git

### Image Access
- Uploaded images: `http://localhost:5000/uploads/filename.jpg`
- External URLs: Direct URL as provided

## Notes
- Uploaded images are stored locally on the server
- For production, consider using cloud storage (AWS S3, Cloudinary, etc.)
- The uploads folder is gitignored to avoid committing large files
- Image preview works for both uploaded files and URLs
