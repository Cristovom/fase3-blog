const User = require('../models/User');

exports.list = async (req, res) => {
  const { role } = req.query;
  const filter = role ? { role } : {};
  const users = await User.find(filter).sort({ createdAt: -1 });
  res.json(users);
};

exports.create = async (req, res) => {
  const { name, email, role } = req.body;
  if (!name || !email || !role) {
    return res.status(400).json({ message: 'Campos obrigatórios' });
  }
  const user = await User.create({ name, email, role });
  res.status(201).json(user);
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(id, req.body, { new: true });
  if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
  res.json(user);
};

exports.remove = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
  res.json({ ok: true });
};
