const validarProduto = (req, res, next) => {
  const { nome, quantidade, preco } = req.body;

  if (!nome || nome.trim() === '')
    return res.status(400).json({ message: 'O nome do produto e obrigatorio' });

  if (nome.trim().length < 2)
    return res.status(400).json({ message: 'O nome deve ter pelo menos 2 caracteres' });

  if (nome.trim().length > 100)
    return res.status(400).json({ message: 'O nome deve ter no maximo 100 caracteres' });

  if (quantidade === undefined || quantidade === null)
    return res.status(400).json({ message: 'A quantidade e obrigatoria' });

  if (typeof quantidade !== 'number' || quantidade < 0)
    return res.status(400).json({ message: 'A quantidade deve ser um numero positivo' });

  if (!Number.isInteger(quantidade))
    return res.status(400).json({ message: 'A quantidade deve ser um numero inteiro' });

  if (preco === undefined || preco === null)
    return res.status(400).json({ message: 'O preco do produto e obrigatorio' });

  if (typeof preco !== 'number' || preco < 0)
    return res.status(400).json({ message: 'O preco deve ser um numero positivo' });

  if (preco > 999999.99)
    return res.status(400).json({ message: 'O preco nao pode ser maior que R$ 999.999,99' });

  next();
};

const validarAtualizacaoProduto = (req, res, next) => {
  const { nome, quantidade, preco } = req.body;

  if (Object.keys(req.body).length === 0)
    return res.status(400).json({ message: 'Informe pelo menos um campo para atualizar' });

  if (nome !== undefined) {
    if (nome.trim() === '')
      return res.status(400).json({ message: 'O nome nao pode ser vazio' });
    if (nome.trim().length < 2)
      return res.status(400).json({ message: 'O nome deve ter pelo menos 2 caracteres' });
    if (nome.trim().length > 100)
      return res.status(400).json({ message: 'O nome deve ter no maximo 100 caracteres' });
  }

  if (quantidade !== undefined) {
    if (typeof quantidade !== 'number' || quantidade < 0)
      return res.status(400).json({ message: 'A quantidade deve ser um numero positivo' });
    if (!Number.isInteger(quantidade))
      return res.status(400).json({ message: 'A quantidade deve ser um numero inteiro' });
  }

  if (preco !== undefined) {
    if (typeof preco !== 'number' || preco < 0)
      return res.status(400).json({ message: 'O preco deve ser um numero positivo' });
    if (preco > 999999.99)
      return res.status(400).json({ message: 'O preco nao pode ser maior que R$ 999.999,99' });
  }

  next();
};

module.exports = { validarProduto, validarAtualizacaoProduto };