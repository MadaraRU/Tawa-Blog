# Tawa-Blog

Tawa Blog is a blogging platform built with the MERN stack & React Query

## Features

- Create, update, and delete blogs
- Like and dislike posts
- Leave comments on blogs
- User authentication for secure access
- Update personal profiles
- Form validation with Formik for enhanced user input handling

## Usage

- Create a MongoDB database and obtain your `MongoDB URI` - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)

### Env Variables

Rename the `.env.example` file to `.env` and add the following

```
PORT = 5000
MONGO_URI = your mongodb uri
JWT_SECRET = 'abc123'
```

Change the JWT_SECRET to what you want

### Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm install
```

### Run

```
# Run frontend (:5173) & backend (:5000)
npm run dev

# Run backend only
npm run server

# Run frontend only
npm run client
```

## Build & Deploy

```
# Create frontend prod build
cd frontend
npm run build
```
