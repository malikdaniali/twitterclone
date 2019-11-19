const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  name: String,
  password: String,
  photo: String,
  tweets: [{
    tweet: { type: Schema.Types.ObjectId, ref: 'Tweet'}
  }],
  following: [{
    type: Schema.Types.ObjectId, ref: 'User'
  }],
  followers: [{
    type: Schema.Types.ObjectId, ref: 'User'
  }]
});

UserSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) return next();
  if (user.password) {
    bcrypt.genSalt(10, function(err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, null, function(err, hash) {
        if (err) return next();
        user.password = hash;
        next(err);
      });
    });
  }
});

UserSchema.methods.gravatar = function(size) {
  if (!size) size = 200;
  if (!this.email) return 'https://gravatar.com/avatar/?s=' + size + '&d=retro';
  var md5 = crypto.createHash('md5').update(this.email).digest('hex');
  return 'https://gravatar.com/avatar/' + md5 + '?s=' + size + '&d=retro';
};

UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('User', UserSchema);
