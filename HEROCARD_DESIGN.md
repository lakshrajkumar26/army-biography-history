# HeroCard Component - Vintage Museum Memorial Plaque Design

## Overview
Redesigned the HeroCard component to match a vintage museum-style memorial plaque aesthetic, creating an elegant historical portrait card that looks like a collectible archive item.

## Design Specifications

### Card Dimensions
- **Width**: 220px (fixed)
- **Height**: 320px (fixed)
- **Aspect Ratio**: 2:3 (portrait)
- **Border Radius**: 10px

### Color Palette
- **Background**: `#3b1c1f` - Deep burgundy vintage
- **Outer Border**: `#6e3a3f` - Burgundy border (2px)
- **Corner Decorations**: `#7b4448` - Lighter burgundy
- **Image Border**: `#9a5a5f` - Rose burgundy (2px)
- **Name Text**: `#ffffff` - Pure white
- **Year Text**: `#d9c6c6` - Light rose gray

### Card Structure

```
┌─────────────────────┐
│ ┐              ┌    │  ← Corner decorations
│                     │
│    [Hero Name]      │  ← Name (18px, white)
│                     │
│   ┌───────────┐     │
│   │           │     │
│   │  Portrait │     │  ← B&W Image (80% width)
│   │           │     │
│   └───────────┘     │
│                     │
│   1926 – 2011       │  ← Years (14px, rose gray)
│                     │
│ ┘              └    │  ← Corner decorations
└─────────────────────┘
```

### Typography

#### Name (Top)
- **Font**: Playfair Display (serif)
- **Size**: 18px
- **Weight**: 500 (medium)
- **Color**: `#ffffff`
- **Alignment**: Center
- **Letter-spacing**: 0.5px

#### Years (Bottom)
- **Font**: Playfair Display (serif)
- **Size**: 14px
- **Color**: `#d9c6c6`
- **Alignment**: Center
- **Letter-spacing**: 1px
- **Format**: Uses en dash (–) between years

### Portrait Image
- **Width**: 80% of card width
- **Filter**: `grayscale(100%)` - Black and white
- **Border**: 2px solid `#9a5a5f`
- **Border Radius**: 2px
- **Object-fit**: Cover
- **Aspect**: Auto height to maintain ratio

### Corner Decorations
Each corner has L-shaped ornamental lines:
- **Color**: `#7b4448`
- **Thickness**: 2px
- **Length**: 12px (3 Tailwind units)
- **Position**: 8px from edges

#### Corner Positions
1. **Top-Left**: Horizontal line + Vertical line below
2. **Top-Right**: Horizontal line + Vertical line below
3. **Bottom-Left**: Vertical line + Horizontal line below
4. **Bottom-Right**: Vertical line + Horizontal line below

### Shadow Effects

#### Default State
```css
box-shadow: 0 10px 20px rgba(0,0,0,0.25);
```

#### Hover State
```css
box-shadow: 0 20px 40px rgba(0,0,0,0.35);
```

### Hover Animation
When hovering over the card:
- **Transform**: 
  - `translateY(-6px)` - Lifts up
  - `rotate(1deg)` - Slight rotation
  - `scale(1.03)` - Slight enlargement
- **Transition**: `all 0.25s ease`
- **Shadow**: Enhanced to `0 20px 40px rgba(0,0,0,0.35)`

### Card Stack Effect
Cards alternate rotation for physical stack appearance:
- **Even index cards**: `rotate(2deg)`
- **Odd index cards**: `rotate(-2deg)`
- **Transform-style**: `preserve-3d` for 3D effect

### Layout Integration
- **Display**: Flex wrap layout
- **Gap**: 30px between cards
- **Justify**: Start (left-aligned)
- **Responsive**: Cards maintain fixed size, wrap to new rows

## Component Props

```javascript
{
  hero: {
    _id: string,        // Unique identifier
    name: string,       // Hero's full name
    image: string,      // Portrait image URL
    years: string,      // Birth-death years (e.g., "1926 – 2011")
    category: string,   // Category (Army, Air Force, Navy)
    title: string,      // Title/rank
    bio: string,        // Biography
    timeline: array     // Timeline events
  },
  setSelected: function, // Function to open modal
  index: number         // Card index for rotation effect
}
```

## Visual Characteristics

### Museum Archive Aesthetic
- Deep burgundy evokes vintage memorial plaques
- Corner decorations add classical frame appearance
- Grayscale portraits enhance historical feel
- Serif typography provides elegance

### Vintage Collectible Feel
- Fixed card dimensions like physical cards
- Alternating rotation creates stack effect
- Subtle shadows add depth
- Hover animation simulates picking up a card

### Historical Memorial Style
- Formal layout with centered elements
- Birth-death years format
- Decorative border elements
- Timeless color scheme

## Accessibility

### Interactive Elements
- **Cursor**: Pointer on hover
- **Focus State**: Visible outline (inherited)
- **Click Target**: Full card is clickable
- **Keyboard**: Accessible via tab navigation

### Visual Contrast
- White text on dark burgundy: High contrast
- Rose gray years on burgundy: Adequate contrast
- All text meets WCAG AA standards

## Performance

### Optimizations
- CSS transitions (no JavaScript animations)
- Fixed dimensions prevent layout shifts
- Grayscale filter applied via CSS
- Minimal DOM elements

### Image Handling
- Images loaded from backend
- Grayscale filter applied client-side
- Object-fit maintains aspect ratio
- Border adds visual frame

## Browser Support
- Chrome (latest) ✓
- Firefox (latest) ✓
- Safari (latest) ✓
- Edge (latest) ✓

## Technical Implementation

### CSS Features Used
- Flexbox for layout
- CSS transforms for hover effects
- CSS filters for grayscale
- Absolute positioning for corners
- Box shadows for depth
- Transitions for smooth animations

### Tailwind Classes
- Custom colors via bracket notation
- Responsive utilities
- Hover state modifiers
- Transition utilities
- Transform utilities

## Data Flow
1. Hero data fetched from backend API
2. Passed to HeroCard component as props
3. Card renders with hero information
4. Click opens modal with full details
5. Backend data structure unchanged

## Visual Mood
The card design evokes:
- ✓ Museum archive item
- ✓ Vintage collectible portrait
- ✓ Elegant historical memorial
- ✓ Artistic presentation
- ✓ Minimal sophistication
- ✓ Timeless aesthetic

## Build Results
- ✓ Clean build with no errors
- ✓ No ESLint warnings
- ✓ Proper TypeScript types
- ✓ Optimized bundle size
- ✓ Fast render performance
