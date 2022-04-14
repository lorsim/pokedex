import { useState, useEffect } from 'react'
import PokemonList from './components/PokemonList'
import Pagination from './components/Pagination'
import axios from 'axios'

function App() {
  const [pokemon, setPokemon] = useState([])
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon")
  const [nextPageUrl, setNextPageUrl] = useState()
  const [prevPageUrl, setPrevPageUrl] = useState()
  const[loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    let cancel
    axios.get(currentPageUrl, {
     cancelToken: new axios.CancelToken(c => cancel = c)
   }).then(res => {
     setPokemon(res.data.results.map(p => p.name))
     setNextPageUrl(res.data.next)
     setPrevPageUrl(res.data.previous)
     setLoading(false)
   }) 
    
    return () => cancel()
    
  }, [currentPageUrl])

  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl)
  }

  function gotoPrevPage() {
    setCurrentPageUrl(prevPageUrl)
  }

  if (loading) return "Loading..."
  
  return (
    <>
      <div className="app-container">
        <h1>Pokemons</h1>
        <div className="pokemon-container">
          <div className="all-container">
            <PokemonList pokemon={pokemon} />
          </div>
        </div>
      </div> 
      <Pagination
        gotoNextPage={nextPageUrl ? gotoNextPage : null}
        gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
      />  
    </>
  );
}

export default App;
