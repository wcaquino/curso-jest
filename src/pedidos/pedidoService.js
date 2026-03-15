export const pedidoService = {
    aplicarDesconto: (valor) => {
        return valor - 10
    },
    gerarNota: (valor) => {
        console.log('Gerando nota')
    },
    fecharPedido: (valorTotal) => {
        const valorFinal = pedidoService.aplicarDesconto(valorTotal)
        pedidoService.gerarNota(valorFinal)
        return valorFinal
    }
}