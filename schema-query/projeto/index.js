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

    type Query {
        olaMundo: String
        horaAtual: Date
        usuarioLogado: Usuario
    }

`
const resolvers = {
    
    Usuario: {

        salario(usuario) {
            return usuario.salario_real
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