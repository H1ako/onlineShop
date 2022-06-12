// styles
import './ProductCard.scss'
// global
import { Link } from 'react-router-dom';
// components
import ProductPrice from '../ProductPrice/ProductPrice';

function ProductCard({
    productId,
    productName,
    productImg,
    productPrice,
    productIsFavourite,
    productInCartNumber
}) {

  return (
    <li className='product-card'>
        <img className='product-card__bg' src={productImg} alt="" />
        <div className="product-card__info">
            <Link className='info__heading' to={`/products/${productId}`}>
                {productName}
            </Link>
            <ProductPrice price={productPrice} productId={productId} isFavourite={productIsFavourite} inCart={productInCartNumber} />
        </div>
    </li>
  );
}

export default ProductCard