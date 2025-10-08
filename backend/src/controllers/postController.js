const Post = require('../models/Post');

// GET /posts - Lista todos os posts
exports.getTodosPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ criadoEm: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar os posts', erro: error });
  }
};

// POST /posts - Criar nova postagem
exports.criarPost = async (req, res) => {
  const { titulo, conteudo, autor } = req.body;

  if (!titulo || !conteudo || !autor) {
    return res.status(400).json({ mensagem: 'Título, conteúdo e autor são obrigatórios.' });
  }

  try {
    const novoPost = new Post({ titulo, conteudo, autor });
    await novoPost.save();
    res.status(201).json(novoPost);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao criar o post', erro: error });
  }
};

// GET /posts/:id - Obter um post específico por ID
exports.getPostPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ mensagem: 'Post não encontrado.' });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar o post', erro: error });
  }
};

// PUT /posts/:id - Atualizar um post existente
exports.atualizarPost = async (req, res) => {
  const { id } = req.params;
  const { titulo, conteudo, autor } = req.body;

  try {
    const postAtualizado = await Post.findByIdAndUpdate(
      id,
      { titulo, conteudo, autor },
      { new: true, runValidators: true }
    );

    if (!postAtualizado) {
      return res.status(404).json({ mensagem: 'Post não encontrado.' });
    }

    res.status(200).json(postAtualizado);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao atualizar o post', erro: error });
  }
};

// DELETE /posts/:id - Deletar um post por ID
exports.deletarPost = async (req, res) => {
  const { id } = req.params;

  try {
    const postRemovido = await Post.findByIdAndDelete(id);

    if (!postRemovido) {
      return res.status(404).json({ mensagem: 'Post não encontrado.' });
    }

    res.status(200).json({ mensagem: 'Post deletado com sucesso!' });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao deletar o post', erro: error });
  }
};

// GET /posts/search?q=palavra - Buscar posts por palavra-chave
exports.buscarPosts = async (req, res) => {
  const { q } = req.query;

  if (!q || q.trim() === '') {
    return res.status(400).json({ mensagem: 'A query de busca (q) é obrigatória.' });
  }

  try {
    const resultados = await Post.find({
      $or: [
        { titulo: { $regex: q, $options: 'i' } },
        { conteudo: { $regex: q, $options: 'i' } }
      ]
    });

    res.status(200).json(resultados);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro na busca', erro });
  }
};

