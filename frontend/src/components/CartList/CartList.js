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
                <h4 className="info__product-author">{cartProduct.product?.author}</h4>
                <h4 className="info__product-price">{cartProduct.product?.price}</h4>
                <PurhcaseBtn productId={cartProduct.product?.id} />
                <RemoveFromCartBtn productId={cartProduct.product?.id} />
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