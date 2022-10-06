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
        },
        news: {
            getAll: '',
            getOne: '/:id',
            updateOne: '/:id',
            deleteOne: '/:id',
            createOne: '',
        }
    }
})()