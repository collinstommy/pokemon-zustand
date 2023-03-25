import { useEffect, useState } from "react";
import { useStore } from "./store";

function App() {
  const { fetchPokemon, pokemon, loading, votes, upVote, downVote } = useStore(
    ({ fetchPokemon, pokemon, loading, votes, upVote, downVote }) => ({
      fetchPokemon,
      pokemon,
      loading,
      votes,
      upVote,
      downVote,
    })
  );

  useEffect(() => {
    fetchPokemon();
  }, []);

  const handleUpVote = (id: number) => {
    upVote(id);
  };

  const handleDownVote = (id: number) => {
    downVote(id);
  };

  if (loading) return <div>Loading</div>;

  return (
    <div className="flex justify-center">
      <ul className="grid grid-cols-3 gap-y-8 gap-x-4">
        {pokemon.map((pokemon) => (
          <li key={pokemon.id} className="flex flex-col items-center">
            <img src={pokemon.image} alt={pokemon.name} />
            <div>{pokemon.name}</div>
            <div className="flex">
              <button
                className="border rounded px-3 hover:bg-slate-300 focus:outline-slate-700"
                onClick={() => handleDownVote(pokemon.id)}
              >
                -
              </button>
              <p className="px-2 max-w-lg">{votes[pokemon.id] || 0}</p>
              <button
                className="border rounded px-3 hover:bg-slate-300 focus:outline-slate-700"
                onClick={() => handleUpVote(pokemon.id)}
              >
                +
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
