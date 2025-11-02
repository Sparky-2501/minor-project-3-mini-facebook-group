const mongoose = require('mongoose');
const Chat = require('./models/chat.js');

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

let allChats = [
    {
        from: 'neha',
        to: 'priya ',
        msg: 'hello priya how are you?',
        created_at: new Date(),
    },
    {
        from: 'priya',
        to: 'neha ',
        msg: 'hello neha i am fine',
        created_at: new Date(),
    },
    {
        from: 'neha',
        to: 'priya ',
        msg: 'what about you?',
        created_at: new Date(),
    },
    {
        from: 'priya',
        to: 'neha ',
        msg: 'i am good too',
        created_at: new Date(),
    },
];

Chat.insertMany(allChats);

