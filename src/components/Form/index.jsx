import { useState } from 'react'

import './styles.css'

const Form = ({ onSubmitForm, onResetForm }) => {
    const [query, setQuery] = useState('')

    return (
        <div className="container-form">
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
                autoComplete="off"
            >
                <div className="container-input">
                    <input
                        type="text"
                        name="query"
                        value={query}
                        onChange={(event) => {
                            setQuery(event.target.value || '')
                        }}
                        required
                    />
                </div>

                <div className="group-button">
                    <div className="container-button">
                        <button type="submit">Pesquisar</button>
                    </div>
                    <div className="container-button">
                        <button type="reset">Limpar</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Form
