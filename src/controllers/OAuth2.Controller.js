const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

module.exports = {
    loginGoogle  : () => {
        return passport.authenticate('google', {scope : ['profile']});
    },

    callbackGoolge : (req, res, next) => {
        passport.authenticate('google', {failureFlash : '/'}),
        function(req, res) {
            res.status(200).json({
                result : 'ok',
            })
        }
    }
}