// styles
import './CatalogProductCard.scss'
// components
import ProductPrice from '../ProductPrice/ProductPrice';

function CatalogProductCard({product}) {

  return (
    <li className="catalog-product-card">
      <img src={product.thumbnail} alt="" className="catalog-product-card__image" />
      <div className="catalog-product-card__content">
        <h3 className="content__name">{product.name}</h3>
        <ProductPrice price={product.price} discountPrice={product.discountPrice} discount={product.discount} />
      </div>
    </li>
  );
}

export default CatalogProductCard