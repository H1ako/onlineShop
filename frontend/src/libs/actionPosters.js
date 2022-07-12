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

export async function login() {
  const response = await fetch(`/api/customer/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "X-CSRFTOKEN": document.querySelector("[name=csrfmiddlewaretoken]").value,
    },
  })

  const data = await response.json()

  return data
}

export async function cancelDelivery(deliveryId) {
  const response = await fetch(`/api/customer/delivery/${deliveryId}`, {
    method: "PATCH",
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

export async function purchaseProduct(
  productId,
  amount = 1,
  address = "customerAddress"
) {
  const fetchData = {
    amount,
    address,
  }

  const response = await fetch(`/api/customer/deliveries/${productId}`, {
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

export async function updateSettings(settings) {
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
      "Content-Type": "application/json;charset=utf-8",
      "X-CSRFTOKEN": document.querySelector("[name=csrfmiddlewaretoken]").value,
    },
    body: JSON.stringify(settings),
  })

  const data = await response.json()
  return data
}
