import { ColumnsProps } from "../../components/column";
import { TaskProps } from "../../components/task";

const Columns: ColumnsProps[] = [];
let Tasks: TaskProps[] = [];

const resolvers = {
  Query: {
    // Get all columns
    Columns: () => Columns,
    // Get a single column
    Column: (_: any, { id }: ColumnsProps) =>
      Columns.find((column) => column.id === id),
    // Get all tasks
    Tasks: () => Tasks,
    // Get a single task
    Task: (_: any, { id }: TaskProps) => Tasks.find((task) => task.id === id),
  },
  Mutation: {
    addColumn: (_: any, { Title }: ColumnsProps) => {
      const newColumn = {
        id: String(Columns.length + 1),
        Title,
      };
      Columns.push(newColumn);
      return newColumn;
    },
    updateColumn: (_: any, { id, Title }: ColumnsProps) => {
      // Get the index of column to be updated
      const updatedColumnIndex = Columns.findIndex((column) => {
        return column.id === id;
      });
      if (updatedColumnIndex !== -1) {
        Columns[updatedColumnIndex].Title = Title;
        return Columns[updatedColumnIndex];
      }
      return null;
    },
    deleteColumn: (_: any, { id }: ColumnsProps) => {
      // Get the index of column to be updated
      const updatedColumnIndex = Columns.findIndex((column) => {
        return column.id === id;
      });
      if (updatedColumnIndex !== -1) {
        Columns.splice(updatedColumnIndex, 1);
        return true;
      }
      return false;
    },
    addTask: (_: any, { Description, ColumnId }: TaskProps) => {
      // addTask to column
      const newTask = {
        id: String(Tasks.length + 1),
        Description,
        ColumnId,
      };
      Tasks.push(newTask);
      return newTask;
    },
    updateTask: (_: any, { id, Description, ColumnId }: TaskProps) => {
      // Get the index of column to be updated
      const updatedTaskIndex = Tasks.findIndex((task) => {
        return task.id === id;
      });
      if (updatedTaskIndex !== -1) {
        Tasks[updatedTaskIndex].Description = Description;
        Tasks[updatedTaskIndex].ColumnId = ColumnId;
        return Tasks[updatedTaskIndex];
      }
      return null;
    },
    deleteTask: (_: any, { id }: TaskProps) => {
      // Get the index of column to be updated
      const updatedTaskIndex = Tasks.findIndex((task) => {
        return task.id === id;
      });
      if (updatedTaskIndex !== -1) {
        Tasks.splice(updatedTaskIndex, 1);
        return true;
      }
      return false;
    },
    clearColumnTasks: (_: any, { ColumnId }: TaskProps) => {
      // Get the index of column to be cleared

      if (ColumnId !== "") {
        Tasks = Tasks.filter(({ ColumnId }) => ColumnId !== ColumnId);
        return true;
      }
      return false;
    },
  },
};
export default resolvers;
