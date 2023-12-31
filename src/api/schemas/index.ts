import gql from "graphql-tag";

const typeDefs = gql`
  "Type for a task on the Column"
  type Task {
    id: ID!
    Description: String!
    ColumnId: String!
  }
  "Column that is displayed on the column"
  type Column {
    id: ID!
    Title: String
  }

  type Query {
    "get all the Columns"
    Columns: [Column]
    "get a single Column"
    Column(id: ID!): Column
    "get all tasks"
    Tasks: [Task]
    "get single task"
    Task(id: ID!): Task
  }

  type Mutation {
    "Mutation to add a column to Board"
    addColumn(Title: String): Column
    "Mutation to add a task to a column"
    addTask(Description: String, ColumnId: String!): Task
    "Update Column"
    updateColumn(id: ID!, Title: String): Column
    "Update Task"
    updateTask(id: ID!, Description: String, ColumnId: String): Task
    "Delete Column"
    deleteColumn(id: ID!): Boolean
    "Delete Task"
    deleteTask(id: ID!): Boolean
    "Clear column"
    clearColumnTasks(ColumnId: String!): Boolean
  }
`;
export default typeDefs;
