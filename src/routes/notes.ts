import { publicProcedure, router } from "../trpc";
import { z } from "zod";

const getNotes = publicProcedure.query(() => {
  return [
    {
      id: 1,
      title: "Note 1",
      description: "Description 1",
    },
  ];
});

const createNote = publicProcedure
  .input(
    z.object({
      title: z.string(),
      description: z.string(),
    })
  )
  .mutation(({ input }) => {
    console.log(input);
    return "recived";
  });

export const notesRouter = router({
  create: createNote,
  get: getNotes,
});
