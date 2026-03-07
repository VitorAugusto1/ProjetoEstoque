# ProjetoWeedShop
![Badge versão do programa](https://img.shields.io/badge/version-1.0-9cf?style=for-the-badge "Version") 

## Descrição
O projeto WeedShop consiste em um sistema de cadastro de produtos, contendo login de usuario, cadastro do produto no banco de dados. Desenvolvido em JavaScript no banco de dados Supabase, criado para estudos pessoais.


## Funcionalidades
O projeto WeedShop oferece as seguintes funcionalidades:
- Capaz de fazer o cadastro de usuario/empresa.
- Estocar produtos desejados.
- Deletar e editar informações dos produtos do seu estoque.
- Exportar para uma planilha excel.

## 1º Fase do Projeto - BackEnd

1. Registrar Usuario
- Metodo: POST
- URL: https://projetoweedshop.onrender.com/register
- Aba BOdy -> JSON:
```plaintext
{
  "email": "email-aqui",
  "password": "senha-aqui"
}
```
Essa é a primeira etapa, onde o usuario faz seu registro, que vai apara o banco de dados para conseguir fazer seu login.

2. Login
- Método: POST
- URL: https://projetoweedshop.onrender.com/login
- Aba Body -> JSON:
```plaintext
{
  "email": "email-aqui",
  "password": "senha-aqui"
}
```
Nessa etapa, o usuario faz o seu login, com as mesmas informações que utilizou para se registrar.
ALERTA IMPORTANTE:

3. 