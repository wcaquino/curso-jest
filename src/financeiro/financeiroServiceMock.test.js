import axios from 'axios'
import { logar } from './financeiroService'

jest.mock('axios')

describe('Serviço financeiro (com Mocks)', () => {
    test('Deve retornar o token, sem bater na API real', async () => {
        const respostaAxios = { data: { token: 'FAKE_TOKEN'}}
        axios.post.mockResolvedValue(respostaAxios)

        const token = await logar('asda@asd', '123456')
        expect(token).toBe('FAKE_TOKEN')
    })

    test('Deve rejeitar usuário inválido, sem bater na API real', async () => {
        axios.post.mockRejectedValue(new Error('Usuário inexistente'))

        await expect(logar('asda@asd', '123456')).rejects.toThrow('Usuário inexistente')
        expect(axios.post).toHaveBeenCalledTimes(1)
    })
})