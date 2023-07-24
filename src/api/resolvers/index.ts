const Columns: any[] = [];

const resolvers = {
  Query: {
    Columns: () => Columns,
  },
  Mutation: {
    addColumn: (_: any, { Title }: any) => {
      const newColumn = {
        id: String(Columns.length + 1),
        Title,
      };
      Columns.push(newColumn);
      return newColumn;
    },
  },
};
export default resolvers;
