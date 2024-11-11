require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser')
const sequelize = require('./lib/databaseConfig');
const {appRouter,merger} = require("./merged-routes")
const {setReqRes} = require("./lib/variables")

const app = express();
app.use(cookieParser());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Update to match your frontend's origin
    res.header('Access-Control-Allow-Methods', 'GET,POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
  });
  

app.use((req, res, next) => {
    setReqRes(req, res);
    next();
});

//app.use('/graphql', (req, res)=> merger(req, res));
app.use(appRouter)

const PORT = process.env.PORT || 5000;
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});