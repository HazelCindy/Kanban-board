import { ColumnsProps } from "@/src/components/column";
import { TaskProps } from "@/src/components/task";

const Columns: ColumnsProps[] = [];
const Tasks: TaskProps[] = [];

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
      const updatedColumnIndex: number = Columns.findIndex(
        (column) => column.id === id
      );
      if (updatedColumnIndex) {
        Columns[updatedColumnIndex].Title = Title;
        return Columns[updatedColumnIndex];
      }
      return null;
    },
    addTask: (_: any, { Description, ColumnId }: TaskProps) => {
      const newTask = {
        id: String(Tasks.length + 1),
        Description,
        ColumnId,
      };
      Tasks.push(newTask);
      return newTask;
    },
  },
};
export default resolvers;
