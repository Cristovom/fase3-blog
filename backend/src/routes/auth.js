const router = require('express').Router();
const jwt = require('jsonwebtoken');

router.get('/ping', (req, res) => res.json({ ok: true })); // teste rápido

router.post('/login', (req, res) => {
  try {
    const { email, senha } = req.body || {};
    if (!email || !senha) return res.status(400).json({ message: 'email e senha são obrigatórios' });

    const adminEmail = process.env.TEACHER_EMAIL;
    const pass = process.env.TEACHER_PASSWORD;

    if (!adminEmail) return res.status(500).json({ message: 'TEACHER_EMAIL não configurado' });
    if (!pass) return res.status(500).json({ message: 'TEACHER_PASSWORD não configurado' });

    const ok = (email === adminEmail && senha === pass);
    if (!ok) return res.status(401).json({ message: 'Credenciais inválidas' });

    const token = jwt.sign({ sub: email, role: 'teacher' }, process.env.JWT_SECRET || 'devsecret', { expiresIn: '8h' });
    return res.json({ token, user: { name: 'Professor(a)', email, role: 'teacher' } });
  } catch (err) {
    console.error('Erro no /auth/login:', err);
    return res.status(500).json({ message: 'Erro interno no login' });
  }
});

module.exports = router;
