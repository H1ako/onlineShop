// styles
import './Search.scss'
// global
import { updateQuery, useSearch } from '../../store/slices/searchSlice';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation  } from 'react-router-dom';
// store
import { updateProducts } from '../../store/slices/productsSlice';
import { getProducts } from '../../libs/dataGetters';

function Search() {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const { searchQuery } = useSearch()

  const handleEnter = e => {
    if (e.code === 'Enter') {
      getProducts('all', [], false, searchQuery)
      .then(data => {
        dispatch(updateProducts({products: data}))
      })

      if (location.pathname !== '/products/') {
        navigate(`/products/?query=${searchQuery}`)
      }
    }
  }

  return (
    <input
        type="search"
        value={searchQuery ?? ''}
        onChange={e => dispatch(updateQuery({query: e.target.value}))}
        onKeyUp={handleEnter}
        name='search' 
        className='search'
        placeholder='Search'
    />
  );
}

export default Search