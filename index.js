const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const chat = require('./models/chat.js');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public'))); // middleware to serve static files
app.use(express.urlencoded({ extended: true })); // middleware to parse form data

main()
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect('mongodb://localhost:27017/whatsapp');
}

// let chat1 = new chat({
//     from: 'neha',
//     to: 'priya ',
//     msg: 'hello priya how are you?',
//     Date: new Date(),
// });

// chat1.save().then((res) => {
//     console.log(res);
// });

app.post('/chats', (req, res) => {
    let { from, to, msg } = req.body;    // here we cant directly access data from body we need to use middleware
    let newChat = new chat({ from, to, msg, Date: new Date() });
    newChat.save().then((result) => {
        console.log(result);
        res.redirect('/chats');
    });
});

app.get('/chats/:id/edit', async (req, res) => {
    let { id } = req.params;
    let chatToEdit = await chat.findById(id);
    res.render('editChat.ejs', { chat: chatToEdit });
});

app.post('/chats/:id/edit', async (req, res) => {
    let { id } = req.params;
    let { from, to, msg } = req.body;
    await chat.findByIdAndUpdate(id, { from, to, msg });
    res.redirect('/chats');
});

app.post('/chats/:id/delete', async (req, res) => {
    let { id } = req.params;
    await chat.findByIdAndDelete(id);
    res.redirect('/chats');
});


app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/chats', async (req, res) => {
    let chats = await chat.find();
    console.log(chats);
    res.render('index.ejs', { chats });
});

app.get('/chats/new', (req, res) => {
    res.render('newChat.ejs');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
