

# Fastify Population Service 🌐

## :file_folder: Table of Contents

-   [General Information](#-general-information)
-   [Technologies Used](#-technologies-used)
-   [Setup](#setup)
-   [Project Future](#-project-future)

## ℹ️ General Information
>A node.js service built with speed and throughput in mind that allows the user to GET/PUT/POST city population data.
  
## 💻 Technologies Used

- [Node v18](https://nodejs.org/) - JS Runtime
- [Fastify](https://fastify.dev/) - REST Framework
- [Redis](https://redis.io/) - Caching/Data Persistence

## :wrench: Setup
 - Ensure v18 of Node and the latest version of npm are installed on your machine.
 - Locally building this application requires an active local Redis instance on PORT:6379 (default) [instructions](https://tableplus.com/blog/2018/10/how-to-start-stop-restart-redis.html).
 - Clone this repository and run `npm install` to download all dependencies.
 - Run `npm run start` to serve the application locally (http://127.0.0.1:5555/).
 - Make GET, PUT, and POST requests using the client of your choice (e.g. Postman, REST client, etc.) and the following route (replacing :city and :state with your desired parameters): http://127.0.0.1:5555/api/population/state/:state/city/:city
