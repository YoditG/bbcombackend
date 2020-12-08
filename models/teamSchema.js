const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const teamSchema = new Schema({
    name: {type: String,min: 3,max: 20},
    age_group: {type: [String],
        enum:
        ['U20','U18','U16','U14','U12','U10',"Women's team","Men's team"]
    },
    club: {type: String, min: 2, max: 30},
})
const Trainer = mongoose.model('Team',teamSchema)

module.exports = Trainer