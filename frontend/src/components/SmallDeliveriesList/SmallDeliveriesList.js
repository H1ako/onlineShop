// styles
import './SmallDeliveriesList.scss'
// icons
import { BadgeCheckIcon, BanIcon, TruckIcon } from '@heroicons/react/outline';
// global
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// libs
import { getDeliveries } from '../../libs/dataGetters';
// store
import { useCustomer } from '../../store/slices/customerSlice';


function SmallDeliveryList({ amount }) {
    const { customer } = useCustomer()
    const [ deliveries, setDeliveries ] = useState([])

    useEffect(() => {
        getDeliveries(amount)
        .then(data => setDeliveries(data.deliveries))
    }, [amount, customer.id])

    function StatusDelivering({delivery}) {
        return (
            <li className="small-delivery-list__delivery">
                <TruckIcon className='delivery__icon' />
                <div className="delivery__info">
                    <h4 className="info__arrival-date">
                        Arrival Date: {delivery.arrivalDate}
                    </h4>
                    <h4 className="info__delivery-address">
                        To: {delivery.address}
                    </h4>
                </div>
                <div className="delivery__product-info">
                    <Link to={`/products/${delivery.product?.id}`} className="product-info__name">{delivery.product?.name}</Link>
                </div>
                <img src={delivery.product?.thumbnail} alt="" className="delivery__product-pic" />
            </li>
        )
    }

    function StatusDelivered({delivery}) {
        return (
            <li className="small-delivery-list__delivery">
                <BadgeCheckIcon className='delivery__icon' />
                <div className="delivery__info">
                    <h4 className="info__arrival-date">
                        Arrived At: {delivery.arrivalDate}
                    </h4>
                    <h4 className="info__delivery-address">
                        To: {delivery.address}
                    </h4>
                </div>
                <div className="delivery__product-info">
                    <Link to={`/products/${delivery.product?.id}`} className="product-info__name">{delivery.product?.name}</Link>
                </div>
                <img src={delivery.product?.thumbnail} alt="" className="delivery__product-pic" />
            </li>
        )
    }

    function StatusCancelled({delivery}) {
        return (
            <li className="small-delivery-list__delivery">
                <BanIcon className='delivery__icon' />
                <div className="delivery__info">
                    <h4 className="info__arrival-date">
                        Cancelled
                    </h4>
                    <h4 className="info__delivery-address">
                        To: {delivery.address}
                    </h4>
                </div>
                <div className="delivery__product-info">
                    <Link to={`/products/${delivery.product?.id}`} className="product-info__name">{delivery.product?.name}</Link>
                </div>
                <img src={delivery.product?.thumbnail} alt="" className="delivery__product-pic" />
            </li>
        )
    }

    return (
        <ul className="small-delivery-list">
            {deliveries.map(delivery => {
                if (delivery.status === 'delivering') {
                    return <StatusDelivering key={delivery.id} delivery={delivery} />
                }
                else if (delivery.status === 'delivered') {
                    return <StatusDelivered key={delivery.id} delivery={delivery} />
                }
                else if (delivery.status === 'cancelled') {
                    return <StatusCancelled key={delivery.id} delivery={delivery} />
                }
                else {
                    return <h1>ERROR</h1>
                }
            })}
            {deliveries.length > 0 &&
                <Link className='small-delivery-list__more-link' to='/deliveries'>More</Link>
            }
        </ul>
    )
}

export default SmallDeliveryList