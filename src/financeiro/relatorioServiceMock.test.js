import { logar, consultarSaldo } from './financeiroService'
import { gerarResumoFinanceiro } from './relatorioService'

jest.mock('./financeiroService')

describe('Consulta de saldo geral', () => {
    test('Deve coletar o saldo de todas as contas e calcular o total', async () => {
        logar.mockResolvedValue('fake-token')
        consultarSaldo.mockResolvedValue([
            {nome: 'Carteira', saldo: 1000},
            {nome: 'Banco', saldo: 9000}
        ])


        const resultado = await gerarResumoFinanceiro('a@asdasd', 'a1231')
        expect(resultado).toBe(10000)
    })
})