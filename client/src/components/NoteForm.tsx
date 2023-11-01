import { ChangeEvent, FormEvent, useState } from "react";
import { trpc } from "../trpc";

function NoteForm() {
  const [note, setNote] = useState({
    title: "",
    description: "",
  });

  const addNotes = trpc.note.create.useMutation();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addNotes.mutate(note, {
      onSuccess: () => {
        console.log("Note added successuflly");
      },
    });
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="title"
        name="title"
        autoFocus
        onChange={handleChange}
      />
      <textarea
        name="description"
        placeholder="description"
        onChange={handleChange}
      ></textarea>
      <button>save</button>
    </form>
  );
}

export default NoteForm;
