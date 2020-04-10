const express = require('express')
const app = express()
const morgan = require('morgan')
const fetch = require('node-fetch');

//settings
app.set('port', process.env.PORT || 4000);
app.set('json spaces', 2);

//middlewares
app.use(morgan('tiny'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//routes
app.get('/cotizacion/:moneda', /*async*/ function (req, res) {

    let response = {};
    let moneda = req.params.moneda;
    let moneda2 = '';

    try {
        switch (moneda) {
            case 'dolar':
                moneda2 = 'USD';
                break;
            case 'euro':
                moneda2 = 'EUR';
                break;
            case 'real':
                moneda2 = 'BRL';
                break;
            default :
                break;
        }

        const url = `https://api.cambio.today/v1/quotes/${moneda2}/ARS/json?quantity=1&key=4163|PSiWDi_zMm*ugmX1Wco~*hV7PD*mr1s1`;

        //const api = await fetch(url);
        //const response = await api.json();
        
        fetch(url, {
            method: 'get',
            headers: {'Content-Type': 'application/json'},
        })
            .then(res => res.json())
            .then(json => {

                response = {
                    moneda: moneda,
                    precio: json.result.amount
                }

                res.json(response);
            });

    } catch (e) {
        console.log('ERROR', e);
        res.json({err: 'ERROR'});
    }

})

//comenzando el servidor
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});

