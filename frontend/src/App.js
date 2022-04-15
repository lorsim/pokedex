import { useEffect, useState } from 'react'
import './components/style.css'
import PokemonList from './components/PokemonList'
import Pagination from './components/Pagination'
import PokemonInfo from './components/PokemonInfo'

const App = () => {

  const[allPokemons, setAllPokemons] = useState([])
  const [currentPageUrl, setCurrentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon')
  const [nextPageUrl, setNextPageUrl] = useState()
  const [prevPageUrl, setPrevPageUrl] = useState()
  const [pokeDex, setPokeDex] = useState()

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
    <div className="container">
      <div className="left-content">
         <h1>Pokemons</h1>
        <PokemonList pokemons={allPokemons} pokemonDetails={poke => setPokeDex(poke)}/>    
          <Pagination
            gotoNextPage={nextPageUrl ? gotoNextPage : null}
            gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
          />  
      </div>
      <div className="right-content">
        <PokemonInfo data={pokeDex}/>
      </div>
    </div>
  );
}

export default App;