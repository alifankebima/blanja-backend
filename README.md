# blanja_backend
blanja_backend is a simple backend app for interfacing blanja database and providing API for blanja frontend, 
this repository also serves as a learning exercise at creating backend app with express.js and creating CRUD SQL queries.

## List of third-party modules
| Modules | npm install command |
| ------ | ------ |
| [Express] | npm i express  |
| [Nodemon] | npm i nodemon  |
| [Morgan] |  npm i morgan  |
| [PostgresSQL] | npm i pg |
| [Dotenv] | npm i dotenv |
| [CORS] | npm i cors |
| [Eslint] | npm i eslint |
| [Http-errors] | npm i http-errors |

[express]: <http://expressjs.com>
[Nodemon]: <https://www.npmjs.com/package/nodemon>
[Morgan]: <https://www.npmjs.com/package/morgan>
[PostgresSQL]: <https://node-postgres.com>
[Dotenv]: <https://www.npmjs.com/package/dotenv>
[CORS]: <https://www.npmjs.com/package/cors>
[Eslint]: <https://eslint.org>
[Http-errors]: <https://www.npmjs.com/package/http-errors>



## Usage
Follow this steps to run the server :
1. Clone this repository with `git clone https://github.com/breadsticks64/blanja_backend.git`
2. Change directory to blanja_backend with `cd blanja_backend`
3. Run `node install` to install all of the required modules
4. Create and configure `.env` file, example are provided in `.env.example`
5. Run `npm run server` to run the server, or use `npm run dev` for running in development environment


## Debugging
Run `npm run debug` for debugging errors in this repository