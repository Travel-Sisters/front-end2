const https = require("https");
var axios = require("axios");
var fs = require("fs");

const options = require('./credentials')
const EfiPay = require('sdk-node-apis-efi');
const efipay = new EfiPay(options)
// LIB JS NECESSÁRIA PARA GERAR O PAYMENT TOKEN 
// *necessário para liberar a geração da cobrança*
const EfiJs = require('payment-token-efi');


base_url = options.sandbox == true ? "https://cobrancas.api.efipay.com.br" : "https://cobrancas-h.api.efipay.com.br"
console.log("rota do ambiente: ", base_url)



const getAccessToken = async () => {
    var data = JSON.stringify({ grant_type: "client_credentials" });
    var data_credentials = options.client_id + ":" + options.client_secret;
    var auth = Buffer.from(data_credentials).toString("base64");
    const certificate = fs.readFileSync(options.certificate)

    const agent = new https.Agent({
        pfx: certificate,
        passphrase: '',
    })

    var config = {
        method: "POST",
        url: base_url + "/v1/authorize",
        headers: {
            Authorization: "Basic " + auth,
            "Content-Type": "application/json",
        },
        httpsAgent: agent,
        data: data,
    }

    try {
        const response = await axios(config);
        console.log('\n', JSON.stringify(response.data), '\n');
        return response.data.access_token
    } catch (error) {
        console.log('\n', error, '\n');
    }

}

let token

const runApp = async() => {

    token = await getAccessToken()
    console.log(token)

}
runApp()

module.exports = {
    token,
    efipay,
    EfiJs
}