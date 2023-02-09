const Result = ( results ) => {
    if(!results.length > 0) {
        return(null)
        
    }
    
    return (
        <div className="result">
            
                <ul className="list">
                    {results.map((result) => {
                        return (
                            <li key={result.id}>
                                <div>
                                    <img src={result.avatar_url} />
                                    <a
                                        href={`https://github.com/${result.login}`}
                                        target="_blank"
                                    >
                                        <span>{result.login}</span>
                                    </a>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            
        </div>
    )
}

export default Result;