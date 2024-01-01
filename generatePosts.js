const Post = require('./models/post');
const AuthorizedUser = require('./models/authorizedUser');
const Comment = require('./models/comment')
require('dotenv').config();

async function newPost(title, content, published) {
    const comments = []
    for (let i = 0; i < 5; i++) {
        const comment = new Comment({
            author: "atrej",
            content: `Comment #${i}`
        })

        comments.push(comment);
    }
    await Comment.bulkSave(comments);
    const post = new Post({
        title: title,
        content: content,
        published: published,
        comments: comments,
    });
    
    await post.save();
}

async function createPost() {
    try {
        await newPost(
            "Third Title", 
            "Lorem ipsum dolor sit amet, officia deserunt mollit anim id est laborum.", 
            true);
        console.log("Successfully saved");
        return;
    } catch (e) {
        console.error(e);
    }
}

async function createSuperUser() {
    try {
        const user = new AuthorizedUser({
            firstname: "Atrej",
            lastname: "Mak",
            email: "atrejmak93@gmail.com",
            username: "atrejmak",
            password: "1234",
        });

        await user.save();

        console.log("Successfully saved");
        return;
    } catch (e) {
        console.error(e);
    }
}


async function main() {
    // Set up mongoose connection
    const mongoose = require("mongoose");
    mongoose.set("strictQuery", false);

    main().catch((err) => console.log(err));
    async function main() {
    await mongoose.connect(process.env.MONGO_DB);
    }

    await createPost();
    //await createSuperUser();

    mongoose.disconnect();
}

main();

