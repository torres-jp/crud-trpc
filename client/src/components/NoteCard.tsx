import { util } from "zod";
import { trpc } from "../trpc";

interface Props {
  note: {
    _id: string;
    title: string;
    description: string;
    done: boolean;
  };
}

export function NoteCard({ note }: Props) {
  const deleteNote = trpc.note.delete.useMutation();
  const updateNote = trpc.note.update.useMutation();
  const utils = trpc.useContext();

  return (
    <div className="bg-zinc-800 p-2 my-2 flex justify-between">
      <div>
        <h1 className="font-bold text-xl">{note.title}</h1>
        <p>{note.description}</p>
      </div>

      <div className="flex gap-x-2">
        <button
          onClick={() => {
            deleteNote.mutate(note._id, {
              onSuccess: (data) => {
                if (data) {
                  utils.note.get.invalidate();
                }
              },
              onError: (error) => {
                console.log(error);
              },
            });
          }}
          className="bg-red-500 py-2 px-2 rounded-md text-white ml-auto"
        >
          Delete
        </button>
        <button
          onClick={async () => {
            await updateNote.mutate(note._id, {
              onSuccess(data) {
                if (data) {
                  utils.note.get.invalidate();
                }
              },
            });
          }}
          className={`py-2 px-2 rounded-md text-white ml-auto ${
            note.done ? "bg-zinc-500" : "bg-green-500"
          }`}
        >
          {note.done ? "Not done" : "done"}
        </button>
      </div>
    </div>
  );
}
