const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    content: {type: String, required: true },
    author: {type: String, default: "Anonymous" },
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Comment", CommentSchema);