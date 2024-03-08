// const pay_auth = require('./payments_auth')

// const efipay = pay_auth.efipay
// const EfiJs = pay_auth.EfiJs

const EfiJs = require('payment-token-efi');

try {
    // EfiJs.CreditCard.debugger(true);
    EfiJs.CreditCard
        .setCardNumber('4485785674290087')
        .verifyCardBrand()
        .then(brand => {
            console.log('Bandeira: ', brand);

            if (brand !== 'undefined') {
                // Exemplo: executar a função para gerar o payment_token com a bandeira identificada
                try {
                    EfiJs.CreditCard
                        .setAccount('06850cc96ed0ad4522b2a34023cef968')
                        .setEnvironment('sandbox') // 'production' or 'sandbox'
                        .setCreditCardData({
                            brand: 'visa',
                            number: '4485785674290087',
                            cvv: '123',
                            expirationMonth: '05',
                            expirationYear: '2029',
                            reuse: false
                        })
                        .getPaymentToken()
                        .then(data => {
                            const payment_token = data.payment_token;
                            const card_mask = data.card_mask;

                            console.log('payment_token', payment_token);
                            console.log('card_mask', card_mask);
                        }).catch(err => {
                            console.log('Código: ', err.code);
                            console.log('Nome: ', err.error);
                            console.log('Mensagem: ', err.error_description);
                        });
                } catch (error) {
                    console.log('Código: ', error.code);
                    console.log('Nome: ', error.error);
                    console.log('Mensagem: ', error.error_description);
                }


            }
        }).catch(err => {
            console.log('Código: ', err.code);
            console.log('Nome: ', err.error);
            console.log('Mensagem: ', err.error_description);
        });
} catch (error) {
    console.log('Código: ', error.code);
    console.log('Nome: ', error.error);
    console.log('Mensagem: ', error.error_description);
}

let body = {
    "items": [
        {
            "name": "Meu Produto",
            "value": 5990,
            "amount": 1
        }
    ],
    "payment": {
        "credit_card": {
            "customer": {
                "name": "Gorbadoc Oldbuck",
                "cpf": "94271564656",
                "email": "email_do_cliente@servidor.com.br",
                "birth": "1990-08-29",
                "phone_number": "5144916523"
            },
            "installments": 1,
            "payment_token": "",
            "billing_address": {
                "street": "Avenida Juscelino Kubitschek",
                "number": "909",
                "neighborhood": "Bauxita",
                "zipcode": "35400000",
                "city": "Ouro Preto",
                "complement": "",
                "state": "MG"
            }
        }
    }
}