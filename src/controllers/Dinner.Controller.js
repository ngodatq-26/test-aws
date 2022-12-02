const { validationResult } = require("express-validator")
const {Dinner} = require('../models/Dinner.Schema');
const {HandleResponse} = require("../utils/HandleResponse");
const RequestUser = require('../utils/RequestUser');

module.exports = {

    //lấy thông tin của dinner
    getAll : async (req, res, next) => {
        try {
            //nếu có /:id thì sẽ là lấy 1 dinner
            if(req.params.id) {

                const dinner = await Dinner.getOneDinner(req.params.id);

                if(!dinner) {
                    return res.status(400).json(HandleResponse(400, 'error params router', null))
                }
                return res.status(200).json(HandleResponse(200, 'Get dinner successfully!', dinner))
            };


            //nếu không có thì là lấy tất cả 
            console.log(req.body.limit)
            const dinners = await Dinner.getAllDinner(req.body.skip, req.body.limit, req.body._id);

            return res.status(200).json(HandleResponse(200, 'Get all dinners successfully!', dinners))
        } 
        
        catch (error) {
            console.log(error)
            return res.status(400).json(HandleResponse(400, error, 'Error in getting dinner'));
        };
    },
    
    //tạo mới 1 dinner
    createOne : async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json(HandleResponse(400, errors.array(), null));
            }

			const user = await RequestUser(req);
            const dataRequest = {
                title: req.body.title,
                listdinner: req.body.listdinner,
                author_id: user._id,
            };

            await Dinner.saveNewDinner(req.body.title, req.body.listdinner, req.body.author_id);
            return res.status(200).json(HandleResponse(200, 'Create one successfully', dataRequest)); 
        } 
        catch (error) {
            return res.status(400).json(HandleResponse(400, error, null));
        }
    },

    //sửa,cập nhật 1 dinner
    updateOne : async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(400).json(HandleResponse(400, errors.array(), null));
            }

			const user = await RequestUser(req);
            const dinner = await Dinner.getOne(req.params.id);
			if (user.role !== 1 && user._id != dinner.author_id) {
				return res.status(401).json({
					status: 401,
					message: 'You are not authorized',
					data: {
					},
				})
			}
            const update = await Dinner.updateOneDinner(req.params.id, req.body);
            return res.status(200).json(HandleResponse(200, 'Update one successfully', update)); 
        } 
        catch (error) {
            return res.status(400).json(HandleResponse(400, error, null));
        }
    },

    //xóa danh sách các dinner cần xóa
    deleteOne : async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json(HandleResponse(400, errors.array(), null))
            }

            const user = await RequestUser(req);
            const dinner = await Dinner.getOne(req.params.id);
			if (user.role !== 1 && user._id != dinner.author_id) {
				return res.status(401).json({
					status: 401,
					message: 'You are not authorized',
					data: {
					},
				})
			}

            const arrayObjectId = req.body.listId;
            for (let [key, value] of Object.entries(arrayObjectId)) {
                await Dinner.deleteOneDinner(value);
            }

            const message = 'Delete : ' + req.body.listId + ' successfully';
            return res.status(200).json(HandleResponse(200, message, null));

        }
        catch (error) {
            return res.status(400).json(HandleResponse(400, error, null));
        }
    }
}