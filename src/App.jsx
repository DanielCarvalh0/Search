import axios from 'axios'
import { useState } from 'react'
import Pagination from 'react-js-pagination'
import './App.css'

const ITEMS_PER_PAGE = 30

const App = () => {
    const [search, setSearch] = useState('')
    const [results, setResults] = useState([])

    const [totalResults, setTotalResults] = useState(0)
    const [activePage, setActivePage] = useState(1)

    const [isSubmited, setIsSubmited] = useState(false)

    const handlePageChange = (pageNumber) => {
        setActivePage(pageNumber)
        handleSearch(pageNumber)
    }

    const handleSearch = async (page) => {

        setIsSubmited(true)
        if(search === '') return
        
        const queryStringFromObject = new URLSearchParams({
            q: search,
            per_page: ITEMS_PER_PAGE,
            page: page
        }).toString()

        await axios
            .get(
                `https://api.github.com/search/users?${queryStringFromObject}`,
                {
                    heders: {
                        Authorization: `token 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`
                    }
                }
            )
            .then((res) => res.data)
            .then((res) => {
                setResults(res.items)
                setTotalResults(res.total_count)
            })
            .catch((err) => {
                console.error(err)
                alert('Aconteceu algum erro, verifique o console')
            })
    }

    const enterSubmit = e => {
        if(e.key === 'Enter') {
            const value = e.target.value
            handleSearch(value)
        }
    }

    const reset = () => {
        setTotalResults(0);
        setSearch('')
        setResults([])
        setActivePage(1)
        setIsSubmited(false)
    }

    return (
        <div className="container-app">
            <div className="container">
                <header className="header-top">
                    
                    <ul>
                        <li>Buscador de usuários do GitHub</li>
                    </ul>
                </header>

                <main>
                    <div className="form">
                        <input
                            id='user-name'
                            type="text"
                            placeholder="Digite o username"
                            onChange={(e) => {
                                setIsSubmited(false)
                                setSearch(e.target.value)}
                            }
                            onKeyDown={(e) => enterSubmit(e)}
                            value={search}
                        />
                        {isSubmited && !search ?(
                            <div>
                                <small>Esse campo é obrigatorio</small>
                            </div>
                        ): null}
                        
                        
                        <button type="submit" onClick={handleSearch}>Buscar</button>

                        <button type='reset' onClick={reset}>Limpar</button>
                        
                        {totalResults > 0 ? (
                            <div>
                                <h1 className="search-number">
                                    Resultados encotrados: <br />
                                    {totalResults}
    
                                </h1>
                            </div>
                        ) : null}

                        {totalResults > ITEMS_PER_PAGE ? (
                            <div className="page">
                                <ul>
                                    <li>
                                        <Pagination
                                            activePage={activePage}
                                            itemsCountPerPage={ITEMS_PER_PAGE}
                                            totalItemsCount={totalResults}
                                            pageRangeDisplayed={3}
                                            onChange={handlePageChange}
                                        />
                                    </li>
                                </ul>
                            </div>
                        ) : null}
                    </div>
  
                    <div className="result">
                        { totalResults > 0 ? (  
                            <ul className="list">
                                {results.map((result) => {
                                    return (
                                        <li key={result.id}>
                                            <div>
                                                <img src={result.avatar_url} />
                                                <a href={`https://github.com/${result.login}`} target='_blank' >
                                                    <span>{result.login}</span>
                                                </a>
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>
                        ) : null}

                    </div>
                    
                </main>
            </div>
        </div>
    )
}

export default App
