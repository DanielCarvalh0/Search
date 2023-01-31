import axios from 'axios'
import { useState } from 'react'
import './App.css'

function App() {

  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    console.log('User encontrado', search)
    fetch(`https://api.github.com/users?q=${search}`)
      .then((res) =>{
        let results = [];
        console.log(res)
        for (var i = 0; i < res.length; i++) {
          results.push(res[i].employee_name)
        }
        setResults(results)
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
            
            <ul>
              {results.map(result => {
                return (
                  <li>{result.toString()}</li>
                )
              })}
              <li></li>
            </ul>
          </main>
        </div>
      </div>
  )
}

export default App