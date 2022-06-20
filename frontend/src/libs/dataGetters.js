export async function getViewHistory(amount=6) {
    const reponse = await fetch(`/api/customer/view-history?amount=${amount}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            // 'X-CSRF-Token': document.querySelector('[name=csrfmiddlewaretoken]').value,
        }
    })
    const data = await reponse.json()

    return data.viewHistory
}

export async function getProductData(productId) {
    const response = await fetch(`/api/products/${productId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        }
    })
    const data = await response.json()
    
    return data.product
}

export async function getProducts(amount='all', tags=[], isRandom=false) {
    const tagsString = await tags.join(',')

    const response = await fetch(`/api/products/?amount=${amount}&tags=${tagsString}${isRandom && '&random'}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        }
    })
    const data = await response.json()
    console.log(data)

    return data.products
}

export async function getCustomerData() {
    const response = await fetch(`/api/customer/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        }
    })
    const data = await response.json()

    return data.customer
}