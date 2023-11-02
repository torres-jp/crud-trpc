import { publicProcedure, router } from "../trpc";
import Note from "../models/note";
import { z } from "zod";

const getNotes = publicProcedure.query(async () => {
  const notes = await Note.find();
  return notes;
});

const createNote = publicProcedure
  .input(
    z.object({
      title: z.string(),
      description: z.string(),
    })
  )
  .mutation(async ({ input }) => {
    const newNote = new Note({
      title: input.title,
      description: input.description,
    });
    const savedNote = await newNote.save();
    return savedNote;
  });

const deleteNote = publicProcedure
  .input(z.string())
  .mutation(async ({ input }) => {
    const noteFound = await Note.findByIdAndDelete(input);
    if (!noteFound) throw new Error("Note not found");
    return true;
  });

const updateNote = publicProcedure
  .input(z.string())
  .mutation(async ({ input }) => {
    try {
      const noteFound = await Note.findByIdAndUpdate(input);
      if (!noteFound) throw new Error("Note not found");
      noteFound.done = !noteFound.done;
      await noteFound.save();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  });

export const notesRouter = router({
  create: createNote,
  get: getNotes,
  delete: deleteNote,
  update: updateNote,
});
