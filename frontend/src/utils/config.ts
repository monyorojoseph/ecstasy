export const config = {
    'headers': {
        'Content-Type': 'application/json'
    }
}

export const tokenConfig = (token: string)=> {
    return {
        'headers': {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }
}