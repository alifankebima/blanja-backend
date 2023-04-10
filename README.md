<br />
<p align="center">
  <div align="center">
    <img height="150" src="./docs/readme/logo.svg" alt="blanja" border="0"/>
  </div>
  <h3 align="center">Blanja (E-Commerce App)</h3>
  <p align="center">
    <a href="https://github.com/alifankebima/blanja-frontend"><strong>Explore the docs »</strong></a>
    <br />
    <a href="https://blanja-frontend-alifankebima.vercel.app">View Demo</a>
    ·
    <a href="https://blanja-backend-production-71bf.up.railway.app">Api Demo</a>
  </p>
</p>

## Table of Contents

- [Table of Contents](#table-of-contents)
- [About The Project](#about-the-project)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisite](#prerequisites)
  - [Installation](#installation)
  - [Documentation](#documentation)
- [Related Project](#related-project)

# About The Project

Blanja is an E-Commerce website to make it easier for users to buy clothes online, users can view, search, and buy clothes as desired, this website also has features to manage products that have been uploaded by each seller.

## Built With

These are the libraries and service used for building this backend API

- [Express](https://expressjs.com)
- [PostgreSQL](https://www.postgresql.org)
- [Json Web Token](https://jwt.io)
- [Multer](https://github.com/expressjs/multer)
- [Google Cloud Platform](https://cloud.google.com)

# Getting Started

## Prerequisites

You'll need these programs installed before proceeding to installation

- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/en/download)

## Installation

Follow this steps to run the server locally

1. Clone this repository

```sh
git clone https://github.com/alifankebima/blanja-backend.git
```

2. Change directory to blanja-backend

```sh
cd blanja-backend
```

3. Install all of the required modules

```sh
npm install
```

4. Create PostgreSQL database, query are provided in [blanja-database-query.sql](./docs/blanja-database-query.sql)

5. Create and configure `.env` file in the root directory, example credentials are provided in [.env.example](./.env.example)

```txt
- Please note that this server requires Google Drive API credentials
- Otherwise API endpoint with image upload won't work properly
```

6. Run this command to run the server

```sh
npm run server
```

- Or run this command for running in development environment

```sh
npm run dev
```

- Run this command for debugging and finding errors

```sh
npm run lint
```

## Documentation

Documentation files are provided in the [docs](./docs) folder

- [Postman API colletion](./docs/Blanja.postman_collection.json)
- [PostgreSQL database query](./docs/blanja-database-query.sql)

API endpoint list are also available as published postman documentation

[![Run in Postman](https://run.pstmn.io/button.svg)](https://documenter.getpostman.com/view/26309865/2s93Xu15Ew)

# Related Project

:rocket: [`Frontend Blanja`](https://github.com/alifankebima/blanja-frontend)

:rocket: [`Backend Blanja`](https://github.com/alifankebima/blanja-backend)

:rocket: [`Demo Blanja`](https://blanja-frontend-alifankebima.vercel.app)
