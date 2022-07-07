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

export async function getProducts(amount='all', tags=[], isRandom=false, searchQuery='') {
    const tagsString = tags.join(',')
    const url = `/api/products/${amount ? `?amount=${amount}` : ''}${tagsString ? `&tags=${tagsString}` : ''}${isRandom ? '&random' : ''}${searchQuery ? `&searchQuery=${searchQuery}` : ''}`

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        }
    })
    const data = await response.json()
    
    return data.products
}

export async function getCategories() {
    const response = await fetch(`/api/products/categories`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        }
    })
    const data = await response.json()

    return data.categories
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

export async function getDeliveries(amount='all') {
    const url = `/api/customer/deliveries${amount ? `?amount=${amount}` : ''}`

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        }
    })
    const data = await response.json()

    return data
}

export async function getFavourites(amount='all') {
    const url = `/api/customer/favourites${amount ? `?amount=${amount}` : ''}`

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        }
    })
    const data = await response.json()

    return data
}