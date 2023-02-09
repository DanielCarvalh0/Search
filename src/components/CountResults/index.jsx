import React from 'react'

import './styles.css'

const CountResults = (props) => {
    const { totalResults } = props

    if (!totalResults) {
        return null
    }

    return (
        <div className="container-count-results">
            <div className="container-msg">
                <span>Encontramos&nbsp;</span>
            </div>
            <div className="container-count">
                <span>{totalResults}</span>
            </div>
            <div className="container-msg">
                <span>&nbsp; usuários do github</span>
            </div>
        </div>
    )
}

export default CountResults
