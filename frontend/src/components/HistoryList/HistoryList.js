// styles
import "./HistoryList.scss"
// global
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { getViewHistory } from "../../libs/dataGetters"
import { useCustomer } from "../../store/slices/customerSlice"
// store

function HistoryList({ amount = 6 }) {
  const [histories, setHistories] = useState([])
  const { customer } = useCustomer()

  useEffect(() => {
    getViewHistory(amount).then((data) => setHistories(data.length ? data : []))
  }, [amount, customer])

  return (
    <ul className="history-list">
      {histories.map((history) => (
        <li key={history.id} className="history-list__product">
          <Link to={`/products/${history.product.id}`}>
            <img
              className="product__bg"
              src={history.product.thumbnail}
              alt=""
            />
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default HistoryList
