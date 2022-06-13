// styles
import './ProductPrice.scss'
// icons
import { ShoppingBagIcon as ShoppingBagIconOutline, HeartIcon as HeartIconOutline } from '@heroicons/react/outline'
import { HeartIcon, ShoppingBagIcon } from '@heroicons/react/solid'

function ProductPrice({
    price,
    productId,
    isFavourite,
    inCart,
    discount,
    discountPrice
}) {

  return (
    <div className="product-price">
        <button className="product-price__btn" title='add to cart'>
            { inCart > 0 ?
                <ShoppingBagIcon className='btn__icon in-cart' title='in cart' />
            :
                <ShoppingBagIconOutline className='btn__icon' title='not in cart' />
            }
            { discount > 0 ?
                <div className="prices">
                    <div className="prices__original">{price}</div>
                    <div className="prices__main">{discountPrice}</div>
                </div>
            :
                <div className="prices">
                    <div className="prices__main">{price}</div>
                </div>
            }
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