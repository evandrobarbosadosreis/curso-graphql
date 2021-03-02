const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`
    type Query {
        horaAtual: String
    }

`
const resolvers = {
    Query: {
        horaAtual() {
            return `${new Date()}`;
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