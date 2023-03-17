const { Schema, Types } = require('mongoose');

const HighScoreSchema2 = new Schema(
    {
       user_id: {
        type: Types.ObjectId,
        ref: 'User',
        required: true,
       },
       game_id: {
        type: Types.ObjectId,
        ref: 'Game',
        required: true,
       },
       score: {
        type: Number,
        required: true,
       },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
)

module.exports = HighScoreSchema2;