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

// Connect to database via massive
massive(process.env.CONNECTIONSTRING).then( db => {
    app.set( 'db', db )
} );

//////////////////////////////////////////////////////////////////////////////////// AUTH0 ////////////////////////////////////////////////////////////////////////
// THIS IS THE STRATEGY
passport.use( new Auth0Strategy( {
    domain: process.env.AUTH_DOMAIN,
    clientID: process.env.AUTH_CLIENT_ID,
    clientSecret: process.env.AUTH_CLIENT_SECRET,
    callbackURL: process.env.AUTH_CALLBACK
},
    function( accessToken, refreshToken, extraParams, profile, done ) {
        const db = app.get('db')
        // If user exists, get their data. If not, create a new user
        db.find_user( profile.id ).then( user => {
            if( user[0] )
                return done( null, user )
            else {
                db.create_user( [profile.displayName, profile.emails[0].value, profile.picture, profile.id] )
                  .then( user => {
                    return done( null, user[0] )
                })
            };
        } );
    }
) );

// This is invoked once to set things up
passport.serializeUser( function( user, done ) {
    done( null, user )
} );
// User comes from session - this is invoked for every endpoint
passport.deserializeUser( function( user, done ) {
    app.get('db').find_session_user( user[0].id ).then( user => {
        return done( null, user[0] )
    })
} );

// Directs user to auth0.com to enter credentials
app.get( '/auth', passport.authenticate('auth0') );

// Redirects user based on input
app.get( '/auth/callback', passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000/#/private',
    failureRedirect: 'http://localhost:3000/#/'
}) );

// Gets user if found
app.get( '/auth/me', ( req, res ) => {
    if( !req.user )
        return res.status(404).send('User not found')
    else
        return res.status(200).send( req.user )
} );

// Log out
app.get( '/auth/logout', ( req, res ) => {
    req.logOut() //Passport gives us this to terminate a login session
    return res.redirect(302, 'http://localhost:3000/#/') //res.redirect comes from Express to redirect the user to the given url
})



let port = 3005;
const portChalk = chalk.cyan.underline.bold;
app.listen( port, () => {
    console.log( portChalk(`Eavesdropping on port ${port}`) )
});