const { Schema, model, mongoose } = require('mongoose');


const userSchema = new mongoose.Schema({
  username: { 
      type: String, 
      required: true, 
      unique: true, 
      trim: true 
  },
    email: { 
        type: String, 
        required: true, 
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],   
}, 
    thoughts: [{
        type: Schema.Types.ObjectId, 
        ref: 'Thought', 
        
    }],
    friends: [{
        type: Schema.Types.ObjectId, 
        ref: 'User'
    }],
},
{

    toJSON: {
        virtuals: true,
      },
      id: false,
});

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});


const User = mongoose.model('User', userSchema);


// const newUser = new User({
//     username: "kilowattdot",
//     email: "dot.gilchrist95@gmail.com"
// })


// User.find({}).exec((err, collection) => {
//     if (err) {
//       return handleError(err);
//     }
//     if (collection.length === 0) {
//       return User.insertMany(
//         [
//           { username: 'kilowattdot' },
//           { email: 'dot.gilchrist95@gmail.com' },
//         ],
//         (insertError) =>
//           insertError ? handleError(insertError) : console.log('Inserted')
//       );
//     }
//     return console.log('Already populated');
//   });


module.exports = User;
