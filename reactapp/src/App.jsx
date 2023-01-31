import axios from 'axios'
import { useState } from 'react'
import './App.css'

function App() {

  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = () => {

    axios
      .get(`https://api.github.com/search/users?q=${encodeURIComponent(search)}`)
      .then((res) =>{
        console.log({ res })

        setResults(res.data.items)
        console.log('res: ', results)
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
            <div className='result'>
              <ul className='list'>
                {results.map(result => {
                  console.log(result)
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