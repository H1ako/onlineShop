// styles
import './TagsAside.scss'
// global
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
// libs
import { getCategories } from '../../libs/dataGetters';
// store
import { updateTags, useProducts } from '../../store/slices/productsSlice';


function TagsAside() {
  const dispatch = useDispatch()
  const { tags } = useProducts()
  const [ categories, setCategories ] = useState([])
  
  const checkboxHandle = (e) => {
    const tag = e.target.value

    dispatch(updateTags({tag: tag}))
  }

  useEffect(() => {
    getCategories()
    .then(data => setCategories(data))
    // eslint-disable-next-line
  }, [tags])

  return (
    <aside className='tags-aside'>
        <h2 className='tags-aside__heading'>Tags</h2>
        <div className="tags-aside__categories">
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
  );
}

export default TagsAside