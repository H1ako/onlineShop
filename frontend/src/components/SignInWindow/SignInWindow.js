// styles
import "./SignInWindow.scss"
// icons
import { XIcon } from "@heroicons/react/solid"
// global
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
// libs
import { signIn } from "../../libs/actionPosters"
// components
// store
import {
  closeSignInWindow,
  updateCustomer,
} from "../../store/slices/customerSlice"
import { getCustomerDataByEmail } from "../../libs/dataGetters"

function SignInWindow() {
  const dispatch = useDispatch()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [potentialCustomer, setPotentialCustomer] = useState({})

  const close = () => {
    dispatch(closeSignInWindow())
  }

  const signInHandler = () => {
    signIn(email, password).then((data) => {
      if (data.result === "success") {
        dispatch(updateCustomer(data.customer))
        close()
      }
    })
  }

  useEffect(() => {
    getCustomerDataByEmail(email).then((data) => {
      console.log(data)
      if (data.result === "success") {
        setPotentialCustomer(data.customer)
      } else {
        setPotentialCustomer({})
      }
    })
  }, [email])

  return (
    <div className="window-area">
      <div className="window-area__sign-in-window">
        <h3 className="sign-in-window__heading">Sign In</h3>
        <button onClick={close} className="sign-in-window__close">
          <XIcon className="close__icon" />
        </button>
        {potentialCustomer.email && (
          <div className="sign-in-window__potential-customer">
            <img
              src={potentialCustomer.picture}
              alt=""
              className="potential-customer__picture"
            />
            <h3 className="potential-customer__name">
              {potentialCustomer.firstName} {potentialCustomer.lastName}
            </h3>
          </div>
        )}
        <div className="sign-in-window__form">
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            className="form__email"
          />
          <input
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="text"
            className="form__password"
          />
          <button onClick={signInHandler} className="form__btn">
            Sign In
          </button>
        </div>
      </div>
    </div>
  )
}

export default SignInWindow
