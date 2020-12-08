const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ballerSchema = new Schema({
    user_id:{ type: Schema.Types.ObjectId, required: true , ref: 'User'},
    club: {type: String, min: 2, max: 30},
    position: { 
        type: [String],
        enum: ['Center','Shooting Guard','Power Forward']
    },
    team_id: { type: Schema.Types.ObjectId, ref: 'Team' },
})
const Baller = mongoose.model('Baller',ballerSchema)

module.exports = Baller