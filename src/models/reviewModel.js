const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const reviewSchema = new mongoose.Schema({
    bookId: {
        type: ObjectId,
        required: true,
        ref: "bookManagement"
    },
    reviewedBy: {
        type: String,
        required: true,
        default: 'Guest',
        trim:true
    },
    reviewedAt: {
        type: Date,
    },
    rating: {
        type: Number,
        minimum: 1,
        maximum: 5,
        required: true
    },
    review: { 
        type: String ,
        trim:true
    },
        
    isDeleted: {
        type: Boolean,
        default: false
    },

}, { timestamps: true });

module.exports = mongoose.model('review', reviewSchema);