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
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'X-CSRF-Token': document.querySelector('[name=csrfmiddlewaretoken]').value,
        },
    })

    const data = await response.json()

    return data
}