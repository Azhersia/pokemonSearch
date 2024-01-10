import { useState, useEffect } from 'react'
import './index.css'

function App() {

  type Pokemon = {

  }

  const [data, setData] = useState();
  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = async () => {

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`);

    const result = await response.json();
    setData(result);

  }

  useEffect(() => {
    fetchData();
  }, []);


  function search() {
    fetchData();
  }
  return (
    <>
      <div className='flex flex-col justify-center items-center  h-full w-full mt-3'>
        <div className='flex justify-center items-center'>
          <input
            placeholder='Enter a pokemon'
            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            type='text'
            className='border-black rounded shadow shadow-emerald-500/60 focus:shadow-emerald-600/60 p-2 outline-none bg-slate-100'
          />
          <button onClick={search} className='bg-slate-100 shadow shadow-emerald-500/60 hover:shadow-emerald-600/60 p-2' >Search</button>
        </div>


        {data && (
          <div className='flex flex-col justify-center items-center gap-3'>
            <h2 className=''>{data.name}</h2>
            <img className=''
              width='150px' height='150px' src={data && data.sprites ? data.sprites.front_default : 'hidden'}></img>

            <p>Base Experience: {data.base_experience}</p>
            <p>Height: {data.height}</p>
            <p>Weight: {data.weight}</p>
            <p>Abilities: {data.abilities ? data.abilities.map((ability) => ability.ability.name).join(', ') : 'N/A'}</p>


            <p>Moves: {data.moves ? data.moves.map((move) => move.move.name).join(', ') : 'N/A'}</p>

            {data.stats && data.stats.length > 0 ? (
              <p>
                Stats:
                <ul>
                  {data.stats.map((stat: object) => (
                    <li key={stat.stat.name}>{stat.stat.name}: {stat.base_stat}</li>
                  ))}
                </ul>
              </p>
            ) : (
              <p>No stats available</p>
            )}
            {/* Types */}
            <p>Types: {data.types ? data.types.map((type) => type.type.name).join(', ') : 'N/A'}</p>
          </div>
        )}
      </div>
    </>
  );
}
export default App
