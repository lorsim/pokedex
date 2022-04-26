import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import './components/style.css'
import PokemonList from './components/PokemonList'
import Pagination from './components/Pagination'
import PokemonInfo from './components/PokemonInfo'
import Navbar from './components/Navbar'
import Login from './components/Login'

const App = () => {

  const[allPokemons, setAllPokemons] = useState([])
  const [currentPageUrl, setCurrentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon')
  const [nextPageUrl, setNextPageUrl] = useState()
  const [prevPageUrl, setPrevPageUrl] = useState()
  const [pokeDex, setPokeDex] = useState()
  const [user, setUser] = useState(null)

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

  useEffect(() => {
    const getUser = () => {
      fetch("/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json", 
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": true
        }
      }).then(response => {
        if (response.status === 200) return response.json()
        throw new Error("authentication failed")
      }).then(resObject => {
          setUser(resObject.user)
      }).catch(err => {
        console.error(err)
      })
    }
    getUser()
  }, [])

 
  return (
    <>
      <BrowserRouter>
        <div>
          <Navbar user={user}/>
          <Routes>
            <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
                <Route path="/" element={<PokemonList pokemons={allPokemons} pokemonDetails={poke => setPokeDex(poke)}/>} />    
          </Routes>
          <Pagination
            gotoNextPage={nextPageUrl ? gotoNextPage : null}
            gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
          /> 
          <PokemonInfo data={pokeDex}/>
          </div>
        </BrowserRouter>
    </>
  );
}

export default App;