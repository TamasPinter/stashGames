const { Schema, model } = require('mongoose');
const highScore1 = require('./HighScore1');
const highScore2 = require('./HighScore2');
const highScore3 = require('./HighScore3');
const highScore4 = require('./HighScore4');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must use a valid email address'],
        },
        password: {
            type: String,
            required: true,
            minLength: 8,
        },
        location: {
            type: String,
            required: false,
        },
        picture: {
            type: String,
            required: false,
        },
        game1: [highScore1],
        game2: [highScore2],
        game3: [highScore3],
        game4: [highScore4],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

// get total count of friends on retrieval
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('user', userSchema);
module.exports = User;