# OLX Clone 🛍️

A full-stack OLX clone built with React, TypeScript, Firebase, and Cloudinary. Users can sign in, list products with images, and browse products by category.

## 🔧 Tech Stack

- **React** (with Vite)
- **TypeScript**
- **Firebase Authentication & Firestore**
- **Cloudinary** (for image uploads)
- **Tailwind CSS** 

## 🚀 Features

- ✅ User Authentication (sign up/sign in with Firebase)
- ✅ Product listing with images and categories
- ✅ Upload images to Cloudinary
- ✅ Firestore as backend database
- ✅ Secure with Firebase Auth & Firestore rules

## 📂 Folder Structure

src/
├── components/
├── pages/
├── context/
├── firebase.ts
├── App.tsx
├── main.tsx


## 🛠️ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/Muhammed-sahshad/olx-clone.git
cd olx-clone

Install dependencies:
npm install

Create a .env file in the root and paste:

VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id

VITE_CLOUDINARY_UPLOAD_URL=https://api.cloudinary.com/v1_1/your-cloud-name/image/upload
VITE_CLOUDINARY_UPLOAD_PRESET=your-upload-preset

Start the dev server:
npm run dev

