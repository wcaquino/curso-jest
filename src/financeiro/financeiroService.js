import axios from 'axios'

const BASE_URL = 'https://barrigarest.wcaquino.me'

export const logar = async (email, senha) => {
    const response = await axios.post(`${BASE_URL}/signin`, {
        email, 
        senha, 
        redirecionar: false
    })
    return response.data.token
}

export const consultarSaldo = async (token) => {
    const response = await axios.get(`${BASE_URL}/saldo`, {
        headers: {authorization: `JWT ${token}`}
    })
    return response.data
}