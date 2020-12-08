const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const trainerSchema = new Schema({
    club: {type: String, min: 2, max: 30},
    team_id: { type: Schema.Types.ObjectId, ref: 'Team', required: true }
})
const Trainer = mongoose.model('Trainer',trainerSchema)

module.exports = Trainer