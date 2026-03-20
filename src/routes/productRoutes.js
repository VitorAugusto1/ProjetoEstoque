const express = require('express');
const router = express.Router();
const { autenticar } = require('../middleware/auth');
const { validarProduto, validarAtualizacaoProduto } = require('../validators/productValidator');
const {
  criarProduto,
  listaProdutosUsuarios,
  deleteProduto,
  deleteProdutoLote,
  atualizarProduto
} = require('../controllers/productController');

router.post('/products', autenticar, validarProduto, criarProduto);
router.get('/products/me', autenticar, listaProdutosUsuarios);
router.delete('/products/:id', autenticar, deleteProduto);
router.delete('/products', autenticar, deleteProdutoLote);
router.put('/products/:id', autenticar, validarAtualizacaoProduto, atualizarProduto);

module.exports = router;