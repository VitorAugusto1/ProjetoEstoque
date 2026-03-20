const { supabase } = require('../config/supabase');

const autenticar = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]?.replace(/"/g, '');

  if (!token)
    return res.status(401).json({ message: 'Token nao informado' });

  const { data: userData, error } = await supabase.auth.getUser(token);

  if (error || !userData?.user)
    return res.status(401).json({ message: 'Usuario nao autenticado' });

  req.user = userData.user;
  next();
};

module.exports = { autenticar };