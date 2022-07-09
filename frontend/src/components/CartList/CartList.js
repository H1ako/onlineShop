// styles
import './CartList.scss'
// icons
// global
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react'
// libs
import { getCart } from '../../libs/dataGetters'
// components
import PurhcaseBtn from '../PurchaseBtn/PurchaseBtn';
import RemoveFromCartBtn from '../RemoveFromCartBtn/RemoveFromCartBtn';
import FavouriteBtn from '../FavouriteBtn/FavouriteBtn';


function CartList({
    amount='all',
    setTotalCost=null
}) {
  const [ cartProducts, setCartProducts ] = useState([])

  const updateCart = () => {
    getCart(amount)
    .then(data => {
        setCartProducts(data.cartProducts)

        if (setTotalCost !== null) {
            setTotalCost(data.totalCost)
        }
    })
  }

  useEffect(() => {
    updateCart()
    
    // eslint-disable-next-line
  }, [amount])

  return (
    <ul className="cart-list">
      { cartProducts.map(cartProduct => (
        <li key={cartProduct.id} className='cart-list__cart-product'>
            <div className="cart-product__info">
                <h3 className="info__product-author">{cartProduct.product?.author}</h3>
                <h2 className="info__product-price">{cartProduct.product?.price}</h2>
                <div className="info__btns">
                  <PurhcaseBtn productId={cartProduct.product?.id} />
                  <RemoveFromCartBtn productId={cartProduct.product?.id} />
                  <FavouriteBtn productId={cartProduct.product?.id} isFavourite={cartProduct.product?.isFavourite} />
                </div>
            </div>
            
            <div className="cart-product__product-info">
                <Link to={`/products/${cartProduct.product?.id}`} className="product-info__name">{cartProduct.product?.name}</Link>
            </div>
            <img src={cartProduct.product?.thumbnail} alt="" className="cart-product__product-pic" />
        </li>
      ))}
    </ul>
  )
}

export default CartList