require('dotenv').config();

const express = require('express')
    , bodyParser = require('body-parser')
    , massive = require('massive')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
    , session = require('express-session')
    , cors = require('cors')
    , chalk = require('chalk');

const app = express();

app.use( session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}) );
app.use( passport.initialize() );
app.use( passport.session() );

massive(process.env.CONNECTIONSTRING).then( db => {
    app.set( 'db', db );
} )



let port = 3005;
app.listen( port, () => {
    console.log( chalk`{magenta Eavesdropping on port} {cyan.underline.bold ${port}}` )
});