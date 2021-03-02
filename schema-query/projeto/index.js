const { ApolloServer, gql } = require('apollo-server')

// Definição dos schemas

const typeDefs = gql`

    scalar Date

    type Usuario {
        id: Int
        nome: String
        email: String
        idade: Int,
        salario: Float
        ativo: Boolean
    }

    type Produto {
        nome: String!
        preco: Float!
        desconto: Float
        precoComDesconto: Float
    }

    type Query {
        olaMundo: String
        horaAtual: Date
        usuarioLogado: Usuario,
        produtoEmDestaque: Produto,
        buscarSorteioMega: [Int]
        usuarios: [Usuario],
        usuario(id: Int): Usuario
    }
`
// Lista de usuários usados nos exemplos

const listaUsuarios = [
    {
        id: 1,
        nome: 'Ana da Web',
        email: 'anaweb@email.com',
        idade: 25,
        salario_real: 1500.25,
        ativo: true
    },
    {
        id: 2,
        nome: 'Juca da Web',
        email: 'jucaweb@email.com',
        idade: 45,
        salario_real: 1200.55,
        ativo: false
    },
    {
        id: 2,
        nome: 'Lúcia da Web',
        email: 'luciaweb@email.com',
        idade: 40,
        salario_real: 5200.00,
        ativo: true
    }
]

// Implementação dos resolvers

const resolvers = {
    
    Usuario: {
        salario(usuario) {
            return usuario.salario_real
        }
    },

    Produto: {
        precoComDesconto(produto) {
            if (produto.desconto > 0) {
                return produto.preco * (100 - produto.desconto) / 100;
            }
            return produto.preco
        }
    },

    Query: {

        olaMundo() {
            return 'Olá, mundo!'
        },

        horaAtual() {
            return new Date()
        },

        usuarioLogado() {
            return listaUsuarios[0];
        },

        produtoEmDestaque() {
            return {
                nome: 'Meu produto de exemplo',
                preco: 100,
                desconto: 25
            }
        },

        buscarSorteioMega() {
            return [10, 51 , 63, 34, 14]
        },

        usuarios() {
            return listaUsuarios
        },

        usuario(_, { id }) {
            var selecionado = listaUsuarios.filter(u => u.id == id);
            return selecionado ? selecionado[0] : null;
        }

    }
}

// Inicialização dos serviços

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({ url }) => {
    console.log(`Executando em ${url}`)
});