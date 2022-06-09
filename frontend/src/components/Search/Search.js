import './Search.scss'

import { useState } from 'react'

function Search() {
  const [query, setQuery] = useState("")

  return (
    <input
        type="search"
        value={query}
        onChange={e => setQuery(e.target.value)}
        name='search' 
        className='search'
        placeholder='Search'
    />
  );
}

export default Search