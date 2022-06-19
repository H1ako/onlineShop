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
    productInCartNumber,
    productDiscount,
    productDiscountPrice
}) {

  return (
    <li className='product-card'>
      { productDiscount > 0 &&
        <div className="product-card__discount-tag">-{productDiscount}%</div>
      }
      <img className='product-card__bg' src={productImg} alt="" />
      <div className="product-card__info">
        <Link className='info__heading' to={`/products/${productId}`}>
          {productName}
        </Link>
        <ProductPrice
          discount={productDiscount}
          discountPrice={productDiscountPrice}
          price={productPrice}
          productId={productId}
          isFavourite={productIsFavourite}
          inCart={productInCartNumber}
        />
      </div>
    </li>
  );
}

export default ProductCard