const Result = ( props ) => {
    const { results } = props
    
    if(!results.length) {
        return null 
    }
    
    return (
        <div className="result">
            <ul className="list">
                {results.map((props) => {
                    return (
                        <li key={props.id}>
                            <div>
                                <img src={props.avatar_url} />
                                <a
                                    href={`https://github.com/${props.login}`}
                                    target="_blank"
                                >
                                    <span>{props.login}</span>
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