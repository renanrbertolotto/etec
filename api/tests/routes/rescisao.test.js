const request = require('supertest');
const app     = require('../../src/app');

describe('Teste do endpoint de cálculo da rescisão', () => {
    test('Deve retornar 400 quando salário bruto for nulo', async () => {
        const respostaEsperada = {
            status: 400,
            erro: 'Campos obrigatórios: salarioBruto, dataAdmissao, dataRescisao, tipoRescisao, diasTrabalhados',
        };

        const payload = {
            salarioBruto: null,
            dataAdmissao: '2025-06-10',
            dataRescisao: '2025-08-10',
            tipoRescisao: 'semJustaCausa',
            diasTrabalhados: 20,
        };

        const res = (await request(app).post('/ETEC/rescisao').send(payload));
        expect(res.statusCode).toBe(respostaEsperada.status);
        expect(res.body.erro).toStrictEqual(respostaEsperada.erro);
    });

    test('Deve retornar 400 quando data admissão for nulo', async () => {
        const respostaEsperada = {
            status: 400,
            erro: 'Campos obrigatórios: salarioBruto, dataAdmissao, dataRescisao, tipoRescisao, diasTrabalhados',
        };

        const payload = {
            salarioBruto: 2000.00,
            dataAdmissao: null, 
            dataRescisao: '2025-08-10',
            tipoRescisao: 'semJustaCausa',
            diasTrabalhados: 20,
        };

        const res = (await request(app).post('/ETEC/rescisao').send(payload));
        expect(res.statusCode).toBe(respostaEsperada.status);
        expect(res.body.erro).toStrictEqual(respostaEsperada.erro);
    });

    test('Deve retornar 400 quando data rescisão for nulo', async () => {
        const respostaEsperada = {
            status: 400,
            erro: 'Campos obrigatórios: salarioBruto, dataAdmissao, dataRescisao, tipoRescisao, diasTrabalhados',
        };

        const payload = {
            salarioBruto: 4000.00,
            dataAdmissao: '2025-06-10',
            dataRescisao: null, 
            tipoRescisao: 'semJustaCausa',
            diasTrabalhados: 20,
        };

        const res = (await request(app).post('/ETEC/rescisao').send(payload));
        expect(res.statusCode).toBe(respostaEsperada.status);
        expect(res.body.erro).toStrictEqual(respostaEsperada.erro);
    });

    test('Deve retornar 400 quando tipo rescisão for nulo', async () => {
        const respostaEsperada = {
            status: 400,
            erro: 'Campos obrigatórios: salarioBruto, dataAdmissao, dataRescisao, tipoRescisao, diasTrabalhados',
        };

        const payload = {
            salarioBruto: 4000.00,
            dataAdmissao: '2025-06-10',
            dataRescisao: '2025-08-10',
            tipoRescisao: null, 
            diasTrabalhados: 20,
        };

        const res = (await request(app).post('/ETEC/rescisao').send(payload));
        expect(res.statusCode).toBe(respostaEsperada.status);
        expect(res.body.erro).toStrictEqual(respostaEsperada.erro);
    });

    test('Deve retornar 400 quando dias trabalhados for nulo', async () => {
        const respostaEsperada = {
            status: 400,
            erro: 'Campos obrigatórios: salarioBruto, dataAdmissao, dataRescisao, tipoRescisao, diasTrabalhados',
        };

        const payload = {
            salarioBruto: 4000.00,
            dataAdmissao: '2025-06-10',
            dataRescisao: '2025-08-10',
            tipoRescisao: 'semJustaCausa',
            diasTrabalhados: null, 
        };

        const res = (await request(app).post('/ETEC/rescisao').send(payload));
        expect(res.statusCode).toBe(respostaEsperada.status);
        expect(res.body.erro).toStrictEqual(respostaEsperada.erro);
    });

    test('Deve retornar 400 quando todos os argumentos forem nulo', async () => {
        const respostaEsperada = {
            status: 400,
            erro: 'Campos obrigatórios: salarioBruto, dataAdmissao, dataRescisao, tipoRescisao, diasTrabalhados',
        };

        const payload = {
            salarioBruto: null,
            dataAdmissao: null,
            dataRescisao: null, 
            tipoRescisao: null, 
            diasTrabalhados: null,
        };

        const res = (await request(app).post('/ETEC/rescisao').send(payload));
        expect(res.statusCode).toBe(respostaEsperada.status);
        expect(res.body.erro).toStrictEqual(respostaEsperada.erro);
    });

    test('Deve retornar 400 quando tipo rescisão for um tipo inválido', async () => {
        const respostaEsperada = {
            status: 400,
            erro: 'tipoRescisao inválido. Use: semJustaCausa, comJustaCausa, pedidoDemissao, acordoComum',
        };

        const payload = {
            salarioBruto: 4000.00,
            dataAdmissao: '2025-06-10',
            dataRescisao: '2025-08-10',
            tipoRescisao: 'tipoInvalido',
            diasTrabalhados: 20,
        };

        const res = (await request(app).post('/ETEC/rescisao').send(payload));
        expect(res.statusCode).toBe(respostaEsperada.status);
        expect(res.body.erro).toStrictEqual(respostaEsperada.erro);
    });

    test('Deve retornar 200 quando todos os dados forem válidos', async () => {
        const respostaEsperada = {
            status: 200,
        };

        const payload = {
            salarioBruto: 4000.00,
            dataAdmissao: '2025-06-10',
            dataRescisao: '2025-08-10',
            tipoRescisao: 'comJustaCausa',
            diasTrabalhados: 20,
        };

        const res = (await request(app).post('/ETEC/rescisao').send(payload));
        expect(res.statusCode).toBe(respostaEsperada.status);
    });
})
