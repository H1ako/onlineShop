// styles
import './FavouriteBtn.scss'
// icons
import { HeartIcon as HeartIconOutline } from '@heroicons/react/outline'
import { HeartIcon } from '@heroicons/react/solid'
// libs
import { productFavouriteAction } from '../../libs/actionPosters'


function FavouriteBtn({
    productId,
    isFavourite,
}) {
    const favouriteAction = () => {
        productFavouriteAction(productId)
        isFavourite = !isFavourite
    }

    return (
        <button onClick={favouriteAction} className='favourite-btn' title={isFavourite ? 'remove from favourites' : 'add to favourites'}>
            { isFavourite ?
                <HeartIcon className='favourite-btn__icon is-favourite' />
            :
                <HeartIconOutline className='favourite-btn__icon' />
            }
        </button>
    )
}

export default FavouriteBtn