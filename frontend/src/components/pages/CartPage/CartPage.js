// styles
import './CartPage.scss'
// global
import { useState } from 'react';
// components
import HistoryList from '../../HistoryList/HistoryList';
import CartList from '../../CartList/CartList';


function CartPage() {
  const [totalCost, setTotalCost] = useState('')

  return (
    <div className="cart-page">
      <main>
        <h3 className='total-cost'>Total Cost: {totalCost}</h3>
        <CartList setTotalCost={setTotalCost} />
      </main>
      <footer>
        <HistoryList />
      </footer>
    </div>
  )
}

export default CartPage