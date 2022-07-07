// styles
import './DeliveriesPage.scss'
// global
import { useState } from 'react';
// components
import HistoryList from '../../HistoryList/HistoryList';
import DeliveriesList from '../../DeliveriesList/DeliveriesList';


function DeliveriesPage() {
  const [totalCost, setTotalCost] = useState('')

  return (
    <div className="deliveries-page">
      <main>
        <h3 className='total-cost'>Total Cost: {totalCost}</h3>
        <DeliveriesList setTotalCost={setTotalCost} />
      </main>
      <footer>
        <HistoryList />
      </footer>
    </div>
  )
}

export default DeliveriesPage