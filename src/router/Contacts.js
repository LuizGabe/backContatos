import { Router } from "express";
import { Database } from "../../database.js";
import { randomUUID } from "node:crypto"

const database = new Database();

const tableContacts = "contacts";

const contactRoute = Router();

// Rota que Lista os contatos do usuário
contactRoute.get('/', (req, res) => {
  res.json(database.select('contacts'))
})

// Rota que Busca um contato por nome ou id
contactRoute.get('/search/:busca', (req, res) => {
  res.send(`Busca um contato ${req.params.busca}`);
})

// Rota que adiciona um novo contato
contactRoute.post('/', (req, res) => {
  const {
    id = '',
    name = '',
    number = '',
    imgUrl = ''
  } = req.body;

  if (id) { // Caso o id seja informado, é atualizado
    database.update(tableContacts, id, {
      name,
      number,
      imgUrl
    })
    res.send({ message: 'Contato atualizado', contact: { id, name, number, imgUrl } });
    return
  }

  const user = {
    id: randomUUID(),
    name,
    number,
    imgUrl
  }
  database.insert(tableContacts, user);
  res.status(201).json({ message: 'Contato adicionado', contact: user});
})

// Rota que deleta um contato
contactRoute.delete('/:id', (req, res) => {
  const { id } = req.params
  database.delete(tableContacts, id);
  res.send({ message: 'Contato deletado', id});
})

export { contactRoute }