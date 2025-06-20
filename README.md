# Project: centivo-take-home-assignment

Developer Name: Andrew Wagner

Project Description: This is my None.js API and MongoDB Take-Home Technical Challenge solution for the Centivo job application.

# Approach Summary

When creating a new API endpoint, I want to clearly communicate why a request fails, so I added specific error messages.I structured the app for easy
expansion by separating concerns into dedicated folders and objects, minimizing clutter in server.ts. I also added a shutdown callback to prevent
issues like incomplete transactions, data corruption, or resource leaks on abrupt termination of the server.

# Assignment Interpretation

If I were on the team, I would have reached out for clarification of the 'Unique Twist' acceptance criteria. I wan't sure if the goal was to see that
I knew how to write more complex MongoDB queries, or if I was allowed to make a more user friendly experience. I implemented both approaches and left
the single-line query solution commented out to show that I am capable, but went with the clearer error messaging instead. Being able to clearly
communicate our needs to the API users is helpful practice.

Exceptions: Clear communication is harmful when it would compromise security.

Example: Showing that a password attempt failed, but identifying that the user name was correct, will enable User Enumeration hacking.

# Architecture Choices

I chose to include TypeScript into the project, because I prefer a more strictly typed language. I created some of the organizational structures that
I would use in larger projects, even though they were not strictly needed for this simple app. It felt like a good way to show that I understand and
appreciate a healthy separation of concerns in a code base.

# You will need a .env file

I properly excluded my .env file from the project, because it exposes my MongoDb database secret. For this application to run, you should add a .env
file to the root directory with the following:

SERVER_HOSTNAME: localhost

SERVER_PORT: 8000 // or what ever port you want to run this server on

MONGO_URL: 'mongodb+srv://\*\*\*\*' // the MongoDB connection string for your target cluster
