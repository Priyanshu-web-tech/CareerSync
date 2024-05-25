
# CareerSync

CareerSync is a secure and user-friendly job portal designed to connect job seekers with employers effectively. It features robust JWT authentication to ensure user data protection, along with comprehensive CRUD functionalities for seamless data management. Users can easily create, read, update, and delete profiles and job postings, making CareerSync an efficient platform for all job-related activities.


## Demo

https://career-sync-gamma.vercel.app
## Run Locally

Clone the project

```bash
  git clone https://github.com/Priyanshu-web-tech/CareerSync.git
```

Go to the project directory

```bash
  cd CareerSync
```
### Backend Setup

Go to the backend directory

```bash
  cd backend
```

Install dependencies

```bash
  npm install
```

Create .env file & add the following in it:

```bash
MONGO_URI= your mongodb database uri
PORT=3000//most used
JWT_KEY= your JWT key
CLIENT_ORIGIN=http://localhost:5173 (Change port number as applicable)
```

Start the server

```bash
  npm run dev
```
### Frontend Setup

Go to the frontend directory

```bash
  cd frontend
```

Install dependencies

```bash
  npm install
```

Create .env file & add the following in it:

```bash
VITE_BASE_URL=http://localhost:3000 (Change port number as applicable)
```

Start the server

```bash
  npm run dev
```


## Tech Stack

**Client:** React, Redux Tool Kit, TailwindCSS

**Server:** Node, Express

**Database:** MongoDB with ORM-Mongoose

**Google Auth:** Firebase


## Screenshots

![App Screenshot](https://ik.imagekit.io/pz4meracm/CareerSync.png?updatedAt=1716622827453)

