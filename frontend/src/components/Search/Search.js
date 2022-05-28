import './Search.scss'

function Search() {
  return (
    <input
        type="search"
        // value={searchQuery}
        // onChange={e => setSearchQuery(e.target.value)}
        name='search' 
        className='search'
        placeholder='Search'
    />
  );
}

export default Search