// styles
import "./CartBtn.scss"
// icons
import { ShoppingBagIcon as ShoppingBagIconOutline } from "@heroicons/react/outline"
import { ShoppingBagIcon } from "@heroicons/react/solid"
// global
import { useEffect, useState } from "react"
// libs
import { productCartAction } from "../../libs/actionPosters"

function CartBtn({ productId, inCart, amount = null }) {
  const [inCartDisplay, setInCartDisplay] = useState(inCart)

  const btnCLickHandler = () => {
    const fetchAmount = amount !== null ? amount : inCart > 0 ? 0 : 1

    productCartAction(productId, fetchAmount).then((data) => {
      inCartDisplay(data.product?.inCart)
    })
  }

  useEffect(() => {
    setInCartDisplay(inCart)
  }, [inCart])

  return (
    <button
      onClick={btnCLickHandler}
      className="cart-btn"
      title={inCartDisplay > 0 ? "remove from cart" : "add to cart"}>
      {inCartDisplay > 0 ? (
        <ShoppingBagIcon className="cart-btn__icon in-cart" />
      ) : (
        <ShoppingBagIconOutline className="cart-btn__icon" />
      )}
    </button>
  )
}

export default CartBtn
