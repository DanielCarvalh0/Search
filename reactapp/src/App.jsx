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

    const handlePageChange = (pageNumber) => {
        setActivePage(pageNumber)
        handleSearch(pageNumber)
    }

    

    const handleSearch = async (page) => {
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
                            type="text"
                            placeholder="Digite o username"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button onClick={handleSearch}>Buscar</button>
                        <h1 className="search-number">
                            Resultados encotrados: <br />
                            {totalResults}
                        </h1>

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
                        <ul className="list">
                            {results.map((result) => {
                                return (
                                    <li key={result.id}>
                                        <div>
                                            <img src={result.avatar_url} />
                                            <a href={`https://github.com/${result.login}`} target='_blank' >
                                                <span>{result.login}</span>
                                            </a>
                                            <span>
                                                Seguidores: {result.followers_url.length}
                                            </span>
                                            <span>
                                                Seguindo: {result.following_url.length}
                                            </span>
                                        </div>
                                    </li>
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
