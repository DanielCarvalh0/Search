import axios from 'axios'
import { useState } from 'react'
import Pagination from "react-js-pagination"
import './App.css'

function App() {

  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  
  const [totalResults, setTotalResults] = useState(0);
  const [activePage, setActivePage] = useState(1);

  const handlePageChange = (pageNumber) => {
    setActivePage( pageNumber );
  }

  const handleSearch = () => {
    axios
      .get(`https://api.github.com/search/users?q=${encodeURIComponent(search)}`)
      .then((res) =>{
        setResults(res.data.items)
        setTotalResults(res.data.total_count)
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
              <h1 className='search-number'>Resultados encotrados: <br />{totalResults}</h1>
            </div>
                
            <div className='result'>
              <ul className='list'>
                {results.map(result => {
                  return (
                    <li>{result.login}</li>
                    
                  )
                })}            
              </ul>
            </div>

            <div className='page'>
              <ul>
                <li>
                  <Pagination
                    activePage={activePage}
                    itemsCountPerPage={30}
                    totalItemsCount={totalResults}
                    pageRangeDisplayed={3}
                    onChange={handlePageChange}
                    
                  />
                </li>
              </ul>
            </div>
          </main>
        </div>
      </div>
  )
}

export default App