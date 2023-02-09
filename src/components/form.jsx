import { useState } from 'react'

const Form = ({ onSubmitForm, onResetForm }) => {
    const [query, setQuery] = useState('')

    return (
        <div className="form">
            <form
                onSubmit={(event) => {
                    event.preventDefault()
                    onSubmitForm({
                        query: query
                    })
                }}
                onReset={() => {
                    setQuery('')
                    onResetForm()
                }}
            >
                <input
                    type="text"
                    name="query"
                    value={query}
                    onChange={(event) => {
                        setQuery(event.target.value || '')
                    }}
                    required
                />

                <button type="submit">Pesquisar</button>
                <button type="reset">Limpar</button>
            </form>
            {/* <input
                id="user-name"
                type="text"
                placeholder="Digite o username"
                onChange={(e) => {
                    setIsSubmited(false)
                    setSearch(e.target.value)
                }}
                onKeyDown={(e) => enterSubmit(e)}
                value={search}
            /> */}

            {/* {isSubmited && !search ? (
                <small>Esse campo é obrigatorio</small>
            ) : null}

            <button type="submit" onClick={handleSearch}>
                Buscar
            </button>
            <button type="reset" onClick={reset}>
                Limpar
            </button>

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
            ) : null} */}
        </div>
    )
}

export default Form
