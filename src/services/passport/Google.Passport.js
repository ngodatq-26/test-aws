const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const config = require('../../config/Config.Env');
const api = require('../../api/Routes');

const domain = config.APP_DOMAIN;

passport.use(
    new GoogleStrategy(
        {
            clientID : config.GOOGLE_CLIENT_ID,
            clientSecret : config.GOOGLE_CLIENT_SECRET,
            callbackURL : `http://localhost:3000/api/oauth2/google/callback`,
            passReqToCallback : true
        },
       function(accessToken, refreshToken, profile, cb) {
           if(!profile) {
            
           }
       }
    )
)

module.exports = passport;