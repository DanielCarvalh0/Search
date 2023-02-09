import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import Pagination from 'react-js-pagination'
import './App.css'
import Header from './components/header'
import Form from './components/form'
import Result from './components/result'
import CountResults from './components/CountResults'

const ITEMS_PER_PAGE = 30

const ENV = import.meta.env

const App = () => {
    const [results, setResults] = useState([])
    const [totalResults, setTotalResults] = useState(0)
    const [activePage, setActivePage] = useState(1)

    const handlePageChange = (pageNumber) => {
        setActivePage(pageNumber)
        handleSearch(pageNumber)
    }

    const handleSearch = async (query, page) => {
        if (query === '') return

        const queryStringFromObject = new URLSearchParams({
            q: query,
            per_page: ITEMS_PER_PAGE,
            page: page
        }).toString()

        await axios
            .get(
                `https://api.github.com/search/users?${queryStringFromObject}`,
                {
                    heders: {
                        Authorization: ENV.VITE_TOKEN_ACCESS
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

    const reset = () => {
        setTotalResults(0)
        setResults([])
        setActivePage(1)
    }

    return (
        <div className="container-app">
            <div className="container">
                
                <Header title={'Buscador de usuários do GitHub'} />

                <main>
                    <Form
                        onSubmitForm={({ query }) => {
                            handleSearch(query, 1)
                        }}
                        onResetForm={() => {
                            reset()
                        }}
                    />

                    <CountResults totalResults={totalResults} />

                    <Result results={results}/>

                </main>
            </div>
        </div>
    )
}

export default App
