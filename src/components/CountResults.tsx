import React from 'react'

const CountResults = ({ totalResults }) => {
    if (!totalResults) {
        return null
    }

    return (
        <div>
            <h1 className="search-number">
                Resultados encotrados: <br />
                {totalResults}
            </h1>
        </div>
    )
}

export default CountResults
