// styles
import './ProductsPage.scss'
// global
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
// components
import ProductList from '../../ProductList/ProductList';
import HistoryList from '../../HistoryList/HistoryList';
import ProductPrice from '../../ProductPrice/ProductPrice';
// libs
import { getCategories, getProducts, getViewHistory } from '../../../libs/dataGetters';

function ProductsPage() {
  const [ products, setProducts ] = useState([])
  const [ tags, setTags ] = useState([])
  const [ histories, setHistories ] = useState([])
  const [ categories, setCategories ] = useState([])


  useEffect(() => {
    getProducts('all', tags)
    .then(data => setProducts(data))

    getViewHistory()
    .then(data => setHistories(data))

    getCategories()
    .then(data => setCategories(data))
  }, [tags])
  return (
    <div className="products-page">
      <header></header>
      <aside>
        <div className="categories">
          {categories.map(category => 
            <ul className='categories__category'>
              <h1>{category.name}</h1>
              {category?.tags.map(tag =>
                <li className='category__tag'>{tag.name}</li>  
              )}
            </ul>
          )}
        </div>
      </aside>
      <main></main>
      <footer>
        <HistoryList histories={histories} />
      </footer>
    </div>
  );
}

export default ProductsPage