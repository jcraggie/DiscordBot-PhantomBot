const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GuildDataSchema = new Schema({
    guildAllycode: String,
    fileName: String,
    id: String,
    name: String,
    desc: String,
    leader: String,
    members: Number,
    status: Number,
    required: Number,
    bannerColor: String,
    bannerLogo: String,
    message: String,
    gp: Number,
    updated: Number,
    updatedText: String,
    fetchEpoch: Number,
    fetchText: String

});

const GuildData = mongoose.model('GuildData', GuildDataSchema);

module.exports = GuildData;