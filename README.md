# **Trip Royale** 
## Made by
Himani Panwar, Naqiyah Kagzi, Komal Gupta, Anupriya Dey, Abhay Kamath, Aryan Agrawal

## Description
Trip Royale is a trip planner cum manager webapp which provides travellers with an all-in-one platform to plan, organize, and manage their trips. During trip planning with our friends/relatives, everyone faces difficulties in communicating plans, budget making, organizing the group, finding hotels and restaurants, etc. This webapp helps them manage the locations they are visiting and the activities they are taking part in and keep track of the expenditure. It also helps in splitting of the expenses. The media-sharing feature helps in uploading all the photos and videos captured into an organized directory.

We have primarily used Django Rest Framework for building APIs with Django, a Python web framework; ReactJS for creating interactive and responsive user interfaces; Cloudinary cloud service for providing APIs for handling image and video uploads, transformations, and optimizations; Google maps-API using the geopy/geocoder python library for providing the accurate geolocation of any real world address; and Travel Advisor API to obtain information about nearby restaurants, points of interest, and other location-based data like elevation, nearby landmarks etc.

## Features
-	Planning and Scheduling: Our webapp allows users to arrange events for each day, plan the schedule in advance, and add time slots for each event.
-	Recommendations: Our webapp recommends nearby eateries and other establishments sorted by costs and previous customer reviews and ratings.
-	Budget/Expense Manager: Our webapp enables users to split and manage expenses among each of the trip participants. It also provides day-wise and trip-wise expense tracking for each person in the trip.
-	Photos Sharing: Our webapp has a feature that allows members to add and share photos on the cloud.
-	Chat Feature:Our webapp includes a on the go, group chat feature for users to communicate and collaborate.

## Technologies Used
-	Django Rest Framework (DRF) – v^3.14.0
-	ReactJS – v^18.2.0
-	Cloudinary cloud service
-	Travel-Advisor API 
-	Open-Street-map API
-	React Bootstrap – v^2.7.4
-	React Router DOM – v^6.10.0
-	Material-UI (MUI) – v^5.12.1

## Installation
**Prerequisites:**
-	Node.js and npm (Node Package Manager) must be installed on your computer
-	Python and pip (Python Package Manager) must be installed on your computer
-	Django and DRF must be installed globally in your Python environment

**Step 1:** Clone the Repository using

    `git clone https://github.com/ninQ1703/trip-Royale`

**Step 2:** Install Dependencies
-	Navigate to the project directory in your terminal 
    
    `cd trip-Royale`
-	Run this command to install the required backend dependencies and starting backend server.
   
    `pip install -r requirements.txt`

**Step 3:** Set Up Backend (DRF)
- Create a superuser on the backend using the command 
  
    `python manage.py createsuperuser`
    
**Step 4:** Set Up Frontend (React)
-	Navigate to the frontend directory in your terminal using 

    `cd triproyale_frontend`
-	Run this command for installing required frontend 

    `npm install`
    
**Step 5:** Set Up Cloudinary
-	Sign up for a Cloudinary account if you don't have one already.
-	Retrieve your Cloudinary API credentials, including the cloud name, API key, and API secret.
-	Run following commands on your terminal:
```
npm install @reduxjs/toolkit
npm i cloudinary-react
npm i @cloudinary/url-gen @cloudinary/react
set CLOUDINARY_URL-cloudiary://445965659149241:JMLJKYDm9LUfdYWYc1pE4fyboI@djmd3cojf
npm install cloudinary-react --save
npm i cloudinary-react cloudinary-core
npm install react-cloudinary-upload-widget
npm install lightbox.js-react 
npm install react-helmet
```

**Step 6:** Set Up APIs
-	Visit to https://rapidapi.com/hub and search for Travel Advisor
-	Subscribe to the API and enter the key in the views.py file, line no 27, in the map directory.

**Step 7:** Run the Project
-	Start your Django development server to run the backend API. The backend server will start on port 8000 by the command
    
    `python3 manage.py runserver`
-	Start your React development server to run the frontend application by the command 
    
    `npm start`
-	Access the application in your web browser at the specified URL (e.g., http://localhost:3000/) to see the project running locally. 


