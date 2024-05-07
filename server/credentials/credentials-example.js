const path = require('path');
const userDir = process.env.USERPROFILE
const caminhoCompleto = path.join(userDir, 'caminho/certificado');
module.exports = {
	// PRODUÇÃO = false
	// HOMOLOGAÇÃO = true
	sandbox: true,
	client_id: 'client_id',
	client_secret: 'client_secret',
	certificate: 'caminho/ate/seu/certificado.p12',
}