// styles
import './UpdateLocationBtn.scss'
// icons
// libs
import { updateSettings } from '../../libs/actionPosters'


function UpdateLocationBtn({
    location,
}) {
    const btnClickHandler = () => {
        updateSettings({
            address: location
        })
    }

    return (
        <button onClick={btnClickHandler} className='update-location-btn' title='update delivery address'>
            Update
        </button>
    )
}

export default UpdateLocationBtn