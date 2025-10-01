# Database Maintenance Scripts

This folder contains scripts for maintaining and analyzing the Firebase Firestore database after initial data setup.

## 🔒 Security Setup (IMPORTANT)

**Before running any scripts, you must set up secure environment variables:**

1. **Copy the environment template:**
   ```bash
   cp env.example .env
   ```

2. **Fill in your Firebase credentials** in the `.env` file:
   ```env
   FIREBASE_API_KEY=your-actual-firebase-api-key
   FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
   FIREBASE_PROJECT_ID=your-project-id
   FIREBASE_STORAGE_BUCKET=your-project-id.firebasestorage.app
   FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   FIREBASE_APP_ID=your-app-id
   FIREBASE_MEASUREMENT_ID=your-measurement-id
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

## 📋 Available Maintenance Scripts

### 1. `checkDuplicatePandals.js`
**Checks for duplicate pandal entries in the database:**
- Scans all pandals for duplicate names
- Reports potential duplicates
- Helps maintain data quality

**Usage:**
```bash
node scripts/checkDuplicatePandals.js
```

### 2. `removeDuplicatePandals.js`
**Removes duplicate pandal entries:**
- Identifies and removes duplicate records
- Keeps the most recent entry
- Use with caution - creates database backups

**Usage:**
```bash
node scripts/removeDuplicatePandals.js
```

### 3. `analyzeMissingPandalData.js`
**Analyzes pandal data for missing fields:**
- Checks for incomplete pandal records
- Reports missing images, descriptions, or metro data
- Helps identify data quality issues

**Usage:**
```bash
node scripts/analyzeMissingPandalData.js
```

## 🗂️ File Structure

```
scripts/
├── checkDuplicatePandals.js    # Duplicate detection
├── removeDuplicatePandals.js   # Duplicate removal
├── analyzeMissingPandalData.js # Data quality analysis
├── firebase-config.js          # Secure Firebase configuration
└── README.md                   # This documentation
```

## 🚀 Quick Start

1. **Set up environment variables** (see Security Setup above)
2. **Check for data quality issues:**
   ```bash
   node scripts/analyzeMissingPandalData.js
   ```
3. **Check for duplicates:**
   ```bash
   node scripts/checkDuplicatePandals.js
   ```
4. **Remove duplicates if needed:**
   ```bash
   node scripts/removeDuplicatePandals.js
   ```

## 🔧 Prerequisites

- ✅ Node.js installed
- ✅ Firebase project set up
- ✅ Environment variables configured
- ✅ Existing data in Firestore database

## 🐛 Troubleshooting

- **Environment Variables Error**: Make sure `.env` file exists and contains valid Firebase credentials
- **Permission Errors**: Ensure your Firebase service account has read/write permissions
- **Network Issues**: Check your internet connection and Firebase project status
- **No Data Found**: Verify your Firestore database has pandal data

## 🔐 Security Notes

- ⚠️ **Never commit `.env` file** to version control
- ✅ All Firebase credentials are stored securely in environment variables
- ✅ Scripts use centralized `firebase-config.js` for configuration
- ✅ No hardcoded API keys or sensitive data in script files

## 📝 When to Use These Scripts

**Use these scripts for:**
- ✅ Data quality maintenance
- ✅ Duplicate detection and removal
- ✅ Database analysis and reporting
- ✅ Troubleshooting data issues

**Don't use these scripts for:**
- ❌ Initial data setup (data already exists)
- ❌ Adding new pandals (use Firebase Console or admin panel)
- ❌ Bulk data updates (data is already current)

## 🎯 Production Notes

Since all initial data has been uploaded to Firebase:
- These scripts are for **maintenance only**
- Use sparingly in production
- Always backup data before running removal scripts
- Monitor database changes carefully

## 📞 Support

If you encounter issues:
1. Check your Firebase project permissions
2. Verify environment variables are correct
3. Ensure database has existing pandal data
4. Review Firebase Console for any error logs