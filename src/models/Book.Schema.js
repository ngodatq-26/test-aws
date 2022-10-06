const { Schema, default: mongoose } = require("mongoose");
const utils = require('../utils/Constant');

const bookSchema = new Schema({
    title : {
        type : String,
        required : true,
        default : ""
    },
    listbook : {
        type : Array,
        required : false,
    },
    author : {
        type : Schema.Types.ObjectId,
        required : true,
        ref : utils.models.users
    },
    created_at : {
        type : Date,
        default : Date.now
    },
    updated_at : {
        type: Date,
        default: Date.now
    },
})

bookSchema.static('getAllBook', async function(skip, limit, author) {
    if(!author) {
        return await this.find().limit(limit).skip(skip);
    } else return await this.find({
        author : mongoose.Types.ObjectId(author.trim())
    }).limit(limit).skip(skip);
});

bookSchema.static('getOneBook', async function (ObjectId) {
    return await this.findById(mongoose.Types.ObjectId(ObjectId.trim()));
})

bookSchema.static('saveNewBook', async function (title, listbook, author) {
    const Book = new this({
        title : title,
        listbook : listbook,
        author : mongoose.Types.ObjectId(author.trim())
    });
    Book.save();
});

bookSchema.static('updateOneBook', async function(ObjectId, update) {
    return await this.findByIdAndUpdate(mongoose.Types.ObjectId(ObjectId), update);
});

bookSchema.static('deleteOneBook', async function(ObjectId) {
    return await this.findByIdAndRemove(mongoose.Types.ObjectId(ObjectId));
});

const Book = mongoose.model(utils.models.books, bookSchema);

module.exports = {
    Book : Book,
}