var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var Schema = mongoose.Schema;

var publicationSchema = new Schema({
    publication: { type: String, required: true },
    created_at: Date,
    author:{ type: Schema.Types.ObjectId, required: true}

});
//this is in the middle of the process of saving the user to the database
publicationSchema.pre('save', function (next) {
    //console.log('saved');
    var publication = this;
    if (this.created_at) this.created_at = new Date();

    next();

});

module.exports = mongoose.model('Publication', publicationSchema);