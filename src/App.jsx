import axios from 'axios'
import { useState } from 'react'
import Pagination from 'react-js-pagination'
import './App.css'
import Header from './components/header'
import Form from './components/form'
import Result from './components/result'

const ITEMS_PER_PAGE = 30

const ENV = import.meta.env

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
        if (search === '') return

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
                        Authorization: (ENV.VITE_TOKEN_ACCESS)
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

    const enterSubmit = (e) => {
        if (e.key === 'Enter') {
            const value = e.target.value
            handleSearch(value)
        }
    }

    const reset = () => {
        setTotalResults(0)
        setSearch('')
        setResults([])
        setActivePage(1)
        setIsSubmited(false)
    }

    return (
        <div className="container-app">
            <div className="container">
                
                <Header />

                <main>
                    <Form />
                    <Result />
                </main>
            </div>
        </div>
    )
}

export default App
