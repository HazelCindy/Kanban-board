import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schemas";
import { addMocksToSchema } from "@graphql-tools/mock";
import { makeExecutableSchema } from "@graphql-tools/schema";

const mocks = {
  Query: () => ({
    getBoards: () => [...new Array(10)],
  }),
  Board: () => ({
    id: () => "1",
    title: () => "To do",
    cards: () => {
      return {
        id: "card1",
        name: "Today",
      };
    },
  }),
};

export async function startApolloServer() {
  const server = new ApolloServer({
    schema: addMocksToSchema({
      schema: makeExecutableSchema({ typeDefs }),
      mocks,
    }),
  });
  const { url } = await startStandaloneServer(server);
  console.log(`
    🚀  Server is running!
    📭  Query at ${url}
  `);
}

// startApolloServer();
