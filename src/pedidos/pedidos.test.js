import { 
    buscarPedidoPorID,
    calcularFrete,
    gerarCodidoRastreio,
    adicionarAoCarrinho,
    enviarEmailConfirmacao,
    consultaPrecoProduto,
    aplicarDesconto
} from './pedidos'

describe('Busca de pedidos', () => {
    test('Deve retornar o pedido para um ID existente', () => {
        const pedido = buscarPedidoPorID(1);
        expect(pedido.id).toBe(1)
        expect(pedido).toBeDefined()
        expect(pedido).toBeTruthy()
    })

    test('Deve retornar null para pedido não encontrado', () => {
        const pedido = buscarPedidoPorID(3);
        expect(pedido).toBeFalsy()
        expect(pedido).toBeNull()
    })

    test('Deve retornar undefined para ID inválido', () => {
        const pedido = buscarPedidoPorID(0);
        expect(pedido).toBeFalsy()
        expect(pedido).toBeUndefined()
    })
})

describe('Cálculo de frete', () => {
    test('O valor do frete deve ser positivo', () => {
        const valor = calcularFrete(100)
        // expect(valor > 0).toBe(true)
        expect(valor).toBeGreaterThan(0)
    })

    test('O valor do frete deve ser calculado de acordo com a distância fornecida', () => {
        const valor = calcularFrete(100)
        expect(valor).toBeCloseTo(314.159, 2)
    })
})

describe('Código de rastreio', () => {
    const codigo = gerarCodidoRastreio(123)

    test('Deve validar o formato do código de rastreio', () => {
        // expect(codigo).toBe('BR-ORDER-123-xyz')
        expect(codigo).toMatch(/^BR-ORDER-\d+-xyz$/)
    })

    test('Deve iniciar com BR-ORDER', () => {
        expect(codigo).toMatch(/^BR-ORDER/)
    })

    test('Deve finalizar com xyz', () => {
        expect(codigo).toMatch(/xyz$/)
    })
})

describe('Gestão de Carrinho', () => {
    test('Deve adicionar um produto ao carrinho', () => {
        const carrinho = [{produto: 'Mouse', quantidade: 2}]
        const item = {produto: 'teclado', quantidade: 3}

        const novoCarrinho = adicionarAoCarrinho(carrinho, item)
        
        expect(novoCarrinho).toContain(item)
        expect(novoCarrinho).toContainEqual({produto: 'teclado', quantidade: 3})
        expect(novoCarrinho).toEqual([{produto: 'Mouse', quantidade: 2}, {produto: 'teclado', quantidade: 3}])
        expect(novoCarrinho).toHaveLength(2)
    })

    test('Deve lançar erro ao adicionar item com quantidade zero', () => {
        const carrinho = [{produto: 'Mouse', quantidade: 2}]
        const item = {produto: 'teclado', quantidade: 0}

        expect(() => {
            adicionarAoCarrinho(carrinho, item)
        }).toThrow('Quantidade deve ser maior que zero')
        
    })
})

describe('Serviço de email', () => {
    test('Deve enviar email com sucesso', (done) => {
        function callback(erro, mensagem) {
            try {
                expect(erro).toBeNull()
                expect(mensagem).toBe('Confirmado para email@mail.com')
                done()
            } catch (error) {
                done(error)
            }
        }

        enviarEmailConfirmacao('email@mail.com', callback)
    })
})

describe('Consulta de preços', () => {
    describe('Promise', () => {
        test('Deve retornar o preco esperado do produto', () => {
            return consultaPrecoProduto(1).then(valor => {
                expect(valor).toBe(100)
            })
        })

        test('Deve fazer a assertiva com resolves', () => {
            return expect(consultaPrecoProduto(1)).resolves.toBe(100)
        })

        test('Deve considerar o erro com o rejects', () => {
            return expect(consultaPrecoProduto(10)).rejects.toBe('Produto não encontrado')
        })
    })

    describe('Async / Await', () => {
        test('Deve retornar o preco esperado do produto', async () => {
            const valor = await consultaPrecoProduto(1)
            expect(valor).toBe(100)
        })

        test('Deve capturar o erro', async () => {
            try {
                await consultaPrecoProduto(99)
            } catch (error) {
                expect(error).toBe("Produto não encontrado")
            }
        })

        test('Deve considerar o erro com o rejects e Await', async () => {
            await expect(consultaPrecoProduto(10)).rejects.toBe('Produto não encontrado')
        })
    })
})

describe('Cálculo de desconto', () => {
    const mock = jest.fn()

    test('Deve retornar o default quando não souber o que fazer', () => {
        const resultado = aplicarDesconto(50, mock)
        expect(resultado).toBeNaN()
        expect(mock).toHaveBeenCalled()
        expect(mock).toHaveBeenCalledWith(45)
    })

    test('Deve calcular a aliquota baseado no valor informado', () => {
        mock.mockReturnValue(0.5)
        const resultado = aplicarDesconto(100, mock)

        expect(resultado).toBe(45)
        expect(mock).toHaveBeenCalledTimes(1)
        expect(mock).toHaveBeenCalledWith(90)
    })

    test('Deve permitir aplicar lógica no mock', () => {
        const novoMock = jest.fn().mockImplementation(n => n / 100)
        const resultado = aplicarDesconto(100, novoMock)

        expect(resultado).toBe(81)
    })
})