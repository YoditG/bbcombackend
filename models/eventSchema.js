const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const eventSchema = new Schema({
    title: {type: String, min: 5, max: 100, required: true},
    description: {type: String, min: 10, max: 1000, required: true},
    date: {type: Date, required: true },
    location : {type: String, required: true},
    image: {type: String},
    swishes: {type: Number},
    shares: {type: Number},
    participants:[{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
})
const Event = mongoose.model('Event',eventSchema)

module.exports = Event