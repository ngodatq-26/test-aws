const db = require('../config/Connect.Mongo');
const { User } = require('../models/User.Schema');

module.exports = {
    allUsers : async (req, res, next) => {
        try {
            const account = await User.findByEmail(req.body.email);
            return res.status(200).json({
                status: 200,
                message: 'find successfully',
                data: account
            })
        } catch (err) {
            console.log(err);
            return res.status(400).json({
                status: 400,
                message: err,
                data: null
            })
        }
    }
}