export async function updateViewHistory(productId) {
    const response = await fetch(`/api/view-history/${productId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
    })
    const data = await response.json()
    return data
}

export async function login() {
    const response = await fetch(`/api/customer/login`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
    })
    const data = await response.json()
    return data
}