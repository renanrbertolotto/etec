# etec
API de cálculo de encargos trabalhistas - Empregada Doméstica


Estrutura do Projeto

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
│       │   └── recisao.js
│       ├── services/
│       │   ├── salarioService.js
│       │   ├── decimoTerceiroService.js
│       │   ├── feriasService.js
│       │   └── recisaoService.js
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