<!-- Project Title -->
<h1 align="center" style="font-size: 40px; font-weight: 700; color: #00c86b; text-shadow: 1px 1px 0 #000;">Foodlify</h1>

<!-- Project Description -->
<p align="center">
  Foodlify is a web application built with Next.js that allows users to browse recipes from the Edamam API. Users can sign up and their credentials will be securely saved in the Firebase database with passwords hashed using bcrypt. The sign up form is validated using Formik library. Users can apply filters to searched recipes to narrow down the results to their final needs. When logged in, users have an ability to mark recipes as bookmarks and add them to shopping list - this data will also be stored in database. The app also utilizes sessionStorage to keep users logged in after page refresh and localStorage to save user-selected theme.   
</p>

<h4 align='center' style='font-weight: 600;'>You can try the live demo of the app <a href='https://foodlify.vercel.app'>here</a>.</h4>

<!-- Table of Contents -->

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Features](#features)
- [Installation](#installation)

<!-- Features -->

## Features

- User registration and authentication
- Input validation using Formik
- Storing user credentials in Firebase real-time database
- Password hashing using bcrypt
- Persistent login using sessionStorage
- Theme customization stored in localStorage
- Browse recipes from the Edamam API
- Search for specific recipes
- Apply filters to recipes
- Handle too many request coming from users
- Mark recipes as bookmarks and add them to shopping list 
<!-- - Keep fetched recipes saved in sessionStorage -->

<!-- Known Issues -->
<!-- ## Known Issues -->



<!-- Installation -->

## Installation

1. Clone the repository:

```bash
git clone https://github.com/wiktorjs/foodlify.git
```

2. Navigate to the project directory:

```bash
cd foodlify
```

3. Install the dependencies:

```bash
npm i
```

4. Set up the required environment variables. Create a .env.local file in the project root and add the following:

```bash
APP_ID=your_edamam_api_app_id
API_KEY=your_edamam_api_key
DB_URI=your_firebase_db_uri
```

5. Start development server:

```bash
npm run dev
```

6. Open http://localhost:3000 in your browser to access the app.
