import './ProductPrice.scss'

import { ShoppingBagIcon as ShoppingBagIconOutline, HeartIcon as HeartIconOutline } from '@heroicons/react/outline'
import { HeartIcon, ShoppingBagIcon } from '@heroicons/react/solid'

function ProductPrice({
    price,
    productId,
    isFavourite,
    inCart
}) {

  return (
    <div className="product-price">
        <button className="product-price__btn" title='add to cart'>
            { inCart > 0 ?
                <ShoppingBagIcon className='btn__icon in-cart' title='in cart' />
            :
                <ShoppingBagIconOutline className='btn__icon' title='not in cart' />
            }
            {price}
        </button>
        { isFavourite ?
            <button className='product-price__favourite' title='remove from favourites'>
                <HeartIcon className='favourite__icon is-favourite' />
            </button>
        :
            <button className='product-price__favourite' title='add to favourites'>
                <HeartIconOutline className='favourite__icon' />
            </button>
        }
    </div>
  );
}

export default ProductPrice