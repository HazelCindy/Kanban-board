import { ColumnsProps } from "@/src/components/column";
import { TaskProps } from "@/src/components/task";

const Columns: ColumnsProps[] = [];
const Tasks: TaskProps[] = [];

const resolvers = {
  Query: {
    // Get all columns
    Columns: () => Columns,
  },
  Mutation: {
    addColumn: (_: any, { Title, TaskId }: any) => {
      const newColumn = {
        id: String(Columns.length + 1),
        Title,
        TaskId,
      };
      Columns.push(newColumn);
      return newColumn;
    },
    addTask: (_: any, { Description }: any) => {
      const newTask = {
        id: String(Columns.length + 1),
        Description,
      };
      Tasks.push(newTask);
      return newTask;
    },
  },
};
export default resolvers;
