// styles
import './ProductsPage.scss'
// global
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
// components
import ProductList from '../../ProductList/ProductList';
import HistoryList from '../../HistoryList/HistoryList';
import CatalogProductCard from '../../CatalogProductCard/CatalogProductCard';
// libs
import { getCategories, getProducts, getViewHistory } from '../../../libs/dataGetters';

function ProductsPage() {
  const [ products, setProducts ] = useState([])
  const [ tags, setTags ] = useState([])
  const [ histories, setHistories ] = useState([])
  const [ categories, setCategories ] = useState([])


  useEffect(() => {
    getProducts('all', tags, false)
    .then(data => {
      console.log(data)
      setProducts(data)
    })

    getViewHistory()
    .then(data => setHistories(data))

    getCategories()
    .then(data => setCategories(data))
  }, [tags])
  return (
    <div className="products-page">
      <aside>
        <h3>Tags</h3>
        <div className="categories">
          {categories.map(category => 
            <ul className='categories__category'>
              <h4 className='category__name'>{category.name}</h4>
              {category?.tags.map(tag =>
                <li className='category__tag'>{tag.name}</li>  
              )}
            </ul>
          )}
        </div>
      </aside>
      <main>
        <h4 className='current-tags'>Current tags: {tags.join(', ')}</h4>
        <section className="products">
          <ul className="products__list">
            {products.map(product => 
              <CatalogProductCard key={product.id} product={product} />  
            )}
            
          </ul>
        </section>
        <section className="pages">
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
        </section>
      </main>
      <footer>
        <h3>History</h3>
        <HistoryList histories={histories} />
      </footer>
    </div>
  );
}

export default ProductsPage