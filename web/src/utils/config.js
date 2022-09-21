export const config = {
    'headers': {
        'Content-Type': 'application/json'
    }
}

export const tokenConfig = (token)=> {
    return {
        'headers': {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }
}