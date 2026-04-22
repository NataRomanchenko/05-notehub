import { useState } from "react";
import css from "./NoteForm.module.css";

interface Props {
  onCreate: (data: {
    title: string;
    content: string;
    tag: string;
  }) => void;
  onClose: () => void;
}

export default function NoteForm({ onCreate, onClose }: Props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("Todo");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onCreate({ title, content, tag });
    onClose(); 
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input
        className={css.input}
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className={css.textarea}
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <select
        className={css.select}
        value={tag}
        onChange={(e) => setTag(e.target.value)}
      >
        <option value="Todo">Todo</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Shopping">Shopping</option>
      </select>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancel}
          onClick={onClose}
        >
          Cancel
        </button>

        <button type="submit" className={css.submit}>
          Create note
        </button>
      </div>
    </form>
  );
}