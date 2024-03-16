const https = require("https");
var axios = require("axios");
var fs = require("fs");

const options = require('../credentials/credentials')


base_url = options.sandbox == true ? "https://pix-h.api.efipay.com.br" : "https://pix.api.efipay.com.br"
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
        url: base_url + "/oauth/token",
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



const create_cob = async (access_token, dataCob) => {

    const certificate = fs.readFileSync(options.certificate)

    const agent = new https.Agent({
        pfx: certificate,
        passphrase: '',
    })

    var config = {
        method: "POST",
        url: base_url + "/v2/cob",
        headers: {
            Authorization: "Bearer " + access_token,
            "Content-Type": "application/json",
        },
        httpsAgent: agent,
        data: dataCob,
    }

    try {
        const response = await axios(config);
        console.log('\n', JSON.stringify(response.data), '\n');
        return response.data
    } catch (error) {
        console.log('\n', error, '\n');
    }

}

const getQrcode = async (access_token, locId) => {

    const certificate = fs.readFileSync(options.certificate)

    const agent = new https.Agent({
        pfx: certificate,
        passphrase: '',
    })

    var config = {
        method: "GET",
        url: base_url + "/v2/loc/" + locId + "/qrcode",
        headers: {
            Authorization: "Bearer " + access_token,
            "Content-Type": "application/json",
        },
        httpsAgent: agent,
    }

    try {
        const response = await axios(config);
        console.log('\n', JSON.stringify(response.data), '\n');
        return response.data
    } catch (error) {
        console.log('\n', error, '\n');
    }

}

var data = JSON.stringify({
	"calendario": {
		"expiracao": 3600
	},
	"devedor": {
		"cpf": "12345678909",
		"nome": "Francisco da Silva"
	},
	"valor": {
		"original": "123.45"
	},
	"chave": "71cdf9ba-c695-4e3c-b010-abb521a3f1be",
	"solicitacaoPagador": "Cobrança dos serviços prestados."
})

async function gerar_cobranca(req, res) {

	// data = req.body

	try {

		token = await getAccessToken()
		const response = await create_cob(token, data)
		res.status(200).json({response})
	
	} catch (error) {
		console.error('Erro ao atualizar dados', error)
    	res.status(500).json({ error: 'Erro interno do servidor' })
	}
	
}

async function gerar_qrcode(req, res) {
	
	const locId = req.params.locId

	try {

		token = await getAccessToken()
		const response = await getQrcode(token, locId)
		res.status(200).json({response})

	} catch (error) {

	}

}

module.exports = {
    gerar_cobranca,
	gerar_qrcode
}