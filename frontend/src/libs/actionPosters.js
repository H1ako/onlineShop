// authentication
export async function signIn(email, password) {
  const fetchData = {
    email,
    password
  }

  const response = await fetch(`/api/auth/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "X-CSRFTOKEN": document.querySelector("[name=csrfmiddlewaretoken]").value,
    },
    body: JSON.stringify(fetchData)
  })

  const data = await response.json()

  return data
}

export async function signUp(signUpFormData) {
  const response = await fetch(`/api/auth/`, {
    method: "POST",
    headers: {
      "X-CSRFTOKEN": document.querySelector("[name=csrfmiddlewaretoken]").value,
      "type": "formData"
    },
    body: signUpFormData
  })

  const data = await response.json()

  return data
}

// customer's
export async function updateSettings(settingsFormData) {
  // const settings = {
  //     address,
  //     firstName,
  //     lastName,
  //     password,
  //     passwordAgain,
  //     phone,
  //     email,
  //     picture,
  // }
  const response = await fetch(`/api/customer/`, {
    method: "POST",
    headers: {
      "X-CSRFTOKEN": document.querySelector("[name=csrfmiddlewaretoken]").value,
      "type": "formData"
    },
    body: JSON.stringify(settingsFormData),
  })

  const data = await response.json()
  return data
}

export async function updateViewHistory(productId) {
  const response = await fetch(`/api/view-history/${productId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "X-CSRFTOKEN": document.querySelector("[name=csrfmiddlewaretoken]").value,
    },
  })
  const data = await response.json()

  return data
}

export async function productFavouriteAction(productId) {
  const response = await fetch(`/api/customer/favourites/${productId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "X-CSRFTOKEN": document.querySelector("[name=csrfmiddlewaretoken]").value,
    },
  })

  const data = await response.json()
  return data
}

export async function productCartAction(productId, amount = 0) {
  const fetchData = {
    amount,
  }

  const response = await fetch(`/api/customer/cart/${productId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "X-CSRFTOKEN": document.querySelector("[name=csrfmiddlewaretoken]").value,
    },
    body: JSON.stringify(fetchData),
  })

  const data = await response.json()
  return data
}

export async function removeProductFromCart(productId) {
  const response = await fetch(`/api/customer/cart/${productId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "X-CSRFTOKEN": document.querySelector("[name=csrfmiddlewaretoken]").value,
    },
  })

  const data = await response.json()
  return data
}

// product's
export async function purchaseProduct(
  productId,
  amount = 1,
  address = "customerAddress"
) {
  const fetchData = {
    amount,
    address,
    productId,
  }

  const response = await fetch(`/api/customer/deliveries`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "X-CSRFTOKEN": document.querySelector("[name=csrfmiddlewaretoken]").value,
    },
    body: JSON.stringify(fetchData),
  })

  const data = await response.json()
  return data
}

export async function cancelDelivery(deliveryId) {
  const response = await fetch(`/api/customer/deliveries/${deliveryId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "X-CSRFTOKEN": document.querySelector("[name=csrfmiddlewaretoken]").value,
    },
  })

  const data = await response.json()

  return data
}
