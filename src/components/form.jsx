import Pagination from "react-js-pagination"

const Form = () => {
    <div className="form">
        <input
            id="user-name"
            type="text"
            placeholder="Digite o username"
            onChange={(e) => {
                setIsSubmited(false)
                setSearch(e.target.value)
            }}
            onKeyDown={(e) => enterSubmit(e)}
            value={search}
        />

        {isSubmited && !search ? (
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
        ) : null}
    </div>
}

export default Form;