import express from 'express';
import cors from 'cors';

import { Database } from './database.js';
import { userRoute } from './src/router/User.js';
import { contactRoute } from './src/router/Contacts.js';

const app = express();
const port = 3000;

const database = new Database();

app.use(cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.use(express.json())

app.get('/', (req, res) => {
	res.send('Hello World!');
})

app.use('/user', userRoute);

app.use('/contact', contactRoute)

app.options('/', (req, res) => {
	res.status(200).json({
		message: 'Opções possiveis',
		user: [
			{ descricao: 'Volta todos os usuários e por query param uma pesquisa' , protocol: 'GET', domain:'http://127.0.0.1:3000/user'},
			{ descricao: 'Volta um usuário com o id fornecido por param' , protocol: 'GET', domain:'http://127.0.0.1:3000/user/'},
			{ descricao: 'Adiciona ou atualiza um usuário' , protocol: 'POST', domain:'http://127.0.0.1:3000/user'},
			{ descricao: 'Deleta um usuário com o id fornecido por param' , protocol: 'DELETE', domain:'http://127.0.0.1:3000/user/'},
		],
		contact: [
			{ descricao: 'Volta todos os usuários e por query param uma pesquisa' , protocol: 'GET', domain:'http://127.0.0.1:3000/contact'},
			{ descricao: 'Adiciona ou atualiza um usuário' , protocol: 'POST', domain:'http://127.0.0.1:3000/contact'},
			{ descricao: 'Deleta um usuário com o id fornecido por param' , protocol: 'DELETE', domain:'http://127.0.0.1:3000/contact/'},
		]
	})
})

app.listen('3000', () => {
	console.log(`Example app listening on port ${port}!`)
});
