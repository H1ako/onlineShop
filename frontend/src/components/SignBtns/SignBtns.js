// styles
import "./SignBtns.scss"
// global
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
// store
import { openSignInWindow } from "../../store/slices/customerSlice"

function SignBtns() {
  const dispatch = useDispatch()

  const signInBtnHandler = () => {
    dispatch(openSignInWindow())
  }

  return (
    <div className="sign-btns">
      <button onClick={signInBtnHandler} className="sign-btns__sign-in">
        Sign In
      </button>
      <Link to="/sign-up" className="sign-btns__sign-up">
        Sign Up
      </Link>
    </div>
  )
}

export default SignBtns
