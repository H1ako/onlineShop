// styles
import "./BuyingWindow.scss"
// global
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
// libs
import { getProductData } from "../../libs/dataGetters"
// components
import NumberField from "../NumberField/NumberField"
import PurhcaseBtn from "../PurchaseBtn/PurchaseBtn"
import CartBtn from "../CartBtn/CartBtn"
import FavouriteBtn from "../FavouriteBtn/FavouriteBtn"
// store
import {
  closeWindow,
  updateProduct,
  useBuyingWindow,
} from "../../store/slices/buyingWindowSlice"

function BuyingWindow() {
  const dispatch = useDispatch()
  const [amount, setAmount] = useState(1)
  const { productId, product } = useBuyingWindow()

  const close = () => {
    dispatch(closeWindow())
  }

  useEffect(() => {
    getProductData(productId).then((data) =>
      dispatch(updateProduct({ product: data }))
    )
    // eslint-disable-next-line
  }, [productId])

  return (
    <div className="buying-window-area">
      <div className="buying-window-area__buying-window">
        <h3 className="buying-window__heading">Buying Window</h3>
        <button onClick={close} className="buying-window__close">
          Close
        </button>
        <div className="buying-window__product">
          <img src={product.thumbnail} alt="" className="product__picture" />
          <h4 className="product__author">Author: {product.author}</h4>
          <div className="product__specify">
            <Link to={`/products/${product.id}`} className="specify__name">
              {product.name}
            </Link>
            <h4 className="specify__id">#{product.id}</h4>
          </div>
          <h3 className="product__price">Price: {product.discountPrice}</h3>
          <NumberField number={amount} setNumber={setAmount} />
        </div>
        <div className="buying-window__btns">
          <PurhcaseBtn productId={productId} amount={amount} />
          <CartBtn
            productId={product.id}
            inCart={product.inCart}
            amount={amount}
          />
          <FavouriteBtn
            productId={product.id}
            isFavourite={product.isFavourite}
          />
        </div>
      </div>
    </div>
  )
}

export default BuyingWindow
