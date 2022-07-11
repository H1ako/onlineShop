// styles
import './PurchaseBtn.scss'
// icons
// libs
import { purchaseProduct } from '../../libs/actionPosters'


function PurhcaseBtn({
    productId,
}) {
    const btnClickHandler = () => {
        purchaseProduct(productId)
    }

    return (
        <button onClick={btnClickHandler} className='purchase-btn' title='purchase product'>
            Purchase
        </button>
    )
}

export default PurhcaseBtn