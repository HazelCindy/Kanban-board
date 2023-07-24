import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import typeDefs from "./schemas/index";
import resolvers from "./resolvers/index";

// const startApolloServer = async () => {
//   const server = new ApolloServer({ typeDefs, resolvers });
//   const { url } = await startStandaloneServer(server);
//   console.log(`
//     🚀  Server is running!
//     📭  Query at ${url}
//   `);
// };
// export default startApolloServer;
const  apolloServer  =  new  ApolloServer({  typeDefs,  resolvers  });

export  const  config  =  {
    api:  {
        bodyParser:  false
    }
};

export  default  apolloServer.createHandler({ path:  "/api/graphql"  });
