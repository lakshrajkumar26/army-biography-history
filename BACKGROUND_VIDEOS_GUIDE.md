# Background Videos Guide

## Overview
The HeroModal now features aesthetic background videos positioned strategically to enhance the visual experience without interfering with the hero frames.

## Video Placement

### Layout
```
┌─────────────────────────────────────────────┐
│  [bg1]                          [bg2]       │  Top corners
│                                             │
│         [Left Frame] [Center] [Right]       │  Hero frames
│  [bg2]                          [bg3]       │  Middle (behind frames)
│                                             │
│  [bg3]                          [bg1]       │  Bottom corners
└─────────────────────────────────────────────┘
```

### Positions

1. **Top Left Corner**
   - Video: bg1.mp4
   - Size: 280x200px
   - Position: top 5%, left 3%
   - Opacity: 20%
   - Blur: sm

2. **Top Right Corner**
   - Video: bg2.mp4
   - Size: 320x220px
   - Position: top 8%, right 4%
   - Opacity: 15%
   - Blur: sm

3. **Bottom Left**
   - Video: bg3.mp4
   - Size: 300x210px
   - Position: bottom 6%, left 5%
   - Opacity: 18%
   - Blur: sm

4. **Bottom Right**
   - Video: bg1.mp4
   - Size: 290x200px
   - Position: bottom 8%, right 6%
   - Opacity: 20%
   - Blur: sm

5. **Middle Left** (behind left frame)
   - Video: bg2.mp4
   - Size: 250x180px
   - Position: top 35%, left 2%
   - Opacity: 12%
   - Blur: md (more blur)

6. **Middle Right** (behind right frame)
   - Video: bg3.mp4
   - Size: 260x190px
   - Position: top 40%, right 3%
   - Opacity: 12%
   - Blur: md (more blur)

## Video Properties

### All Videos Have:
- `autoPlay` - Start automatically
- `muted` - No sound
- `loop` - Continuous playback
- `playsInline` - Mobile compatibility
- `pointer-events-none` - Non-interactive
- `z-index: 0` - Behind all modal content

### Visual Effects:
- **Blur**: Softens the video (sm = small, md = medium)
- **Opacity**: 12-20% for subtle effect
- **Object-cover**: Fills the area without distortion

## Setup Instructions

### 1. Add Video Files
Place your video files in: `client/public/videos/`
- bg1.mp4
- bg2.mp4
- bg3.mp4

### 2. Video Recommendations
- **Format**: MP4 (H.264 codec)
- **Resolution**: 1920x1080 or 1280x720
- **Duration**: 5-15 seconds (loops automatically)
- **File Size**: Under 5MB each for performance
- **Content**: Abstract, subtle motion (particles, waves, gradients)

### 3. Suggested Video Types
- Particle effects
- Smoke/fog animations
- Abstract geometric patterns
- Gradient flows
- Light rays
- Subtle color transitions

## Customization

### Change Video Position
Edit `client/src/components/HeroModal.jsx`:
```javascript
style={{
  width: '280px',
  height: '200px',
  top: '5%',      // Adjust vertical position
  left: '3%',     // Adjust horizontal position
}}
```

### Change Opacity
```javascript
className="absolute object-cover opacity-20 blur-sm"
                                    ↑
                            Change this value (0-100)
```

### Change Blur Amount
```javascript
className="absolute object-cover opacity-20 blur-sm"
                                              ↑
                                    Options: blur-sm, blur-md, blur-lg
```

### Add More Videos
Copy one of the existing video blocks and adjust:
- Position (top/bottom/left/right)
- Size (width/height)
- Video source (bg1/bg2/bg3)
- Opacity and blur

## Performance Tips

1. **Optimize Videos**
   - Use video compression tools
   - Lower resolution if needed
   - Shorter duration = smaller file

2. **Lazy Loading**
   - Videos only load when modal opens
   - Automatically pause when modal closes

3. **Mobile Considerations**
   - Videos work on mobile with `playsInline`
   - Consider reducing number of videos for mobile

## Aesthetic Guidelines

### Do's:
✅ Use subtle, abstract content
✅ Keep opacity low (10-25%)
✅ Apply blur for dreamy effect
✅ Position in corners and edges
✅ Use complementary colors

### Don'ts:
❌ Don't use high-contrast videos
❌ Don't place over hero frames
❌ Don't use videos with text
❌ Don't make them too bright
❌ Don't use jarring motion

## Example Video Sources

### Free Video Resources:
- Pexels Videos (pexels.com/videos)
- Pixabay Videos (pixabay.com/videos)
- Coverr (coverr.co)
- Videvo (videvo.net)

### Search Terms:
- "abstract particles"
- "smoke background"
- "gradient animation"
- "light rays"
- "bokeh effect"
- "subtle motion background"

## Troubleshooting

### Videos Not Playing?
1. Check file paths: `/videos/bg1.mp4`
2. Verify files exist in `client/public/videos/`
3. Check browser console for errors
4. Try different video format/codec

### Performance Issues?
1. Reduce video file sizes
2. Lower video resolution
3. Reduce number of videos
4. Increase blur (hides lower quality)

### Videos Too Visible?
1. Lower opacity value
2. Increase blur amount
3. Use darker/subtler videos
4. Adjust positioning

## Current Implementation

The background videos are positioned to create depth and atmosphere while ensuring the hero frames remain the focal point. The strategic placement in corners and behind frames adds visual interest without distraction.
