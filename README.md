# Superhero Hunter App

Superhero Hunter App is a web application developed using HTML, CSS, and JavaScript. It allows users to explore information about superheroes from the Marvel universe, view details about individual superheroes, and manage their favorite superheroes.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Contributing](#contributing)
- [Screenshots of Project](#screenshots)
## Introduction

Superhero Hunter App is a coding ninjas skill test project that brings the Marvel universe to your fingertips. It leverages HTML, CSS, and JavaScript to provide users with a visually appealing and interactive experience. Users can browse through a catalog of superheroes, view details, and manage their favorite superheroes.

## Features

- View a catalog of Marvel superheroes.
- Explore details about individual superheroes.
- Like or unlike superheroes to add or remove them from your favorites.
- View your favorite superheroes in a separate section.
- Responsive design

## Getting Started

To get started with the Superhero Hunter App, follow these simple steps:

1. **Download the Code:**

2. **Marvel API Configuration**

The Superhero Hunter App uses the Marvel API to fetch superhero data. Follow these steps to set up your Marvel API account and configure the app:

a. **Create a Marvel API Account:**
   - Visit the [Marvel Developer Portal](https://developer.marvel.com/) and sign up for a free developer account.

b. **Generate API Keys:**
   - Once logged in, create a new project in the Marvel Developer Dashboard.
   - Obtain your public and private API keys from the created project.

c. **Update Configuration:**
   - Open the `configApi.js` file in the project.
   - Replace the placeholder values with your actual public and private keys:

     ```javascript
     // configApi.js

     export const url = 'https://gateway.marvel.com/v1/public/';
     export const url2 = 'https://gateway.marvel.com/v1/public/characters/';
     export const timestamp = 'your-timestamp'; // Use a timestamp value
     export const apikey = 'your-public-key'; // Replace with your public key
     export const hashValue = 'your-generated-hash'; // Replace with your generated hash
     ```

d. **Save Changes:**
   - Save the changes to the `configApi.js` file.

Now your Superhero Hunter App is configured to interact with the Marvel API using your personal API keys.

2. **Run on Chrome:**
   - Open the `index.html` file in your preferred web browser, such as Chrome.

That's it! You are now ready to explore the Marvel universe with the Superhero Hunter App.

## Usage
- Browse through the catalog to discover Marvel superheroes.
- Click on a superhero card to view detailed information.
- Like or unlike a superhero to manage your favorites.
- View your favorite superheroes in the liked section.

## Contributing
Contributions are welcome! If you'd like to contribute to the Superhero Hunter App, please follow these steps:

- Fork the repository.
- Create a new branch for your feature or bug fix.
- Make changes and commit them.
- Push the changes to your fork.
- Create a pull request.

## Screenshots of Project

### Homepage

![image](https://github.com/Shinia-Gupta/Superhero-Hunter_CN/assets/113818197/b55fb8c2-63c4-4dfd-8e04-23060d6e9cec)

### Favourites Page

![image](https://github.com/Shinia-Gupta/Superhero-Hunter_CN/assets/113818197/2783b00e-ccef-49dc-bd3f-84a179f3cd39)

### Superhero Details Page

![image](https://github.com/Shinia-Gupta/Superhero-Hunter_CN/assets/113818197/5e0cc12c-605e-430e-8a00-0686187bb981)

![image](https://github.com/Shinia-Gupta/Superhero-Hunter_CN/assets/113818197/77061659-0a96-47d3-995c-e529783a4271)

