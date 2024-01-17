import { useState, useEffect } from 'react'
import './index.css'

function App() {

  const [searchTerm, setSearchTerm] = useState('');
  const [pokemon, setPokemon] = useState({})

  const fetchData = async () => {
    if (!searchTerm) {
      return;
    }

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`);
      const fetchedPokemon = await response.json();

      setPokemon(fetchedPokemon);
      console.log(fetchedPokemon);
    } catch (error) {
      console.error("Could not fetch:", error);
      // You may want to handle errors and provide user feedback
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  function search() {
    fetchData();
  }

  return (
    <>
      <img src="src\images\background.png" className='w-full h-screen absolute -z-30' />
      <div className='flex flex-col justify-center items-center'>
        <div className='flex justify-center items-center gap-5'>
          <input
            placeholder='Enter a pokemon'
            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            type='text'
            className='border-black rounded shadow shadow-emerald-500/60 focus:shadow-emerald-600/60 p-1 m-2  outline-none bg-slate-100 hover:bg-slate-200 focus:bg-slate-200'
          />
          <button onClick={search} className='bg-slate-100 shadow shadow-emerald-500/60 hover:shadow-emerald-600/60 p-1 hover:bg-slate-200' >Search</button>
        </div>

        {pokemon.id && (
          <>
            <h1> Id: {pokemon.id}</h1>
            <h1>Name: {pokemon.name}</h1>
            <h1>Base xp: {pokemon.base_experience}</h1>

            {pokemon.sprites && (
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className='mt-3 block max-h-96 max-w-96'
              />
            )}
          </>
        )}
      </div>
    </>
  );
}
export default App
