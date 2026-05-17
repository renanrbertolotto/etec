# CalcRH
API de cálculo de encargos trabalhistas — Empregada Doméstica

## Estrutura do Projeto
```
etec/
├── README.md
├── api/
│   ├── package.json
│   ├── package-lock.json
│   └── src/
│       ├── routes/
│       │   ├── salario.js
│       │   ├── decimoTerceiro.js
│       │   ├── ferias.js
│       │   └── rescisao.js
│       ├── services/
│       │   ├── salarioService.js
│       │   ├── decimoTerceiroService.js
│       │   ├── feriasService.js
│       │   └── rescisaoService.js
│       ├── app.js
│       └── server.js
└── app/
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── index.css
        ├── components/
        │   └── ui.jsx
        ├── services/
        │   └── api.js
        └── screens/
            ├── SplashScreen.jsx
            ├── LoginScreen.jsx
            ├── MainApp.jsx
            ├── SobreScreen.jsx
            ├── HelpScreen.jsx
            └── calculators/
                ├── SalarioScreen.jsx
                ├── DecimoScreen.jsx
                ├── FeriasScreen.jsx
                └── RecisaoScreen.jsx

## Como Rodar

### API (Terminal 1)
```bash
cd etec/api
npm install
npm start
```

### Front (Terminal 2)
```bash
cd etec/app
npm install
npm run dev
```

Acesse: http://localhost:5173

## Rotas da API

Base URL: `http://localhost:3000/ETEC`

| Método | Rota             | Descrição              |
|--------|------------------|------------------------|
| POST   | /salario         | Cálculo de salário     |
| POST   | /ferias          | Cálculo de férias      |
| POST   | /decimo-terceiro | Cálculo do 13° salário |
| POST   | /rescisao        | Cálculo de rescisão    |

## Tecnologias

- Node.js + Express (API)
- React + Vite (Front-end)

## Equipe

- Gabriel Adorno Simoso
- Renan Ribeiro Bertolotto
- Vitor Manzano Villela Dias

