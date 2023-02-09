import Pagination from 'react-js-pagination'

const ENV = import.meta.env

const PageChange = (props) => {
    const { activePage, totalResults, handlePageChange } = props;

    if (totalResults < +ENV.VITE_ITEMS_PER_PAGE) {
        return null
    }

    return (
        <div className="page">
            <ul>
                <li>
                    <Pagination
                        activePage={activePage}
                        itemsCountPerPage={+ENV.VITE_ITEMS_PER_PAGE}
                        totalItemsCount={totalResults}
                        pageRangeDisplayed={3}
                        onChange={handlePageChange}
                    />
                </li>
            </ul>
        </div>
    )
}

export default PageChange
