# TRO-TOT

TRO-TOT api server



## Requirements

Node 6.x.x or later (for native ES6 support) and MongoDB

## Developing

Run mongod on a separated terminal instance:

```bash
mongod
```

Get the dependencies

```bash
npm install
```

Configure your MongoDB connection string, server port, etc.

```bash
vim ./config.js
```

Import sample database

```bash
npm run import
```

Generate API documentation
```bash
npm run genapi
```

Run the server in dev mode (using nodemon)

```bash
npm run dev
```

The server run on `localhost:8080` by default, access to view API documentation.


