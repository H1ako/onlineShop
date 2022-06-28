// styles
import './ProductsPage.scss'
// global
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
// components
import HistoryList from '../../HistoryList/HistoryList';
import CatalogProductCard from '../../CatalogProductCard/CatalogProductCard';
// libs
import { getCategories, getProducts, getViewHistory } from '../../../libs/dataGetters';
// store
import { updateQueryFromUrl, useSearch } from '../../../store/slices/searchSlice';
import { updateProducts, useProducts } from '../../../store/slices/productsSlice';


function ProductsPage() {
  const { products } = useProducts()
  const [ tags, setTags ] = useState([])
  const [ histories, setHistories ] = useState([])
  const [ categories, setCategories ] = useState([])
  const { searchQuery } = useSearch()
  const dispatch = useDispatch()
  
  const checkboxHandle = (e) => {
    const tagName = e.target.value

    if (tags.includes(tagName)) {
      const newTags = tags.filter(tag => tag !== tagName)
      setTags(newTags)
    }
    else {
      setTags([tagName, ...tags])
    }
  }

  useEffect(() => {
    getProducts('all', tags, false, searchQuery)
    .then(data => {
      dispatch(updateProducts({products: data}))
    })

    getViewHistory()
    .then(data => setHistories(data))

    getCategories()
    .then(data => setCategories(data))
  }, [tags])

  useEffect(() => {
    dispatch(updateQueryFromUrl())
  }, [])

  return (
    <div className="products-page">
      <aside>
        <h2 className='heading'>Tags</h2>
        <div className="categories">
          {categories.map(category => 
            <ul key={category.id} className='categories__category'>
              <h3 className='category__name'>{category.name}</h3>
              {category?.tags.map(tag =>
                <li key={tag.id} className='category__tag'>
                  <input value={`${category.name} : ${tag.name}`} type="checkbox" className='tag__input' id={`tag-checkbox-${tag.id}`} onChange={checkboxHandle} />
                  <label htmlFor={`tag-checkbox-${tag.id}`} className='tag__label'>
                    <div className="label__checkbox" />
                    <span className="label__name">{tag.name} ({tag.productsWithTag})</span>
                  </label>
                </li>  
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