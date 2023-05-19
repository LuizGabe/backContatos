import express from 'express';
import Database from './database.js';

const app = express();
const port = 3000;
const database = new Database();
app.use(express.json())

app.get('/', (req, res) => {
	res.send('Hello World!');
})


// Rota para adicionar um usuário
app.post('/add', (req, res) => {
	const { name, number, imgUrl } = req.body;
})

// Rota para listar todos os usuários
// Rota para acessar o usuário criado por id e nome
// Rota para editar o usuário
// Rota que deleta o usuário
// Rota que lista os usuários

// Rota que Lista os contatos do usuário
// Rota que adiciona um novo contato
// Rota que edita um contato
// Rota que deleta um contato



app.listen('3000', () => {
	console.log(`Example app listening on port ${port}!`)
});
