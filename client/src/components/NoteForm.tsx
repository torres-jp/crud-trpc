import { ChangeEvent, FormEvent, useState } from "react";
import { trpc } from "../trpc";

const initialState = {
  title: "",
  description: "",
};

function NoteForm() {
  const [note, setNote] = useState(initialState);

  const addNotes = trpc.note.create.useMutation();
  const utils = trpc.useContext();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addNotes.mutate(note, {
      onSuccess: () => {
        console.log("Note added successuflly");
        utils.note.get.invalidate();
        setNote(initialState);
      },
    });
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-zinc-900 rounded-md p-10">
      <input
        type="text"
        placeholder="title"
        name="title"
        value={note.title}
        autoFocus
        onChange={handleChange}
        className="bg-neutral-800 px-3 py-2 w-full block rounded-md mb-3"
      />
      <textarea
        name="description"
        value={note.description}
        placeholder="description"
        onChange={handleChange}
        className="bg-neutral-800 px-3 py-2 w-full block rounded-md mb-3"
      ></textarea>
      <button className="bg-zinc-500 py-2 px-3 rounded-md text-white">
        save
      </button>
    </form>
  );
}

export default NoteForm;
