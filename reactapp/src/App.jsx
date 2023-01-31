import axios from 'axios'
import { useState } from 'react'
import './App.css'

function App() {

  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const [resultsPerPage, setResultsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(0)

  const pages = Math.ceil(results.length / resultsPerPage)
  const startIndex = currentPage * resultsPerPage
  const endIndex = startIndex + resultsPerPage
  const currentResults = results.slice(startIndex, endIndex)

  const handleSearch = () => {
    axios
      .get(`https://api.github.com/search/users?q=${encodeURIComponent(search)}`)
      .then((res) =>{
        setResults(res.data.items)
    });
  }

  return (
      <div className="container-app">
        <div className='container'>
          <header className='header-top'>
            <ul>
              <li>Buscador de usuários do GitHub</li>
            </ul>
          </header>

          <main>

            <div className='form'>
              <input 
                type="text" 
                placeholder='Digite o username'
                onChange={(e) => setSearch(e.target.value)}
              />
              <button 
                onClick={handleSearch}>Buscar
              </button>
            </div>

            <div className='pages'>
                {Array.from(Array(pages), (result, index) => {
                  return <button>{index}</button>
                })}
            </div>
                {currentResults.map(result => {
                  return <div className='item-result'><span>{result.name}</span></div>
                })}
                
            <div className='result'>
              <ul className='list'>
                {results.map(result => {
                  return (
                    <li>{result.login}</li>
                  )
                })}
              </ul>
            </div>

          </main>
        </div>
      </div>
  )
}

export default App