const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const Post = require('../src/models/Post');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use('/', require('../src/routes/postRoutes'));

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Rotas de Post', () => {
  let postId;

  it('deve criar um novo post', async () => {
    const response = await request(app)
      .post('/posts')
      .send({
        titulo: 'Post de teste',
        conteudo: 'Conteúdo de teste',
        autor: 'Autor teste'
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
    postId = response.body._id;
  });

  it('deve listar todos os posts', async () => {
    const response = await request(app).get('/posts');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('deve buscar um post por ID', async () => {
    const response = await request(app).get(`/posts/${postId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('titulo');
  });
});
