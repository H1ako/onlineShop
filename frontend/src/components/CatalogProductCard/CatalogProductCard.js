// styles
import './CatalogProductCard.scss'
// components
import ProductPrice from '../ProductPrice/ProductPrice';

function CatalogProductCard({product}) {

  return (
    <li className="catalog-product-card">
      <a href={`/products/${product.id}`} >
        <img src={product.thumbnail} alt="" className="catalog-product-card__image" />
      </a>
      <div className="catalog-product-card__content">
        <a href={`/products/${product.id}`} className="content__name">{product.name}</a>
        <ProductPrice
          productId={product.id}
          price={product.price}
          discountPrice={product.discountPrice}
          discount={product.discount}
          inCart={product.inCart}
          isFavourite={product.isFavourite} 
        />
      </div>
    </li>
  );
}

export default CatalogProductCard