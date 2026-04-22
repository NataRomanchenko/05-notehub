import css from "./App.module.css";
import { useState } from "react";
import {
  useQuery,
  keepPreviousData,
} from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";

import { fetchNotes } from "../../services/noteService";

import NoteList from "../NoteList/NoteList";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";


export default function App() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 500);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", page, search],
    queryFn: () => fetchNotes(page, search),
    placeholderData: keepPreviousData,
  });

  return (
  <div className={css.container}>
    <header className={css.header}>
      <h1>Notes</h1>

      <SearchBox value={search} onChange={debouncedSearch} />

      <button onClick={() => setIsModalOpen(true)}>
        Create note
      </button>

      {data && data.totalPages > 1 && (
        <Pagination
          pageCount={data.totalPages}
          currentPage={page}
          onPageChange={setPage}
        />
      )}
    </header>

    {isLoading && <p>Loading...</p>}
    {isError && <p>Error...</p>}

    {data && <NoteList notes={data.notes} />}

    {isModalOpen && (
      <Modal onClose={() => setIsModalOpen(false)}>
        <NoteForm onClose={() => setIsModalOpen(false)} />
      </Modal>
    )}
  </div>
);
}