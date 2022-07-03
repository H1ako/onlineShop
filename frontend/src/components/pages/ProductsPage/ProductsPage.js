// styles
import './ProductsPage.scss'
// global
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
// components
import HistoryList from '../../HistoryList/HistoryList';
import CatalogProductCard from '../../CatalogProductCard/CatalogProductCard';
import TagsAside from '../../TagsAside/TagsAside';
// libs
import { getCategories, getProducts } from '../../../libs/dataGetters';
// store
import { updateQueryFromUrl, useSearch } from '../../../store/slices/searchSlice';
import { updateProducts, useProducts } from '../../../store/slices/productsSlice';


function ProductsPage() {
  const { products, tags } = useProducts()
  const [ categories, setCategories ] = useState([])
  const { searchQuery } = useSearch()
  const dispatch = useDispatch()
  
  useEffect(() => {
    getProducts('all', tags, false, searchQuery)
    .then(data => {
      dispatch(updateProducts({products: data}))
    })
  }, [tags])

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
        {/* <section className="pages">
          <ul className="pages__list">
            <li className="page__prev">prev</li>
            <li className="list__page">
              1
            </li>
            <li className="list__page">
              2
            </li>
            <li className="list__page">
              3
            </li>
            <li className="page__next">next</li>
          </ul>
        </section> */}
      </main>
      <footer>
        <h3>History</h3>
        <HistoryList />
      </footer>
    </div>
  );
}

export default ProductsPage