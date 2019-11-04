var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username:{type:String, required:true, unique:true},
    password: { type: String, required: true},
    created_at:Date

});
//this is in the middle of the process of saving the user to the database
userSchema.pre('save', function(next){
  //console.log('saved');
  var user =this;
  if(this.created_at) this.created_at = new Date();

  bcrypt.genSalt(10, function(err, salt){
    bcrypt.hash(user.password,salt, function(e, hash){
      user.password = hash;

      next();
    });
  }); 
});

//compare given password and the one saved in the database
userSchema.methods.compare=function(pw){
  return bcrypt.compareSync(pw, this.password)
}

module.exports = mongoose.model('User', userSchema);