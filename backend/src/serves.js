// Procedimento padrão
const express = require('express');
const cors = require('cors');

const porta = 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.listen(porta, () => console.log(`Rodando na porta ${porta}`));
const connection = require('./db_configs');


// Rotas de usuário

// rota para cadastrar usuários 
app.post('/usuario/cadastrar', (request, response) => {
    let params = Array(
        request.body.name,
        request.body.email,
        request.body.password,
        request.body.reescrever);
    let query = "INSERT INTO usuarios(name,email,password) VALUES(?,?,?,?);";
    connection.query(query, params, (err, results) => {
        if (results) {
            response
                .status(201)
                .json({
                    success: true,
                    message: "Usuário cadastrado.",
                    data: results
                })
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    message: "Usuário não cadastrado.",
                    data: err
                })
        }
    })
})

// rota para deletar usuários
app.delete('/usuario/deletar/:id', (request, response) => {
    let params = Array(
        request.params.id
    );

    let query = "DELETE FROM usuarios WHERE id = ?;";

    connection.query(query, params, (err, results) => {
        if (results) {
            response
                .status(200)
                .json({
                    sucess: true,
                    message: "Usuário deletado.",
                    data: results
                })
        } else {
            response
                .status(400)
                .json({
                    sucess: false,
                    message: "Não foi possível deletar o usuário.",
                    data: err
                })
        }
    })
})

// rota para listar usuários
app.get('/usuario/listar', (request, response) => {
    const query = "SELECT * FROM usuarios";
    connection.query(query, (err, results) => {
        if (results) {
            response
                .status(200)
                .json({
                    sucess: true,
                    message: "Usuários encontrados.",
                    data: results
                })
        } else {
            response
                .status(400)
                .json({
                    sucess: false,
                    message: "Usuários não encontrados.",
                    data: err
                })
        }
    })
})

// rota para editar usuário
app.pt('/usuario/editar/:id', (request, response) => {
    let params = Array(
        request.body.name,
        request.params.id
    );

    let query = "UPDATE usuarios SET name = ? WHERE id = ?";

    connection.query(query, params, (err, results) => {
        if (results) {
            response
                .status(200)
                .json({
                    sucess: true,
                    message: "Informações atualizadas.",
                    data: results
                })
        } else {
            response
                .status(400)
                .json({
                    sucess: false,
                    message: "Informações não atualizadas.",
                    data: err
                })
        }
    })
})

// login do usuariio


app.post('/login', (request, response) => {
    let params = Array(
        request.body.email
    )

    let query = "SELECT id, name, email, password, perfil FROM Usuarios WHERE email = ?";

    connection.query(query, params, (err, results) => {
        if (results.length > 0) {
            let senhaDigita = request.body.password
            let senhaBanco = results[0].password

            if (senhaBanco === senhaDigita) {
                response
                    .status(200)
                    .json({
                        success: true,
                        message: "Sucesso",
                        data: results[0]
                    })
            } else {
                response
                    .status(400)
                    .json({
                        success: false,
                        message: "Verifique sua senha"
                    })
                }
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    message: "E-mail não cadastrado"
                })
        }
    })
})

// logout

function Sair(event) {
    localStorage.removeItem('informacoes')
    window.location.href = "login.html"
}

    // rota para cadastrar produto
    app.post('/produto/cadastrar', (request, response) => {
        // criar um array com os dados recebidos
        let params = Array(
            request.body.name,
            request.body.info_produto,
            request.body.valor
        );
        // criar o comando de execução no banco de dados
        let query = "INSERT INTO usuarios(name,info_produto,valor) VALUES(?,?,?);";
        // passar o comando e os dados para função query
        connection.query(query, params, (err, results) => {
            if (results) {
                response
                    .status(201)
                    .json({
                        success: true,
                        message: "Produto cadastrado.",
                        data: results
                    })
            } else {
                response
                    .status(400)
                    .json({
                        success: false,
                        message: "Produto não cadastrado.",
                        data: err
                    })
            }
        })
    })

    // rota para editar produto
    app.put('/produto/editar/:id', (request, response) => {
        let params = Array(
            request.body.name,
            request.params.id
        );

        let query = "UPDATE usuarios SET name = ? WHERE id = ?";

        connection.query(query, params, (err, results) => {
            if (results) {
                response
                    .status(200)
                    .json({
                        sucess: true,
                        message: "Informações atualizadas.",
                        data: results
                    })
            } else {
                response
                    .status(400)
                    .json({
                        sucess: false,
                        message: "Informações não atualizadas.",
                        data: err
                    })
            }
        })
    })

    // rota para deletar produto
    app.delete('/produto/deletar/:id', (request, response) => {
        let params = Array(
            request.params.id);

        let query = "DELETE FROM usuarios WHERE id = ?;";

        connection.query(query, params, (err, results) => {
            if (results) {
                response
                    .status(200)
                    .json({
                        sucess: true,
                        message: "Produto deletado.",
                        data: results
                    })
            } else {
                response
                    .status(400)
                    .json({
                        sucess: false,
                        message: "Não foi possível deletar o produto.",
                        data: err
                    })
            }
        })
    })

    // rota para listar os produtos
    app.get('/produto/listar', (request, response) => {
        const query = "SELECT * FROM usuarios";

        connection.query(query, (err, results) => {
            if (results) {
                response
                    .status(200)
                    .json({
                        sucess: true,
                        message: "Produtos encontrados.",
                        data: results
                    })
            } else {
                response
                    .status(400)
                    .json({
                        sucess: false,
                        message: "Produtos não encontrados.",
                        data: err
                    })
            }
        })
    })