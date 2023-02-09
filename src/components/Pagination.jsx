import Pagination from "react-js-pagination";

const PageChange = ( activePage, totalResults, ITEMS_PER_PAGE, handlePageChange ) => {

    if( totalResults > ITEMS_PER_PAGE  ) {
        return null
    }

    return(
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
        
    )
}

export default PageChange;