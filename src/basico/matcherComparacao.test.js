describe('Diferenças entre matchers de comparação', () => {

    test('toBe', () => {
        expect(2 + 3).toBe(5)
        
        const nome = 'Joao'
        expect(nome.toLowerCase()).toBe('joao')
        expect(nome).toMatch(/joao/i)
    })

    test('toEqual', () => {
        const obj1 = {nome: 'Joao', idade: 60}
        const obj2 = {nome: 'Joao', idade: 60}

        expect(obj1).toBe(obj1)
        expect(obj1).toEqual(obj2)
    })

    test('toStrictEqual', () => {
        const obj1 = {nome: 'Joao', idade: undefined}
        const obj2 = {nome: 'Joao'}

        expect(obj1).toEqual(obj2)
        expect(obj1).not.toStrictEqual(obj2)
    })
})