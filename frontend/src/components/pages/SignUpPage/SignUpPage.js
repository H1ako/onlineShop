// styles
import "./SignUpPage.scss"
// global
import { useState } from "react"
import { useDispatch } from 'react-redux';
// libs
import { signUp } from "../../../libs/actionPosters"
// components
import UploadPicture from "../../UploadPicture/UploadPicture"
import { updateCustomer } from "../../../store/slices/customerSlice";

function SignUpPage() {
  const dispatch = useDispatch()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordAgain, setPasswordAgain] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [picture, setPicture] = useState(null)
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")

  const signUpHandler = () => {
    // const signUpData = {
    //     email,
    //     password,
    //     passwordAgain,
    //     firstName,
    //     lastName,
    //     picture,
    //     phone,
    //     address
    // }

    const newCustomerData = new FormData()
    if (picture != null) newCustomerData.append('picture', picture)
    newCustomerData.append('email', email)
    newCustomerData.append('password', password)
    newCustomerData.append('passwordAgain', passwordAgain)
    newCustomerData.append('firstName', firstName)
    newCustomerData.append('lastName', lastName)
    newCustomerData.append('phone', phone)
    newCustomerData.append('address', address)

    signUp(newCustomerData)
    .then(data => {
      if (data.result === 'success') {
        dispatch(updateCustomer({'customer': data.customer.email ? data.customer : {}}))
      }
    })
  }

  return (
    <div className="sign-up-page">
      <main>
        <h3 className="heading">Sign Up</h3>
        <div encType="multipart/form-data" className="form">
          <UploadPicture setPicture={setPicture} />
          <div className="form__name">
            <input placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} type="text" className="name__firstName" />
            <input placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} type="text" className="name__lastName" />
          </div>
          <input placeholder="Email" required={true} value={email} onChange={e => setEmail(e.target.value)} type="email" className="form__email" />
          <input placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} type="tel" className="form__phone" />
          <div className="form__passwords">
            <input placeholder="Password" required={true} value={password} onChange={e => setPassword(e.target.value)} type="password" className="passwords__password" />
            <input placeholder="Password Again" required={true} value={passwordAgain} onChange={e => setPasswordAgain(e.target.value)} type="password" className="passwords__password-again" />
          </div>
          <input placeholder="Delivery Address" value={address} onChange={e => setAddress(e.target.value)} type="text" className="form__address" />         
          <button onClick={signUpHandler} className="form__btn">Sign Up</button>
        </div>
      </main>
    </div>
  )
}

export default SignUpPage
