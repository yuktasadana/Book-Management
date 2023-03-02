const mongoose =require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const bookSchema = new mongoose.Schema({
    title :{
        type : String,
        required : true,
        unique : true,
        trim:true

    },
    excerpt : {
        type : String,
        required : true,
        trim:true
    },
    userId : {
        type : ObjectId,
        ref : "User",
    },
    ISBN : {
        type : String,
        unique :true,
        required : true,
        trim:true
    },
    category : {
        type : String,
        required : true,
        trim:true
    },
    subcategory : {
        type : String,
        required : true,
        trim:true
    },
    isDeleted : {
        type : Boolean,
        default :false
    },
    deletedAt:{
     type : Date
    },
    reviews : {
        type : Number,
        default :0,
        trim:true
    },
    releasedAt : {
        type : Date,
        required : true
    },
    bookCover : {
        type : String,
    }
 }, {timestamps: true})

    module.exports = mongoose.model("bookManagement",bookSchema);