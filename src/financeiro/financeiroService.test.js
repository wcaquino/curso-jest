import { logar, consultarSaldo } from './financeiroService'

describe('Integração com o Sr. Barriga', () => {
    test('Deve realizar o login e obter o saldo', async () => {
        const token = await logar('a@a', 'a')
        expect(token).toBeDefined()

        const saldo = await consultarSaldo(token)
        expect(saldo.length).toBeGreaterThan(0)
        expect(saldo[0]).toHaveProperty('saldo')
    })
})

describe('Snapshot test', () => {
    let token = null
    
    beforeAll(async () => {
        console.log('--- Antes de tudo ----')
        token = await logar('a@a', 'a')
    })

    afterAll(() => {
        console.log('--- Depois de tudo ----')
    })

    beforeEach(() => {
        console.log('--- Antes do test ----')
    })

    afterEach(() => {
        console.log('--- Depois do test ----')
    })

    test('Deve gerar arquivo de snapshot', async () => {
        expect(token).toBeDefined()

        const saldo = await consultarSaldo(token)
        expect(saldo).toMatchSnapshot()
    })

    test('Deve gerar arquivo de snapshot', async () => {
        expect(token).toBeDefined()

        const saldo = await consultarSaldo(token)
        expect(saldo).toMatchInlineSnapshot(`
[
  {
    "conta": "Conta para movimentacoes",
    "conta_id": 2590138,
    "saldo": "-1500.00",
  },
  {
    "conta": "Conta com movimentacao",
    "conta_id": 2590139,
    "saldo": "-1500.00",
  },
  {
    "conta": "Conta para saldo",
    "conta_id": 2590140,
    "saldo": "534.00",
  },
  {
    "conta": "Conta para extrato",
    "conta_id": 2590141,
    "saldo": "-220.00",
  },
]
`)
    })
})