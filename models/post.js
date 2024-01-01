const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    published: {type: Boolean, default: true},
    date: {type: Date, default: Date.now},
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

PostSchema.virtual("url").get(function () {
    return `/${this._id}`
})

module.exports = mongoose.model("Post", PostSchema);