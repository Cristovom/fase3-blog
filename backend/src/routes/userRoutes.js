const router = require('express').Router();
const auth = require('../middlewares/auth');
const controller = require('../controllers/userController');

// apenas professores
router.use(auth, (req, res, next) => {
  if (req.user.role !== 'teacher') {
    return res.status(403).json({ message: 'Acesso negado' });
  }
  next();
});

router.get('/users', controller.list);
router.post('/users', controller.create);
router.put('/users/:id', controller.update);
router.delete('/users/:id', controller.remove);

module.exports = router;
