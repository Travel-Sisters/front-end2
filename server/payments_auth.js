const https = require("https");
var axios = require("axios");
var fs = require("fs");

function print(text) {
    console.log(text)
}

const options = require('./credentials')
const EfiPay = require('sdk-node-apis-efi');
const { response } = require("express");
const credentials = require("./credentials");
const efipay = new EfiPay(options)
// LIB JS NECESSÁRIA PARA GERAR O PAYMENT TOKEN 
// *necessário para liberar a geração da cobrança*


base_url = options.sandbox == true ? "https://cobrancas.api.efipay.com.br" : "https://cobrancas-h.api.efipay.com.br"
console.log(base_url)

var data = JSON.stringify({ grant_type: "client_credentials" });
var data_credentials = options.client_id + ":" + options.client_secret;

var auth = Buffer.from(data_credentials).toString("base64");

var config = {
  method: "POST",
  url: base_url+"/v1/authorize",
  headers: {
    Authorization: "Basic " + auth,
    "Content-Type": "application/json",
  },
  data: data,
};


const fetchData = async () => {
    try {
      const response = await axios(config);
      console.log('\n', JSON.stringify(response.data), '\n');
      accessToken(response.data.access_token)
    } catch (error) {
      console.log('\n', error, '\n');
    }
};

let body = {
	items: [
		{
			name: 'Product 1',
			value: 1000,
			amount: 2,
		},
	],
	shippings: [
		{
			name: 'Default Shipping Cost',
			value: 100,
		},
	],
}


efipay.createCharge({}, body)
	.then((resposta) => {
		console.log(resposta)
	})
	.catch((error) => {
		console.log(error)
	})

// let body = {
// 	items: [
// 		{
// 			name: 'Product 1',
// 			value: 1000,
// 			amount: 2,
// 		},
// 	],
// 	shippings: [
// 		{
// 			name: 'Default Shipping Cost',
// 			value: 100,
// 		},
// 	],
// }

// efipay.createCharge({}, body)
// 	.then((resposta) => {
// 		console.log(resposta)
// 	})
// 	.catch((error) => {
// 		console.log(error)
// 	})