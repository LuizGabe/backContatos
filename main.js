import express from 'express';
import { Database } from './database.js';
import { userRoute } from './src/router/User.js';
import { contactRoute } from './src/router/Contacts.js';

const app = express();
const port = 3000;

const database = new Database();

app.use(express.json())

app.get('/', (req, res) => {
	res.send('Hello World!');
})

app.use('/user', userRoute);

app.use('/contact', contactRoute)

app.listen('3000', () => {
	console.log(`Example app listening on port ${port}!`)
});
