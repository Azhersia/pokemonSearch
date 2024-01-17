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

      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`);
      const fetchedPokemon = await response.json();

      setPokemon(fetchedPokemon);
      console.log(fetchedPokemon);
    } catch (error) {
      console.error("Could not fetch:", error);
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
      <div className='flex flex-col h-screen w-full  items-center'>
        <div className='flex justify-center items-center gap-5'>
          <input
            placeholder='Enter a pokemon'
            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            type='text'
            className='border-black rounded shadow shadow-emerald-500/60 focus:shadow-emerald-600/60 p-1 m-2  outline-none bg-slate-100 hover:bg-slate-200 focus:bg-slate-200'
          />
          <button onClick={search} className='bg-slate-100 shadow shadow-emerald-500/60 hover:shadow-emerald-600/60 p-1 hover:bg-slate-200' >Search</button>
        </div>

        <div className='flex flex-col justify-center items-center bg-emerald-100 w-ful'>
          {pokemon.id && (
            <>
              <h1>Name: {pokemon.name}</h1>
              <h1>Base xp: {pokemon.base_experience}</h1>
              <h1> Id: {pokemon.id}</h1>

              {pokemon.sprites && (

                <div className='flex justifty-center items-center ' >
                  <img
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name}
                    className='flex mt-3 block max-h-96 max-w-96'
                  />
                </div>

              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
export default App
