import React from 'react'

class Search extends React.Component {

    state = {
        searchTerm: ""
    }

    onInputChange = (e) => { 
        this.setState({ searchTerm: e.target.value }) 
    }

    onFormSubmit = (e) => {
        e.preventDefault()
        this.props.onSearchTermSubmit(this.state.searchTerm)
    }

    render() {
        return (
            <form onSubmit={this.onFormSubmit}>
                <p>Search</p> 
                <input onChange={this.onInputChange} value={this.state.searchTerm}></input>
            </form>
        )
    }
}

export default Search