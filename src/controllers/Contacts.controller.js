import { randomUUID } from "node:crypto"
import { Database } from "../../database.js"

const database = new Database()

const tableContacts = "contacts"

const AllContacts = (req, res) => {
  res.json(database.select(tableContacts))
}
const SearchContacts = (req, res) => {
  res.send(`Busca um contato ${req.params.busca}`);
}
const AddContact = (req, res) => {
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
}
const DeleteContact = (req, res) => {
  const { id } = req.params
  database.delete(tableContacts, id);
  res.send({ message: 'Contato deletado', id});
}

export {
  AllContacts,
  SearchContacts,
  AddContact,
  DeleteContact
}