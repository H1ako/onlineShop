// styles
import "./ProductPrice.scss"
// icons
import { ShoppingBagIcon as ShoppingBagIconOutline } from "@heroicons/react/outline"
import { ShoppingBagIcon } from "@heroicons/react/solid"
// global
import { useDispatch } from "react-redux"
// components
import FavouriteBtn from "../FavouriteBtn/FavouriteBtn"
// store
import { openWindow } from "../../store/slices/buyingWindowSlice"

function ProductPrice({
  price,
  productId,
  isFavourite,
  inCart,
  discount,
  discountPrice,
}) {
  const dispatch = useDispatch()

  const btnClickHandler = () => {
    dispatch(openWindow({ productId: productId }))
  }

  return (
    <div className="product-price">
      <button
        onClick={btnClickHandler}
        className="product-price__btn"
        title="add to cart">
        {inCart > 0 ? (
          <ShoppingBagIcon className="btn__icon in-cart" title="in cart" />
        ) : (
          <ShoppingBagIconOutline className="btn__icon" title="not in cart" />
        )}
        {discount > 0 ? (
          <div className="prices">
            <div className="prices__original">{price}</div>
            <div className="prices__main">{discountPrice}</div>
          </div>
        ) : (
          <div className="prices">
            <div className="prices__main">{price}</div>
          </div>
        )}
      </button>
      <FavouriteBtn productId={productId} isFavourite={isFavourite} />
    </div>
  )
}

export default ProductPrice
