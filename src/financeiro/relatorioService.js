import { logar, consultarSaldo } from './financeiroService'

export const gerarResumoFinanceiro = async (email, senha) => {
    const token = await logar(email, senha)
    const saldos = await consultarSaldo(token)

    const totalGeral = saldos.reduce((acc, item) => acc + Number(item.saldo), 0)
    return totalGeral
}