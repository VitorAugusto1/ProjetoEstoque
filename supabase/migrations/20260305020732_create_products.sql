CREATE TABLE public.products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  quantidade INTEGER NOT NULL CHECK (quantidade >= 0),
  data DATE NOT NULL,
  preco NUMERIC(10, 2) NOT NULL CHECK (preco >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_products_user_id ON public.products(user_id);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "ver seus produtos"
  ON public.products FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "inserir seus produtos"
  ON public.products FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "atualizar seus produtos"
  ON public.products FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "deletar seus produtos"
  ON public.products FOR DELETE USING (auth.uid() = user_id);