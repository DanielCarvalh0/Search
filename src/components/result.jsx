const Result = () => {
    return (
        <div className="result">
            {totalResults > 0 ? (
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
            ) : null}
        </div>
    )
}

export default Result;