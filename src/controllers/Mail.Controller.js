const sendEmail = require('../services/email/SendMailV2.Services');

module.exports = {
    sendMailRegister : (req, res, next) => {
        
    },

    confirmMailRegister : (req, res, next) => {
        try {
            
        } catch (error) {
            return res.status(400).json({
                status : 400,
                message : 'confirm Email register not successfully',
                data : null
            })
        }
    }
}