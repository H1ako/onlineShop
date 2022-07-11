// styles
import './NumberField.scss'
// icons
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'
// components


function NumberField({
    number,
    setNumber,
    min = 0,
    max = 99,
    step = 1
}) {

    return (
        <div className="number-field">
            <button className="number-field__btn" onClick={() => setNumber(Math.max(number - step, min))} >
                <ChevronLeftIcon className='btn__arrow' />
            </button>
            <input
                onChange={e => setNumber(Math.max(min, Math.min(max, e.target.value)))}
                value={number}
                type="number"
                className="number-field__input"
                min={min}
                max={max}
            />
            <button className="number-field__btn" onClick={() => setNumber(Math.min(number + step, max))}>
                <ChevronRightIcon className='btn__arrow' />
            </button>
        </div>
    )
}

export default NumberField