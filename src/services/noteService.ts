import axios from "axios";
import type { Note } from "../types/note";

const BASE_URL = "https://notehub-public.goit.study/api";
const token = import.meta.env.VITE_NOTEHUB_TOKEN;

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  page: number,
  search: string
): Promise<NotesResponse> => {
  const { data } = await instance.get<NotesResponse>("/notes", {
    params: { page, search },
  });
  return data;
};

export const createNote = async (note: {
  title: string;
  content: string | null;
  tag: string;
}): Promise<Note> => {
  const { data } = await instance.post<Note>("/notes", note);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await instance.delete<Note>(`/notes/${id}`);
  return data;
};