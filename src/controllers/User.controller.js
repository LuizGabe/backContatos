import { Database } from "../../database.js";
import { randomUUID } from "node:crypto"

const database = new Database();

const tableUsers = "users";

const AllUserAndSearch = (req, res) => {
  const search = req.query.search;

  if(!search){
    res.json(database.select(tableUsers));
    return
  }

  console.log(req.query.search);
  res.send(`Bucando um usuário com a busca: ${search}`);
}

const UserById = (req, res) => {
  const { id } = req.params;
  res.json(database.select(tableUsers, id));
}

const AddUser = (req, res) => {
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
    stacks,
    contacts: []
  }

  database.insert(tableUsers, user);

  res.status(201).json({ message: 'Contato adicionado', user: user});
}

const DeleteById = (req, res) => {
  const { id } = req.params;
  database.delete(tableUsers, id);
  res.send({ message: 'Contato deletado', id});
}

export {
  AllUserAndSearch,
  UserById,
  AddUser,
  DeleteById
}