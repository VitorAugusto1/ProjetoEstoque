const validarProduto = (req, res, next) => {
  let { nome, quantidade, preco } = req.body;

  if (typeof nome === 'string') nome = nome.trim();

  const quantidadeNum = Number(quantidade);
  const precoNum = Number(preco);

  if (!nome)
    return res.status(400).json({ message: 'O nome do produto é obrigatório' });

  if (nome.length < 2)
    return res.status(400).json({ message: 'O nome deve ter pelo menos 2 caracteres' });

  if (nome.length > 100)
    return res.status(400).json({ message: 'O nome deve ter no máximo 100 caracteres' });

  if (quantidade === undefined || quantidade === null)
    return res.status(400).json({ message: 'A quantidade é obrigatória' });

  if (Number.isNaN(quantidadeNum) || quantidadeNum < 0)
    return res.status(400).json({ message: 'A quantidade deve ser um número positivo' });

  if (!Number.isInteger(quantidadeNum))
    return res.status(400).json({ message: 'A quantidade deve ser um número inteiro' });


  if (preco === undefined || preco === null)
    return res.status(400).json({ message: 'O preço é obrigatório' });

  if (Number.isNaN(precoNum) || precoNum < 0)
    return res.status(400).json({ message: 'O preço deve ser um número positivo' });

  if (precoNum > 999999.99)
    return res.status(400).json({ message: 'O preço não pode ser maior que R$ 999.999,99' });

  req.body.nome = nome;
  req.body.quantidade = quantidadeNum;
  req.body.preco = precoNum;

  next();
};

const validarAtualizacaoProduto = (req, res, next) => {
  const { nome, quantidade, preco } = req.body;

  if (Object.keys(req.body).length === 0)
    return res.status(400).json({ message: 'Informe pelo menos um campo para atualizar' });

  if (nome !== undefined) {
    const nomeTrim = nome.trim();

    if (!nomeTrim)
      return res.status(400).json({ message: 'O nome não pode ser vazio' });

    if (nomeTrim.length < 2)
      return res.status(400).json({ message: 'O nome deve ter pelo menos 2 caracteres' });

    if (nomeTrim.length > 100)
      return res.status(400).json({ message: 'O nome deve ter no máximo 100 caracteres' });

    req.body.nome = nomeTrim;
  }

  if (quantidade !== undefined) {
    const quantidadeNum = Number(quantidade);

    if (Number.isNaN(quantidadeNum) || quantidadeNum < 0)
      return res.status(400).json({ message: 'A quantidade deve ser um número positivo' });

    if (!Number.isInteger(quantidadeNum))
      return res.status(400).json({ message: 'A quantidade deve ser um número inteiro' });

    req.body.quantidade = quantidadeNum;
  }

  if (preco !== undefined) {
    const precoNum = Number(preco);

    if (Number.isNaN(precoNum) || precoNum < 0)
      return res.status(400).json({ message: 'O preço deve ser um número positivo' });

    if (precoNum > 999999.99)
      return res.status(400).json({ message: 'O preço não pode ser maior que R$ 999.999,99' });

    req.body.preco = precoNum;
  }

  next();
};

module.exports = { validarProduto, validarAtualizacaoProduto };