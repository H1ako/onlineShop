// styles
import './CartBtn.scss'
// icons
import { ShoppingBagIcon as ShoppingBagIconOutline } from '@heroicons/react/outline'
import { ShoppingBagIcon } from '@heroicons/react/solid'
// libs
import { productCartAction } from '../../libs/actionPosters'


function CartBtn({
    productId,
    inCart,
}) {
    const btnCLickHandler = () => {
        const amount = inCart > 0 ? 0 : 1
        productCartAction(productId, amount)
    }

    return (
        <button onClick={btnCLickHandler} className='cart-btn' title={inCart > 0 ? 'remove from cart' : 'add to cart'}>
            { inCart > 0 ?
                <ShoppingBagIcon className='cart-btn__icon in-cart' />
            :
                <ShoppingBagIconOutline className='cart-btn__icon' />
            }
        </button>
    )
}

export default CartBtn