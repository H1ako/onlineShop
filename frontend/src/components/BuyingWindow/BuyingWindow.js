// styles
import './BuyingWindow.scss'
// icons
// global
import { useEffect, useState } from 'react'
// libs
import { getProductData } from '../../libs/dataGetters'
// components
import NumberField from '../NumberField/NumberField'
import PurhcaseBtn from '../PurchaseBtn/PurchaseBtn'
import CartBtn from '../CartBtn/CartBtn'
import FavouriteBtn from '../FavouriteBtn/FavouriteBtn'


function BuyingWindow({
    productId,
}) {
    const [product, setProduct] = useState({})
    const [amount, setAmount] = useState(1)

    useEffect(() => {
        getProductData(productId)
        .then(data => setProduct(data))
    }, [productId])

    return (
        <div className="buying-window">
            <h3 className='buying-window__heading'>Buying Window</h3>
            <div className="buying-window__product">
                <img src="" alt="" className="product__picture" />
                <div className="product__specify">
                    <h3 className="specify__name">{product.name}</h3>
                    <h4 className="specify__id">#{product.id}</h4>
                </div>
                <h4 className="product__author">
                    Author: {product.author}
                </h4>
                <h3 className="product__price">
                    Price: {product.discountPrice}
                </h3>
                <NumberField number={amount} setNumber={setAmount} />
            </div>
            <div className="buying-window__btns">
                <PurhcaseBtn productId={productId} amount={amount} />
                <CartBtn productId={product.id} inCart={product.inCart} />
                <FavouriteBtn productId={product.id} isFavourite={product.isFavourite} />
            </div>
        </div>
    )
}

export default BuyingWindow