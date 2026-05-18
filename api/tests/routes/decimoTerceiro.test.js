const request = require('supertest');
const app     = require('../../src/app');

describe('Teste do endpoint de cálculo do décimo terceiro', () => {
    test('Deve retornar 400 quando salário bruto for nulo', async () => {
        const respostaEsperada = {
            status: 400,
            erro: 'Salário Bruto é obrigatório'
        };

        const payload = {
            salarioBruto: null,
            mesesTrabalhados: 2,
        };

        const res = (await request(app).post('/ETEC/decimo-terceiro').send(payload));
        expect(res.statusCode).toBe(respostaEsperada.status);
        expect(res.body.erro).toStrictEqual(respostaEsperada.erro);
    });

    test('Deve retornar 400 quando meses trabalhados for nulo', async () => {
        const respostaEsperada = {
            status: 400,
            erro: 'Meses Trabalhados é obrigatório'
        };

        const payload = {
            salarioBruto: 2000.00,
            mesesTrabalhados: null,
        };

        const res = (await request(app).post('/ETEC/decimo-terceiro').send(payload));
        expect(res.statusCode).toBe(respostaEsperada.status);
        expect(res.body.erro).toStrictEqual(respostaEsperada.erro);
    });

    test('Deve retornar 400 quando salário bruto e meses tralhados for nulo', async () => {
        const respostaEsperada = {
            status: 400,
            erro: 'Salário Bruto é obrigatório'
        };

        const payload = {
            salarioBruto: null,
            mesesTrabalhados: null,
        };

        const res = (await request(app).post('/ETEC/decimo-terceiro').send(payload));
        expect(res.statusCode).toBe(respostaEsperada.status);
        expect(res.body.erro).toStrictEqual(respostaEsperada.erro);
    });

    test('Deve retornar 400 quando meses trabalhados for menor que 1', async () => {
        const respostaEsperada = {
            status: 400,
            erro: 'Meses Trabalhados deve ser entre 1 e 12'
        };

        const payload = {
            salarioBruto: 2000.00,
            mesesTrabalhados: -1, // Dando erro quando for 0, cai no if da route
        };

        const res = (await request(app).post('/ETEC/decimo-terceiro').send(payload));
        expect(res.statusCode).toBe(respostaEsperada.status);
        expect(res.body.erro).toStrictEqual(respostaEsperada.erro);
    })

    test('Deve retornar 400 quando meses trabalhados for maior que 12', async () => {
        const respostaEsperada = {
            status: 400,
            erro: 'Meses Trabalhados deve ser entre 1 e 12'
        };

        const payload = {
            salarioBruto: 2000.00,
            mesesTrabalhados: 13, // Dando erro quando for 0, cai no if da route
        };

        const res = (await request(app).post('/ETEC/decimo-terceiro').send(payload));
        expect(res.statusCode).toBe(respostaEsperada.status);
        expect(res.body.erro).toStrictEqual(respostaEsperada.erro);

    })

    test('Deve retornar 400 quando meses trabalhados for 0', async () => {
        const respostaEsperada = {
            status: 400,
            erro: 'Meses Trabalhados deve ser entre 1 e 12'
        };

        const payload = {
            salarioBruto: 2000.00,
            mesesTrabalhados: 0,
        };

        const res = (await request(app).post('/ETEC/decimo-terceiro').send(payload));
        expect(res.statusCode).toBe(respostaEsperada.status);
        expect(res.body.erro).toStrictEqual(respostaEsperada.erro);
    })

    test('Deve retornar 200 quando salário bruto e meses trabalhados for um valor válido', async () => {
        const respostaEsperada = {
            status: 200,
        };

        const payload = {
            salarioBruto: 2000.00,
            mesesTrabalhados: 12,
        };

        const res = (await request(app).post('/ETEC/decimo-terceiro').send(payload));
        expect(res.statusCode).toBe(respostaEsperada.status);
    })
})
