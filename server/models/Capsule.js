const mongoose = require('mongoose');

const capsuleSchema = new mongoose.Schema(
    {
        title : {
            type:String,
            required : true, 
        },
        message : {
            type: String,
            required: true,
        },
        unlockDate: {
            type: Date,
            required : true,
        },
        createdAt : {
            type: Date,
            default: Date.now
        }
    }
);

module.exports = mongoose.model('Capsule', capsuleSchema);