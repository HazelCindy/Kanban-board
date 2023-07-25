import { gql } from "@apollo/client";

// Query to get the columns
export const COLUMNS = gql`
  query {
    Columns {
      id
      Title
    }
  }
`;

// Query to get all tasks
export const TASKS = gql`
  query {
    Tasks {
      id
      Description
      ColumnId
    }
  }
`;

// Clear tasks in a specific column
export const CLEAR_TASKS = gql`
  mutation clearColumnTasks($columnId: String!) {
    clearColumnTasks(ColumnId: $columnId)
  }
`;

// Rename column
export const UPDATE_COLUMNS = gql`
  mutation updateColumn($updateColumnId: ID!, $title: String, $taskId: [ID]) {
    updateColumn(id: $updateColumnId, Title: $title, TaskId: $taskId) {
      id
      Title
    }
  }
`;

// Update tasks content
export const UPDATE_TASKS = gql`
  mutation updateTask(
    $updateTaskId: ID!
    $description: String
    $columnId: String
  ) {
    updateTask(
      id: $updateTaskId
      Description: $description
      ColumnId: $columnId
    ) {
      id
      Description
      ColumnId
    }
  }
`;
// Delete individual column
export const DELETE_COLUMN = gql`
  mutation deleteColumn($deleteColumnId: ID!) {
    deleteColumn(id: $deleteColumnId)
  }
`;
// Add a column on the board
export const ADD_COLUMN = gql`
  mutation addColumn($title: String) {
    addColumn(Title: $title) {
      Title
      id
    }
  }
`;
// Add task to column
export const ADD_TASK = gql`
  mutation addTask($columnId: String!, $description: String) {
    addTask(ColumnId: $columnId, Description: $description) {
      id
      Description
      ColumnId
    }
  }
`;
