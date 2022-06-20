// styles
import './HistoryList.scss'
// global
import { Link } from 'react-router-dom';

function HistoryList({ histories }) {
  return (
    <ul className="history-list">
        { histories.map(history => 
          <li key={history.id} className="history-list__product">
            <Link to={`/products/${history.product.id}`}>
              <img className='product__bg' src={history.product.thumbnail} alt="" />
            </Link>
          </li>
        )}
    </ul>
  );
}

export default HistoryList