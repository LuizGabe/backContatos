import { Router } from "express";
import { Database } from "../../database.js";
import { randomUUID } from "node:crypto"

const database = new Database();

const tableUsers = "users";

const userRoute = Router();

// Rota para listar todos os usuários
userRoute.get('/', (req, res) => {
  const search = req.query.search;

  if(!search){
    res.json(database.select(tableUsers));
    return
  }

  console.log(req.query.search);
  res.send(`Bucando um usuário com a busca: ${search}`);
});
userRoute.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json(database.select(tableUsers, id));
});

// Rota para acessar o usuário criado por id e nome
userRoute.post('/', (req, res) => {
  const {
    id = '',
    name = '',  
    office = '',
    coverImg = '', 
    avatarImg = '', 
    stacks = []
  } = req.body;

  if (id) {
    database.update(tableUsers, id, { name, office, coverImg, avatarImg, stacks } );
    res.send({ message: 'Contato atualizado', user: { id, name, office, coverImg, avatarImg, stacks } });
    return
  }

  const user = {
    id: randomUUID(),
    name,
    office,
    coverImg,
    avatarImg,
    stacks
  }

  database.insert(tableUsers, user);

  res.status(201).json({ message: 'Contato adicionado', user: user});
})

userRoute.delete('/:id', (req, res) => {
  const { id } = req.params;
  database.delete(tableUsers, id);
  res.send({ message: 'Contato deletado', id});
})

export { userRoute }