// styles
import './RemoveFromCartBtn.scss'
// icons
// libs
import { removeProductFromCart } from '../../libs/actionPosters'


function RemoveFromCartBtn({
    productId,
}) {
    const btnClickHandler = () => {
        removeProductFromCart(productId)
    }

    return (
        <button onClick={btnClickHandler} className='remove-from-cart-btn' title='remove product from cart'>
            Remove
        </button>
    )
}

export default RemoveFromCartBtn