# 📁 Google Drive Clone

A full-stack Google Drive Clone that allows authenticated users to upload, manage, and download files securely — built using **Supabase**, **MongoDB**, **Express.js**, and **EJS**.

---

## 🚀 Features

- 🔐 User authentication (via Supabase)
- 📤 Upload files with progress tracking
- 📂 View and manage uploaded files
- 📥 Download files
- 🗑️ Delete files
- 📊 Metadata stored in MongoDB

---

## 🛠️ Tech Stack

| Frontend     | Backend       | Storage/Auth     | Database  |
|--------------|---------------|------------------|-----------|
| EJS + HTML/CSS/JS | Express.js     | Supabase Storage  | MongoDB   |

---


## 📦 Installation

```bash
# Clone the repo
git clone https://github.com/ShamithaJain/GoogleDriveClone.git
cd GoogleDriveClone
```
# Install dependencies
npm install

# Create a .env file and add:
MONGO_URL=
SUPABASE_URL=
SUPABASE_KEY=
BUCKET_NAME=
AUTH details (if required)

# Start the server
npm start

### 📤 File Upload Page
![File Upload](./fileupload.jpeg)

### 📝 Register Page
![Register Page](./register.png)

