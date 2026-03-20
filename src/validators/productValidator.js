const validarProduto = (req, res, next) => {
  const { nome, quantidade, data, preco } = req.body;

  if (!nome || nome.trim() === '')
    return res.status(400).json({ message: 'O nome do produto e obrigatorio' });

  if (quantidade === undefined || quantidade === null)
    return res.status(400).json({ message: 'A quantidade e obrigatoria' });

  if (typeof quantidade !== 'number' || quantidade < 0)
    return res.status(400).json({ message: 'A quantidade deve ser um numero positivo' });

  if (preco === undefined || preco === null)
    return res.status(400).json({ message: 'O preco do produto e obrigatorio' });

  if (typeof preco !== 'number' || preco < 0)
    return res.status(400).json({ message: 'O preco deve ser um numero positivo' });

  if (!data || data.trim() === '')
    return res.status(400).json({ message: 'A data e obrigatoria' });

  next();
};

module.exports = { validarProduto };