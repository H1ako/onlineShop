// styles
import './DeliveriesPage.scss'
// global
import { useDispatch } from 'react-redux';
// components
import HistoryList from '../../HistoryList/HistoryList';
import DeliveriesList from '../../DeliveriesList/DeliveriesList';


function DeliveriesPage() {
  const dispatch = useDispatch()

  return (
    <div className="deliveries-page">
      <main>
        <DeliveriesList />
      </main>
      <footer>
        <HistoryList />
      </footer>
    </div>
  )
}

export default DeliveriesPage