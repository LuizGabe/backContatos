import { randomUUID } from "node:crypto"
import { Database } from "../../database.js"

const database = new Database()

const tableContacts = "contacts"
const tableUsers = "users"

const AllContactsAndSearch = (req, res) => {
  const search = req.query.search;

  if(!search){
    res.json(database.select(tableContacts));
    return
  }

  let result = [];
  database.select(tableContacts).map((contact) => {
    if(contact.name.toLowerCase().includes(search.toLowerCase())){
      result.push(contact);
      return
    }
    if(contact.number.toLowerCase().includes(search.toLowerCase())){
      result.push(contact);
      return
    }
  })

  res.json(result);
}

const AddContact = (req, res) => {
  const {
    id = '',
    name,
    number,
    imgUrl = '',
    userId,
  } = req.body;

  if (id) { // Caso o id seja informado, é atualizado
    if (!database.select(tableContacts, id)) {
      res.status(400).json({ message: 'Contato não encontrado', joke: 'proveded id not found in db' });
      return
    }
    database.update(tableContacts, id, {
      name,
      number,
      imgUrl,
    });
    res.send({ message: 'Contato atualizado', contact: { id, name, number, imgUrl } });
    return
  }
  if (!userId) { // Caso o userId NÃO seja informado é retornado ERRO
    res.status(400).json({ message: 'Usuário criador do contato não adicionado', joke: 'userId is required in body' });
    return
  }
  const nameVerification = (name) => {
    let retorno = true
    database.select(tableContacts).map((contact) => {
      if (contact.name.toLowerCase() === name.toLowerCase()) {
        retorno = false
      }
    })
    return retorno
  }
  const numberVerification = (number) => {
    let retorno = true
    database.select(tableContacts).map((contact) => {
      if (contact.number.toLowerCase() === number.toLowerCase()) {
        retorno = false
      }
    })
    return retorno
  }
  if (!nameVerification(name) ||
  !numberVerification(number)) {
    res.status(400).json({ message: 'Nome ou Número Igual a outro contato adicionado', joke: 'name or number already exists' });
    return
  }

  const userFromId = database.select(tableUsers, userId);
  if (!userFromId) { // Rejeita caso o userId não seja encontrado no banco
    res.status(400).json({ message: 'Usuário criador do contato não encontrado', joke: 'userId not found' });
    return
  }

  const user = {
    id: randomUUID(),
    name,
    number,
    imgUrl,
    owner: userId,
  }

  database.insert(tableContacts, user);
  database.update(tableUsers, userFromId.id, { contacts: [...userFromId.contacts, user.id] });

  res.status(201).json({ message: 'Contato adicionado e vinculado a um usuário', contact: user});
}
const DeleteContact = (req, res) => {
  const { id } = req.params
  if (!id) {
    res.status(400).json({ message: 'Contato não encontrado', joke: 'proveded id not found in params' });
    return
  }

  if (!database.select(tableContacts, id)) {
    res.status(400).json({ message: 'Contato não encontrado', joke: 'proveded id not found in db' });
    return
  }

  const users = database.select(tableUsers);
  users.map((user) => {
    if (user.contacts.includes(id)) {
      database.update(tableUsers, user.id, { contacts: user.contacts.filter(contact => contact !== id) });
    }
  })

  database.delete(tableContacts, id);
  res.send({ message: 'Contato deletado', id});
}

export {
  AllContactsAndSearch,
  AddContact,
  DeleteContact,
}
