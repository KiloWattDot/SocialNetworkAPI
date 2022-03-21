
const { Schema, model, mongoose } = require('mongoose');
const reactionSchema = require('./Reaction');


const thoughtSchema = new mongoose.Schema({
    thoughtText: { 
        type: String,
        require: true,
        min: [1],
        max: [280],
    },
    
    createdAt: {
        type: Date,
        default: Date.now,
        
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema],
},
{

    toJSON: {
        virtuals: true,
        getters: true,
      },
      id: false,
});

thoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
  });
  
  const Thought = mongoose.model('thought', thoughtSchema);


  const newThought = new Thought({
    thoughtText: "I wonder what new ways NFTs will be utilized 10 years from now",
    username: "kilowattdot"
})


// Thought.find({}).exec((err, collection) => {
//     if (err) {
//       return handleError(err);
//     }
//     if (collection.length === 0) {
//       return Thought.insertMany(
//         [
//           { thoughtText: 'I wonder what new ways NFTs will be utilized 10 years from now' },
//           {  username: 'kilowattdot' },
//         ],
//         (insertError) =>
//           insertError ? handleError(insertError) : console.log('Inserted')
//       );
//     }
//     return console.log('Already populated');
//   });

  
  module.exports = { Thought, newThought};