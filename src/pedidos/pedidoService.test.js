import { pedidoService } from './pedidoService'

describe('Fechamento de pedido', () => {
    test('Deve fechar o pedido corretamente', () => {
        const spyNota = jest.spyOn(pedidoService, 'gerarNota')

        const valor = pedidoService.fecharPedido(100)
        expect(valor).toBe(90)
        expect(spyNota).toHaveBeenCalledTimes(1)
        expect(spyNota).toHaveBeenCalledWith(90)
    })

    test('Deve fechar o pedido corretamente', () => {
        const spyDesconto = jest.spyOn(pedidoService, 'aplicarDesconto')
                                    .mockImplementation(() => {
                                        throw new Error('Cupom indisponível')
                                    })

        
        expect(() => pedidoService.fecharPedido(100)).toThrow('Cupom indisponível')
    })

    test('Deve fechar o pedido corretamente', () => {
        const valor = pedidoService.fecharPedido(100)
        expect(valor).toBe(90)
    })
})