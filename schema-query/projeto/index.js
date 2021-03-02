const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`
    
    scalar Date

    type Usuario {
        id: ID
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
        produtoEmDestaque: Produto
    }

`
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
            return {
                id: 1,
                nome: 'Ana da Web',
                email: 'anaweb@email.com',
                idade: 25,
                salario_real: 1500.25,
                ativo: true
            }
        },

        produtoEmDestaque() {
            return {
                nome: 'Meu produto de exemplo',
                preco: 100,
                desconto: 25
            }
        }

    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({ url }) => {
    console.log(`Executando em ${url}`)
});