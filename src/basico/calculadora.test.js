import { somar } from './calculadora'

describe('Operações matemáticas', () => {

    test('Deve somar dois números', () => {
        const resultado = somar(2, 5);
        expect(resultado).toBe(7)
    })
});