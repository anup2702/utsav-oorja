# Pandal Data Update Scripts

This folder contains scripts to update and manage pandal data in the Firebase Firestore database.

## Available Scripts

### 1. `updateAllPandalData.js` (Recommended)
**Comprehensive script that handles everything:**
- Updates existing pandals with local images
- Adds new pandals matching the images in `/public/images/`
- Enhances all pandals with detailed information
- Maps all 7 images to appropriate pandals

**Usage:**
```bash
node scripts/updateAllPandalData.js
```

### 2. `updatePandalImages.js`
**Updates existing pandals with local images and enhanced details:**
- Changes imageURLs from external URLs to local `/images/` paths
- Adds descriptions, crowd status, tips, and metro information
- Only updates existing pandals

**Usage:**
```bash
node scripts/updatePandalImages.js
```

### 3. `addNewPandals.js`
**Adds new pandals that match the images in the public folder:**
- Creates new pandal entries for each image
- Includes comprehensive details and metro information
- Only adds new pandals, doesn't update existing ones

**Usage:**
```bash
node scripts/addNewPandals.js
```

## Image Mapping

The scripts map the following images to pandals:

| Image File | Pandal Name | Location |
|------------|-------------|----------|
| `kumartulipark-sarbojanin.jpg` | Kumartuli Park Sarbojanin | Kumartuli, North Kolkata |
| `collegesquare.jpg` | College Square Sarbojanin | College Street, Central Kolkata |
| `santoshmitrasqaure.jpeg` | Santosh Mitra Square | Bowbazar, Central Kolkata |
| `ajblock-saltlake-karunamoyee.jpg` | AJ Block Salt Lake Karunamoyee | AJ Block, Salt Lake |
| `newtown-sarbojanin.jpg` | New Town Sarbojanin | New Town, North 24 Parganas |
| `fdblock-saltlake.jpg` | FD Block Salt Lake | FD Block, Salt Lake |
| `akblock-karunamoyee.jpg` | AK Block Karunamoyee | AK Block, Salt Lake |

## Enhanced Data Fields

Each pandal now includes:

- **Local Image**: Uses `/images/` folder instead of external URLs
- **Description**: Detailed description of the pandal
- **Crowd Status**: High/Medium/Low crowd levels
- **Instagrammable Spots**: Photo-worthy locations and features
- **Tips**: Helpful visitor tips and best times to visit
- **Metro Station**: Nearest metro station with distance and walk time
- **Votes**: Current vote count for popularity

## Prerequisites

1. **Firebase Configuration**: Ensure your Firebase config is correct in the scripts
2. **Node.js**: Make sure Node.js is installed
3. **Firebase Project**: Your Firestore database should be set up
4. **Images**: Ensure all images are in the `/public/images/` folder

## Running the Scripts

1. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```

2. **Run the comprehensive update** (recommended):
   ```bash
   node scripts/updateAllPandalData.js
   ```

3. **Verify the updates** in your Firebase console

## Expected Output

The script will:
- ✅ Update existing pandals with local images
- ➕ Add new pandals for unmatched images
- 📝 Enhance all pandals with detailed information
- 🎯 Prepare data for production deployment

## Troubleshooting

- **Permission Errors**: Ensure your Firebase service account has write permissions
- **Network Issues**: Check your internet connection and Firebase project status
- **Image Not Found**: Verify all images exist in `/public/images/` folder
- **Duplicate Data**: The scripts handle existing data gracefully

## Next Steps

After running the scripts:
1. Test the app locally to ensure images load correctly
2. Deploy to Vercel
3. Verify all pandals display with local images
4. Check analytics tracking for pandal interactions
