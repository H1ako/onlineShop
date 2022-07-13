// styles
import './ProductsPage.scss'
// global
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// components
import HistoryList from '../../HistoryList/HistoryList';
import CatalogProductCard from '../../CatalogProductCard/CatalogProductCard';
import TagsAside from '../../TagsAside/TagsAside';
// libs
import { getProducts } from '../../../libs/dataGetters';
// store
import { updateQueryFromUrl, useSearch } from '../../../store/slices/searchSlice';
import { updateProducts, useProducts } from '../../../store/slices/productsSlice';
import { useCustomer } from '../../../store/slices/customerSlice';


function ProductsPage() {
  const { customer } = useCustomer()
  const { products, tags } = useProducts()
  const { searchQuery } = useSearch()
  const dispatch = useDispatch()
  
  useEffect(() => {
    getProducts('all', tags, false, searchQuery)
    .then(data => {
      dispatch(updateProducts({products: data}))
    })
    // eslint-disable-next-line
  }, [tags, customer.id])

  useEffect(() => {
    dispatch(updateQueryFromUrl())
  }, [dispatch])

  return (
    <div className="products-page">
      <TagsAside />
      <main>
        <h4 className='current-tags'>Current tags: {tags.join(', ')}</h4>
        <section className="products">
          <ul className="products__list">
            {products.map(product => 
              <CatalogProductCard key={product.id} product={product} />  
            )}
            
          </ul>
        </section>
      </main>
      <footer>
        <h3>History</h3>
        <HistoryList />
      </footer>
    </div>
  );
}

export default ProductsPage