const { supabaseAdmin } = require('../config/supabase');

const apenasAdmin = async (req, res, next) => {
  const user_id = req.user.id;

  try {
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .select('role')
      .eq('id', user_id)
      .single();

    if (error || !data)
      return res.status(403).json({ message: 'Acesso negado' });

    if (data.role !== 'admin')
      return res.status(403).json({ message: 'Acesso restrito a administradores' });

    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erro ao verificar permissao' });
  }
};

module.exports = { apenasAdmin };