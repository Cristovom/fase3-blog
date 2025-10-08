const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// Rota para listar todos os posts
router.get('/posts', postController.getTodosPosts);
// Rota para criar um novo post
router.post('/posts', postController.criarPost);
// Rota para buscar posts por palavra-chave
router.get('/posts/search', postController.buscarPosts);
// Rota para obter um post específico por ID
router.get('/posts/:id', postController.getPostPorId);
// Rota para atualizar um post por ID
router.put('/posts/:id', postController.atualizarPost);
// Rota para deletar um post por ID
router.delete('/posts/:id', postController.deletarPost);

module.exports = router;
