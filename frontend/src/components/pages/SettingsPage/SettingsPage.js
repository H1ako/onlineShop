// styles
import "./SettingsPage.scss"
// global
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
// libs
import { signUp, updateSettings } from "../../../libs/actionPosters"
// components
import UploadPicture from "../../UploadPicture/UploadPicture"
import {
  updateCustomer,
  useCustomer,
} from "../../../store/slices/customerSlice"

function SettingsPage() {
  const dispatch = useDispatch()
  const { customer } = useCustomer()
  const [email, setEmail] = useState("")
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [newPasswordAgain, setNewPasswordAgain] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [picture, setPicture] = useState(null)
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")

  const updateSettingsHadler = () => {
    const newCustomerData = new FormData()
    if (typeof picture === 'object' && picture !== null) {
      console.log(typeof picture)
      newCustomerData.append("picture", picture)
    }
    newCustomerData.append("email", email)
    newCustomerData.append("newPassword", newPassword)
    newCustomerData.append("oldPassword", oldPassword)
    newCustomerData.append("newPasswordAgain", newPasswordAgain)
    newCustomerData.append("firstName", firstName)
    newCustomerData.append("lastName", lastName)
    newCustomerData.append("phone", phone)
    newCustomerData.append("address", address)

    updateSettings(newCustomerData).then((data) => {
      console.log(data)
      if (data.result === "success") {
        dispatch(
          updateCustomer({ customer: data.customer.email ? data.customer : {} })
        )
      }
    })
  }

  const updateFormToCustomerData = () => {
    setEmail(customer.email)
    setFirstName(customer.firstName)
    setLastName(customer.lastName)
    setPicture(customer.picture)
    setPhone(customer.phone)
    setAddress(customer.address)
  }

  useEffect(() => {
    updateFormToCustomerData()

    // eslint-disable-next-line
  }, [customer.id])

  return (
    <div className="settings-page">
      <main>
        <h3 className="heading">Settings</h3>
        <div className="form">
          <UploadPicture picture={picture} setPicture={setPicture} />
          <div className="form__name">
            <input
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              className="name__firstName"
            />
            <input
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              className="name__lastName"
            />
          </div>
          <input
            placeholder="Email"
            required={true}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="form__email"
          />
          <input
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="tel"
            className="form__phone"
          />
          <input
            placeholder="Delivery Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            type="text"
            className="form__address"
          />
          <h3>To Change Password</h3>
          <div className="form__passwords">
            <input
              placeholder="Old Password"
              required={true}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              type="password"
              className="passwords__old-password"
            />
            <input
              placeholder="New Password"
              required={true}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              type="password"
              className="passwords__new-password"
            />
            <input
              placeholder="New Password Again"
              required={true}
              value={newPasswordAgain}
              onChange={(e) => setNewPasswordAgain(e.target.value)}
              type="password"
              className="passwords__new-password-again"
            />
          </div>
          <button onClick={updateSettingsHadler} className="form__btn">
            Update Settings
          </button>
        </div>
      </main>
    </div>
  )
}

export default SettingsPage
