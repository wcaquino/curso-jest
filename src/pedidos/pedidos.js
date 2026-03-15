const pedidosAtivos = [
    {id: 1, nome: 'Gaita', valor: 100},
    {id: 2, nome: 'Violão', valor: 300}
]

export const buscarPedidoPorID = (id) => {
    if(id <= 0) return undefined
    const pedido = pedidosAtivos.find(p => p.id === id);
    return pedido || null
}

export const calcularFrete = (distancia) => {
    return distancia * Math.PI
}

export const gerarCodidoRastreio = (idPedido) => {
    return `BR-ORDER-${idPedido}-xyz`
}

export const adicionarAoCarrinho = (itens, novoItem) => {
    if(novoItem.quantidade <= 0) {
        throw new Error('Quantidade deve ser maior que zero')
    }
    return [...itens, novoItem]
}

export const enviarEmailConfirmacao = (email, callback) => {
    setTimeout(() => {
        if(!email) {
            return callback('Email é inválido')
        }
        callback(null, `Confirmado para ${email}`)
    }, 1000)
}

export const consultaPrecoProduto = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const produto = pedidosAtivos.find(p => p.id == id)
            if(produto) {
                resolve(produto.valor)
            } else {
                reject('Produto não encontrado')
            }
        }, 500)
    })
}

export const aplicarDesconto = (valor, obterAliquota) => {
    const novoValor = valor * 0.9
    const aliquota = obterAliquota(novoValor)
    return novoValor * aliquota
}

export const consultaPrecoProduto2 = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const produto = pedidosAtivos.find(p => p.id == id)
            if(produto) {
                resolve(produto.valor)
            } else {
                reject('Produto não encontrado')
            }
        }, 500)
    })
}

export const consultaPrecoProduto3 = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const produto = pedidosAtivos.find(p => p.id == id)
            if(produto) {
                resolve(produto.valor)
            } else {
                reject('Produto não encontrado')
            }
        }, 500)
    })
}

export const consultaPrecoProduto4 = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const produto = pedidosAtivos.find(p => p.id == id)
            if(produto) {
                resolve(produto.valor)
            } else {
                reject('Produto não encontrado')
            }
        }, 500)
    })
}