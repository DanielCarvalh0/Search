import { useState } from 'react'

import axios from 'axios'

import Header from './components/header'
import Form from './components/Form'
import Result from './components/Result'
import CountResults from './components/CountResults'
import PageChange from './components/Pagination'

import './App.css'

const ENV = import.meta.env

const App = () => {
    const [results, setResults] = useState([])
    const [totalResults, setTotalResults] = useState(0)
    const [activePage, setActivePage] = useState(1)
    const [query, setQuery] = useState('')

    const handlePageChange = (pageNumber) => {
        setActivePage(pageNumber)
        handleSearch(query, pageNumber)
    }

    const handleSearch = async (query, page) => {
        if (query === '') return

        const queryStringFromObject = new URLSearchParams({
            q: query,
            per_page: ENV.VITE_ITEMS_PER_PAGE,
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

    const handleOnReset = () => {
        setTotalResults(0)
        setResults([])
        setActivePage(1)
        setQuery('')
    }

    return (
        <div className="container-app">
            <div className="container">
                <Header title={'Buscador de usuários do GitHub'} />

                <main>
                    <Form
                        onSubmitForm={({ query }) => {
                            handleSearch(query, 1)
                            setQuery(query)
                        }}
                        onResetForm={() => {
                            handleOnReset()
                        }}
                    />

                    <CountResults totalResults={totalResults} />

                    <Result results={results} />

                    <PageChange
                        totalResults={totalResults}
                        activePage={activePage}
                        handlePageChange={handlePageChange}
                    />
                </main>
            </div>
        </div>
    )
}

export default App
