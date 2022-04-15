import { useEffect, useState } from 'react'
import PokemonList from './components/PokemonList'
import Pagination from './components/Pagination'

const App = () => {

  const[allPokemons, setAllPokemons] = useState([])
  const [currentPageUrl, setCurrentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon')
  const [nextPageUrl, setNextPageUrl] = useState()
  const [prevPageUrl, setPrevPageUrl] = useState()

  const getAllPokemons = async () => {
    const res = await fetch(currentPageUrl)
    const data = await res.json()

    function createPokemonObject(results)  {
      results.forEach( async pokemon => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        const data =  await res.json()
        setAllPokemons(currentList => [...currentList, data])
      })
    }
    createPokemonObject(data.results)

    setNextPageUrl(data.next)
    setPrevPageUrl(data.previous)
  }

  useEffect(() => {
    getAllPokemons()
  }, [currentPageUrl])
  
  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl)
  }

  function gotoPrevPage() {
    setCurrentPageUrl(prevPageUrl)
  }

  return (
    <div className="app-contaner">
      <h1>Pokemons</h1>
      <div className="pokemon-container">
        <div className="all-container">
          {allPokemons.map( (pokemonStats, index) => 
            <PokemonList
              key={index}
              name={pokemonStats.name}
              image={pokemonStats.sprites.other.dream_world.front_default}
              type={pokemonStats.types[0].type.name}
            />)}
          
        </div>
           <Pagination
            gotoNextPage={nextPageUrl ? gotoNextPage : null}
            gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
          />  
      </div>
    </div>
  );
}

export default App;