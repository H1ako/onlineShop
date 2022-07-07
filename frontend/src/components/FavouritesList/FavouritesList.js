// styles
import './FavouritesList.scss'
// global
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react'
// libs
import { getFavourites } from '../../libs/dataGetters'
import { productFavouriteAction } from '../../libs/actionPosters';


function FavouritesList({
    amount='all',
    setTotalCost=null
}) {
  const [ favourites, setFavourites ] = useState([])

  const updateFavourites = () => {
    getFavourites(amount)
    .then(data => {
        setFavourites(data.favourites)

        if (setTotalCost !== null) {
            setTotalCost(data.totalCost)
        }
    })
  }

  const favouriteBtnHandelr = (productId) => {
    productFavouriteAction(productId)
  }

  useEffect(() => {
    updateFavourites()
    
    // eslint-disable-next-line
  }, [amount])

  return (
    <ul className="favourites-list">
      { favourites.map(favourite => 
        <li className="favourites-list__favourite">
            <div className="favourite__info">
                <h4 className="info__product-author">{favourite.product?.author}</h4>
                <h4 className="info__product-price">{favourite.product?.price}</h4>
                <button onClick={() => favouriteBtnHandelr(favourite.product?.id)}>fav</button>
            </div>
            
            <div className="favourite__product-info">
                <Link to={`/products/${favourite.product?.id}`} className="product-info__name">{favourite.product?.name}</Link>
            </div>
            <img src={favourite.product?.thumbnail} alt="" className="favourite__product-pic" />
        </li>
      )}
    </ul>
  )
}

export default FavouritesList