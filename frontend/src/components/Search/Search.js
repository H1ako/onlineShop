// styles
import './Search.scss'
// global
import { updateQuery, useSearch } from '../../store/slices';
import { useDispatch } from 'react-redux';

function Search() {
  const dispatch = useDispatch()
  const { searchQuery } = useSearch()

  return (
    <input
        type="search"
        value={searchQuery}
        onChange={e => dispatch(updateQuery({query: e.target.value}))}
        name='search' 
        className='search'
        placeholder='Search'
    />
  );
}

export default Search