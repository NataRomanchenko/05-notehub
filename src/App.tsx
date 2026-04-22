import { useState } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";

import { fetchNotes, deleteNote } from "./services/noteService";

import NoteList from "./components/NoteList/NoteList";
import SearchBox from "./components/SearchBox/SearchBox";
import Pagination from "./components/Pagination/Pagination";
import Modal from "./components/Modal/Modal";
import NoteForm from "./components/NoteForm/NoteForm";
import { createNote } from "./services/noteService";

export default function App() {
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 500);
  
const createMutation = useMutation({
  mutationFn: createNote,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["notes"] });
  },
});
  const handleCreate = (data: {
  title: string;
  content: string;
  tag: string;
}) => {
  createMutation.mutate(data);
};
  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", page, search],
    queryFn: () => fetchNotes(page, search),
  });

  const mutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  

  const handleDelete = (id: string) => {
    mutation.mutate(id);
  };

  return (
    <div>
      <header>
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

      {data && (
        <NoteList
          notes={data.notes}
          onDelete={handleDelete}
        />
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
         <NoteForm
  onCreate={handleCreate}
  onClose={() => setIsModalOpen(false)}
/>
        </Modal>
      )}
    </div>
  );
}