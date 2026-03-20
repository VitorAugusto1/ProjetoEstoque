const { supabase, supabaseAdmin } = require('../config/supabase');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const emailNormalizado = email?.toLowerCase().trim();

    if (!emailNormalizado || emailNormalizado === '')
      return res.status(400).json({ message: 'Email e obrigatorio' });

    if (!emailRegex.test(emailNormalizado))
      return res.status(400).json({ message: 'O email informado e invalido' });

    if (!password || password.trim() === '')
      return res.status(400).json({ message: 'Uma senha e obrigatoria' });

    if (password.length < 6)
      return res.status(400).json({ message: 'A senha deve conter pelo menos 6 caracteres' });

    const { data, error } = await supabase.auth.signUp({
      email: emailNormalizado,
      password
    });

    if (error) {
      const message = error.message.includes('already registered')
        ? 'Email ja registrado'
        : 'Erro ao registrar';
      return res.status(400).json({ message });
    }

    return res.json({
      message: 'Usuario registrado com sucesso',
      data: { id: data.user?.id, email: data.user?.email }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erro interno ao registrar usuario' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const emailNormalizado = email?.toLowerCase().trim();

    if (!emailNormalizado || emailNormalizado === '')
      return res.status(400).json({ message: 'O email e obrigatorio' });

    if (!emailRegex.test(emailNormalizado))
      return res.status(400).json({ message: 'O email informado e invalido' });

    if (!password || password.trim() === '')
      return res.status(400).json({ message: 'A senha e obrigatoria' });

    if (password.length < 6)
      return res.status(400).json({ message: 'A senha deve ter pelo menos 6 caracteres' });

    const { data, error } = await supabase.auth.signInWithPassword({
      email: emailNormalizado,
      password
    });

    if (error) {
      let message = 'Erro ao fazer login';
      if (error.message.includes('Invalid login credentials')) message = 'Email ou senha incorretos';
      else if (error.message.includes('Email not confirmed')) message = 'O email ainda nao foi confirmado';
      else if (error.message.includes('User banned')) message = 'Esta conta esta desativada';
      return res.status(400).json({ message });
    }

    return res.json({
      message: 'Login realizado com sucesso',
      data: {
        access_token: data.session?.access_token,
        expires_in: data.session?.expires_in,
        user: { id: data.user?.id, email: data.user?.email }
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erro interno ao fazer login' });
  }
};

const listaUsuarios = async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers();

  if (error) return res.status(400).json({ message: 'Erro ao buscar usuarios' });

    const users = data.users.map(u => ({
      id: u.id,
      email: u.email,
      created_at: u.created_at,
      email_verified: u.user_metadata?.email_verified ?? false
    }));

    return res.json(users);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erro ao buscar usuarios' });
  }
};

const deletarUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const { error } = await supabaseAdmin.auth.admin.deleteUser(id);

    if (error) return res.status(400).json({ message: 'Erro ao deletar usuario' });

    return res.json({ message: 'Usuario deletado com sucesso' });
  } catch (err) {
    console.error('Erro interno:', err);
    return res.status(500).json({ message: 'Erro interno ao deletar usuario' });
  }
};

module.exports = { register, login, listaUsuarios, deletarUsuario };