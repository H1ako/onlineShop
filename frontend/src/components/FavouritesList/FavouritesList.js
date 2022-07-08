// styles
import './FavouritesList.scss'
// global
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react'
// components
import ProductPrice from '../ProductPrice/ProductPrice';
// libs
import { getFavourites } from '../../libs/dataGetters'


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

  useEffect(() => {
    updateFavourites()
    
    // eslint-disable-next-line
  }, [amount])

  return (
    <ul className="favourites-list">
      {favourites.map(favourite => (
        <li key={favourite.id} className="favourites-list__favourite">
            <div className="favourite__info">
                <h3 className="info__product-creator">{favourite.product?.author} - {favourite.product?.brand}</h3>
                <ProductPrice
                    productId={favourite.product?.id}
                    price={favourite.product?.price}
                    discount={favourite.product?.discount}
                    discountPrice={favourite.product?.discountPrice}
                    isFavourite={favourite.product?.isFavourite}
                    inCart={favourite.product?.inCart}
                />
            </div>
            
            <div className="favourite__product-info">
                <Link to={`/products/${favourite.product?.id}`} className="product-info__name">{favourite.product?.name}</Link>
            </div>
            <img src={favourite.product?.thumbnail} alt="" className="favourite__product-pic" />
        </li>
      ))}
    </ul>
  )
}

export default FavouritesList