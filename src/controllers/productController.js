const { supabase } = require('../config/supabase');

const criarProduto = async (req, res) => {
  const { nome, quantidade, preco } = req.body;
  const user_id = req.user.id;

  const { data: result, error } = await supabase
    .from('products')
    .insert([{ nome, quantidade, preco, user_id }])
    .select()
    .single();

  if (error)
    return res.status(400).json({ message: 'Erro ao cadastrar produto' });

  return res.status(201).json({ message: 'Produto cadastrado com sucesso', data: result });
};

const listaProdutosUsuarios = async (req, res) => {
  const user_id = req.user.id;

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('user_id', user_id);

  if (error)
    return res.status(400).json({ message: 'Erro ao buscar produtos' });

  const produtos = data.map(p => ({
    ...p,
    preco: parseFloat(p.preco)
  }));

  return res.json(produtos);
};

const deleteProduto = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.id;

  const { data: deleted, error } = await supabase
    .from('products')
    .delete()
    .eq('id', id)
    .eq('user_id', user_id)
    .select();

  if (error)
    return res.status(400).json({ message: 'Erro ao excluir produto' });

  if (!deleted || deleted.length === 0)
    return res.status(404).json({ message: 'Produto nao encontrado' });

  return res.json({ message: 'Produto excluido com sucesso' });
};

const deleteProdutoLote = async (req, res) => {
  const { ids } = req.body;
  const user_id = req.user.id;

  if (!ids || !Array.isArray(ids) || ids.length === 0)
    return res.status(400).json({ message: 'Informe uma lista de IDs para excluir' });

  const { data: deleted, error } = await supabase
    .from('products')
    .delete()
    .in('id', ids)
    .eq('user_id', user_id)
    .select();

  if (error)
    return res.status(400).json({ message: 'Erro ao excluir produtos' });

  return res.json({
    message: `${deleted.length} produto(s) excluido(s) com sucesso`,
    deletados: deleted.length,
    solicitados: ids.length
  });
};

const atualizarProduto = async (req, res) => {
  const { id } = req.params;
  const { nome, quantidade, preco } = req.body;
  const user_id = req.user.id;

  const updates = {};
  if (nome) updates.nome = nome;
  if (quantidade !== undefined) updates.quantidade = quantidade;
  if (preco !== undefined) updates.preco = preco;

  if (Object.keys(updates).length === 0)
    return res.status(400).json({ message: 'Nenhum campo para atualizar' });

  const { data: result, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', id)
    .eq('user_id', user_id)
    .select();

  if (error)
    return res.status(400).json({ message: 'Erro ao atualizar produto' });

  if (!result || result.length === 0)
    return res.status(404).json({ message: 'Produto nao encontrado' });

  return res.json({ message: 'Produto atualizado com sucesso', data: result[0] });
};

module.exports = { criarProduto, listaProdutosUsuarios, deleteProduto, deleteProdutoLote, atualizarProduto };