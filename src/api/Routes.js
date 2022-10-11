module.exports = (function() {
    return {
        auth : {
            login: '/login',
            register: '/register',
            logout: '/logout',
            refreshToken : '/refresh-token'
        },
        user : {
            getAll : '/all',
            getOne : '/:id',
            updateOne : '/:id',
            deleteOne : '/:id'
        },
        oauth : {
            loginGoole : '/google',
            callbackGoogle : '/google/callback'
        },
        recipe: {
            getAll: '',
            getOne: '/:id',
            updateOne: '/:id',
            deleteOne: '/:id',
            createOne: '',
        },
        dinner : {
            getAll : '',
            getOne : '/:id',
            createOne : '',
            updateOne : '/:id',
            deleteOne : '/:id'
        },
        tool: {
            getAll: '',
            getOne: '/:id',
            updateOne: '/:id',
            deleteOne: '/:id',
            createOne: '',
        }
    }
})()