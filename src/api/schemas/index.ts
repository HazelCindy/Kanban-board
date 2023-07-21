import gql from "graphql-tag";

const typeDefs = gql`
  "Type for a task on the Column"
  type Task {
    id: ID!
    Title: String!
    description: String!
  }
  "Column that is displayed on the column"
  type Column {
    id: ID!
    Title: String
    TaskId: [ID]
  }

  type Query {
    "get all the Columns"
    Columns: [Column]
    "get a single Column"
    Column(id: ID!): Column!
    "get all tasks"
    tasks: [Task!]
    "get single task"
    task(id: ID!): Task!
  }

  type Mutation {
    addColumn(Title: String): Column
  }
`;
export default typeDefs;
