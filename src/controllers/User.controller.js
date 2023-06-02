import { Database } from "../../database.js";
import { randomUUID } from "node:crypto"

const database = new Database();

const tableUsers = "users";

const AllUsersAndSearch = (req, res) => {
  const search = req.query.search;

  if (!search) {
    res.json(database.select(tableUsers));
    return
  }

  const result = [];
  try {
    database.select(tableUsers).map((user) => {
      if(!user.name || !search) return
      if (user.name.toLowerCase().includes(search.toLowerCase())) {
        result.push(user);
        return
      }
    })
  } catch (error) {
    console.log(error)
  }

  res.json(result);
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

  if (id) { // Caso o id seja informado, é atualizado
    if (!database.select(tableUsers, id)) {
      res.status(400).json({ message: 'Usuário não encontrado', joke: 'proveded id not found in db' });
      return
    }
    database.update(tableUsers, id, { name, office, coverImg, avatarImg, stacks });
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
  res.status(201).json({ message: 'Contato adicionado', user: user });
}

const DeleteById = (req, res) => {
  const { id } = req.params;

  if (!database.select(tableUsers, id)) {
    res.status(400).json({ message: 'Usuário não encontrado', joke: 'proveded id not found in db' });
    return
  }

  database.delete(tableUsers, id);
  res.send({ message: 'Contato deletado', id });
}

export {
  AllUsersAndSearch,
  UserById,
  AddUser,
  DeleteById
}