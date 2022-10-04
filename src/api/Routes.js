module.exports = (function() {
    return {
        auth : {
            login: '/login',
            register: '/register',
            logout: '/logout',
            refreshToken : '/refresh-token'
        },
        user : {
            all : '/all',
        },
        oauth : {
            loginGoole : '/google',
            callbackGoogle : '/google/callback'
        },
        recipe: {
            all: '/',
            get: '/:id',
            update: '/:id',
            delete: '/:id',
            create: '/',
        }
    }
})()