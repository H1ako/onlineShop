// styles
import './FavouritesPage.scss'
// global
import { useState } from 'react';
// components
import HistoryList from '../../HistoryList/HistoryList';
import FavouritesList from '../../FavouritesList/FavouritesList';


function FavouritesPage() {
  const [totalCost, setTotalCost] = useState('')

  return (
    <div className="favourites-page">
      <main>
        <h3 className='total-cost'>Total Cost: {totalCost}</h3>
        <FavouritesList setTotalCost={setTotalCost} />
      </main>
      <footer>
        <HistoryList />
      </footer>
    </div>
  )
}

export default FavouritesPage