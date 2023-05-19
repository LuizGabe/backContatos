import { Router } from "express";

const userRoute = Router();

// Rota para listar todos os usuários
userRoute.get('/All', (req, res) => {
  res.send('Retorna todos os usuários');
})

// Rota para acessar o usuário criado por id e nome
userRoute.get('/search/:busca', (req, res) => {
  res.send('Busca um usuário');
});

userRoute.post('/', (req, res) => {
  const {
    id = '',
    name = '', 
    coverImg = '', 
    avatarImg = '', 
    stacks = []
  } = req.body;

  if (!id == '') {
    console.log('Adicionar usuários aqui');
    res.send('Adicionar usuários aqui');
  }

  console.log({ id, name, coverImg, avatarImg, stacks });
  res.send('Edita um usuário');
})

// Rota que deleta o usuário
userRoute.delete('/', (req, res) => {
  res.send('Deleta um usuário');
})

export { userRoute }