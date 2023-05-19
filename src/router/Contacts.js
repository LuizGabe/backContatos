import { Router } from "express";

const contactRoute = Router();

// Rota que Lista os contatos do usuário
contactRoute.get('/', (req, res) => {
  res.send('Retornar Lista de contatos');
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
  res.send('Adicionar/Atualizar contato');
})

// Rota que deleta um contato
contactRoute.delete('/', (req, res) => {
  res.send('Deletar contato');
})

export { contactRoute }