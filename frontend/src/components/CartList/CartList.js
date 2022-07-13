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
import FavouriteBtn from '../FavouriteBtn/FavouriteBtn';
import CartBtn from '../CartBtn/CartBtn';
import NumberField from '../NumberField/NumberField';
// store
import { useCustomer } from '../../store/slices/customerSlice';


function CartListProduct({ cartProduct }) {
  const [amount, setAmount] = useState(cartProduct.amount)

  return (
    <li key={cartProduct.id} className='cart-list__cart-product'>
      <div className="cart-product__info">
        <h3 className="info__product-author">{cartProduct.product?.author}</h3>
        <h2 className="info__product-price">{cartProduct.product?.price}</h2>
        <NumberField number={amount} setNumber={setAmount} />
        <div className="info__btns">
          <PurhcaseBtn productId={cartProduct.product?.id} />
          <CartBtn productId={cartProduct.product?.id} inCart={cartProduct.product?.inCart} />
          <FavouriteBtn productId={cartProduct.product?.id} isFavourite={cartProduct.product?.isFavourite} />
        </div>
      </div>

      <div className="cart-product__product-info">
        <Link to={`/products/${cartProduct.product?.id}`} className="product-info__name">{cartProduct.product?.name}</Link>
      </div>
      <img src={cartProduct.product?.thumbnail} alt="" className="cart-product__product-pic" />
    </li>
  )
}

function CartList({
  amount = 'all',
  setTotalCost = null
}) {
  const [cartProducts, setCartProducts] = useState([])
  const { customer } = useCustomer()

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
  }, [amount, customer.id])

  return (
    <ul className="cart-list">
      {cartProducts.map(cartProduct => (
        <CartListProduct key={cartProduct.id} cartProduct={cartProduct} />
      ))}
    </ul>
  )
}

export default CartList