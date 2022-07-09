// styles
import './PurchaseBtn.scss'
// icons
// libs
import { purcaseProduct } from '../../libs/actionPosters'


function PurhcaseBtn({
    productId,
}) {
    const btnClickHandler = () => {
        purcaseProduct(productId)
    }

    return (
        <button onClick={btnClickHandler} className='purchase-btn' title='purchase product'>
            Purchase
        </button>
    )
}

export default PurhcaseBtn