const res = require('express/lib/response');
const { User, Thought } = require('../models');

module.exports = {
    // get all users
  getUsers(req, res) {
    User.find()
      .then((users) => {
        const allUsers = {
          users,
        }
        return res.json(allUsers)
      })
      .catch((err) => res.status(500).json(err));
  },
  // get single
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },

  updateUser(req, res) {
      User.findOneAndUpdate(
          {_id_:req.params.userId},
          {$set: req.body},
          { new: true, runValidators: true}
      )
      .then((user) => 
      !user 
      ? res.status(404).json({message:'User not found'})
      : res.json(user)
      )
      .catch((err) => res.status(500).json(err))
    },


    deleteUser(req, res) {
        User.findOneAndRemove(
            {_id_:req.params.userId},
        )
        .then((user) => 
        !user 
        ? res.status(404).json({message:'User not found'})
        : Thought.findOneAndUpdate(
                { users: req.params.userId },
                { $pull: { users: req.params.userId } },
                { new: true }
            )
        )
        .then((thought) =>
        !thought
            ? res.status(404).json({message: "User has no Thoughts to delete. Will continue to delete user."})
            : res.json({ message: 'User has been deleted.'})
        )
        .catch((err) => res.status(500).json(err))

    }
};