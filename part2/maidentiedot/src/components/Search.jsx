const Search = ({filter, handleFilterChange}) => {
    return (
        <div>
            Search: <input value={filter} onChange={handleFilterChange} />
        </div>
    )
}

export default Search