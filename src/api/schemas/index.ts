import gql from "graphql-tag";

const typeDefs = gql`
  "Type for a task on the Column"
  type Task {
    id: ID!
    Description: String!
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
    Tasks: [Task!]
    "get single task"
    Task(id: ID!): Task!
  }

  type Mutation {
    "Mutation to add a column to Board"
    addColumn(Title: String): Column
    "Mutation to add a task to a column"
    addTask(Description: String): Task
  }
`;
export default typeDefs;
