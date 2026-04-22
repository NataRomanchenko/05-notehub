import axios from "axios";
import type { Note } from "../types/note";

const BASE_URL = "https://notehub-public.goit.study/api";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  page: number,
  search: string
): Promise<FetchNotesResponse> => {
  const response = await axios.get<FetchNotesResponse>(
    `${BASE_URL}/notes`,
    {
      params: {
        page,
        perPage: 12,
        search,
      },
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
      },
    }
  );

  return response.data;
};
export const deleteNote = async (id: string) => {
  const response = await axios.delete(`${BASE_URL}/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
    },
  });

  return response.data;
};

export const createNote = async (note: {
  title: string;
  content: string;
  tag: string;
}) => {
  const response = await axios.post(
    `${BASE_URL}/notes`,
    note,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
      },
    }
  );

  return response.data;
};