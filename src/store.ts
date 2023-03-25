import { unstable_renderSubtreeIntoContainer } from "react-dom";
import { create } from "zustand";
import { fetchPokemon } from "./api";
import { Pokemon } from "./types";
import { devtools } from "zustand/middleware";

type State = {
  pokemon: Pokemon[];
  votes: Record<number, number>;
  loading: boolean;
};

type Action = {
  upVote: (id: number) => void;
  downVote: (id: number) => void;
  fetchPokemon: () => void;
};

export const useStore = create<State & Action>()(
  devtools((set) => ({
    pokemon: [],
    votes: {},
    loading: false,
    upVote: (id: number) => {
      set((state) => ({
        votes: { ...state.votes, [id]: (state.votes[id] || 0) + 1 },
      }));
    },
    downVote: (id: number) =>
      set((state) => ({
        votes: { ...state.votes, [id]: (state.votes[id] || 0) - 1 },
      })),
    fetchPokemon: async () => {
      set({ loading: true });
      const pokemon = await fetchPokemon();
      set({ pokemon, loading: false });
    },
  }))
);
