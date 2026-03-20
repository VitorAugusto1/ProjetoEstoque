const express = require('express');
const router = express.Router();
const { autenticar } = require('../middleware/auth');
const {
  criarProduto,
  listaProdutosUsuarios,
  deleteProduto,
  deleteProdutoLote,
  atualizarProduto
} = require('../controllers/productController');

router.post('/products', autenticar, criarProduto);
router.get('/products/me', autenticar, listaProdutosUsuarios);
router.delete('/products/:id', autenticar, deleteProduto);
router.delete('/products', autenticar, deleteProdutoLote);
router.put('/products/:id', autenticar, atualizarProduto);

module.exports = router;