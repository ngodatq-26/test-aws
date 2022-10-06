const { validationResult } = require("express-validator");
const { Book } = require("../models/Book.Schema");
const {HandleResponse} = require("../utils/HandleResponse")

module.exports = {

    getAll : async (req, res, next) => {
        try {
            if(req.params.id) {
                const book = await Book.getOneBook(req.params.id);
                if(!book) {
                    return res.status(400).json(HandleResponse(400, 'error params router', null))
                }
                return res.status(200).json(HandleResponse(200, 'Get book successfully!', book))
            }

            const books = await Book.getAllBook(req.body.skip, req.body.limit, req.body.author);

            return res.status(200).json(HandleResponse(200, 'Get books successfully!', books));
        } catch (error) {
            console.log(error);
            return res.status(400).json(HandleResponse(400, error, null));
        }
    },

    createOne : async (req, res, next) => {
        try{
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json(HandleResponse(400, errors.array(), null));
            }

            const dataRequest = {
                title: req.body.title,
                listdbook: req.body.listbook,
                author: req.body.author
            };

            await Book.saveNewBook(req.body.title, req.body.listbook, req.body.author);
            return res.status(200).json(HandleResponse(200, 'Create one successfully', dataRequest)); 
        } 
        catch (error) {

            return res.status(400).json(HandleResponse(400, error, null));
        }
    },

    updateOne : async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(400).json(HandleResponse(400, errors.array(), null));
            }

            const update = Book.updateOneBook(req.params.id, req.body);
            return res.status(200).json(HandleResponse(200, 'Update one successfully', req.body)); 
        } 
        catch (error) {
            console.log(error)
            return res.status(400).json(HandleResponse(400, error, null));
        }
    },

    delete : async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json(HandleResponse(400, errors.array(), null))
            }

            const arrayObjectId = req.body.listId;
            for (let [key, value] of Object.entries(arrayObjectId)) {
                await Book.deleteOneBook(value);
            }

            const message = 'Delete : ' + req.body.listId + ' successfully';
            return res.status(200).json(HandleResponse(200, message, null));

        }
        catch (error) {
            return res.status(400).json(HandleResponse(400, error, null));
        }
    }
}