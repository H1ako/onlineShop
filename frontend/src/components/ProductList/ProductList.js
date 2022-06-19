// styles
import './ProductList.scss'
// global
import { Link } from 'react-router-dom';

function ProductList({ products }) {
  return (
    <ul className="product-list">
        { products.map(product => 
          <li key={product.id} className="product-list__product">
            <Link to={`/products/${product.id}`}>
              <img className='product__bg' src={product.thumbnail} alt="" />
            </Link>
          </li>
        )}
    </ul>
  );
}

export default ProductList