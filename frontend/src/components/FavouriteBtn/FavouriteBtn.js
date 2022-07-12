// styles
import "./FavouriteBtn.scss"
// icons
import { HeartIcon as HeartIconOutline } from "@heroicons/react/outline"
import { HeartIcon } from "@heroicons/react/solid"
// global
import { useEffect, useState } from "react"
// libs
import { productFavouriteAction } from "../../libs/actionPosters"

function FavouriteBtn({ productId, isFavourite }) {
  const [isFavouriteDisplay, setIsFavouriteDisplay] = useState(isFavourite)

  const favouriteAction = () => {
    productFavouriteAction(productId).then((data) => {
      setIsFavouriteDisplay(data.product?.isFavourite)
    })
  }

  useEffect(() => {
    setIsFavouriteDisplay(isFavourite)
  }, [isFavourite])

  return (
    <button
      onClick={favouriteAction}
      className="favourite-btn"
      title={
        isFavouriteDisplay ? "remove from favourites" : "add to favourites"
      }>
      {isFavouriteDisplay ? (
        <HeartIcon className="favourite-btn__icon is-favourite" />
      ) : (
        <HeartIconOutline className="favourite-btn__icon" />
      )}
    </button>
  )
}

export default FavouriteBtn
