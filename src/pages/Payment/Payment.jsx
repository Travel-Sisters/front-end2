import React from 'react';
import MenuConfirmation from '@/components/MenuConfirmation/Menu'

import warning from '@/assets/img/warning.svg'
import question from '@/assets/img/question.svg'
import shield from '@/assets/img/shield-check.svg'

import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import './Payment.css'
import axios from 'axios';

const formatInputDate = (dateString, forBackend = false) => {
    if (forBackend) { // formato "AAAA-MM"
        return dateString.replace(/(\d{4})(\d{2})/, '$1-$2');
    } else { // formato "MM/AAAA"
        return dateString.replace(/(\d{2})(\d{4})/, '$1/$2');
    }
};

const handleDateChange = (event) => {
    const inputDate = event.target.value;
    const cleanedValue = inputDate.replace(/\D/g, '');
    const formattedDateForDisplay = formatInputDate(cleanedValue, false);
    const formattedDateForBackend = formatInputDate(cleanedValue, true);

    setData(formattedDateForDisplay);
    setDataForBackend(formattedDateForBackend);

};

var telefoneMotorista = null
const storedViagem = JSON.parse(sessionStorage.getItem('viagem'));
if (storedViagem) {
    console.log('Detalhes da Viagem:', storedViagem);
    console.log('Número:', storedViagem.motorista.telefone);
    telefoneMotorista = storedViagem.motorista.telefone;
}

setTimeout(() => {

    getQrcode()

}, 5000);

const getQrcode = async () => {

    const pix = JSON.parse(sessionStorage.getItem('pix'))


    try {
        const qrcode = await axios.get(`http://localhost:3001/pix/qrcode/${pix.locid}`);
        console.log(qrcode.data);
    } catch (error) {
        console.error('Erro ao obter QR code:', error);

    }

}

function Payment() {
    const navigate = useNavigate();
    const whatsappURL = `https://wa.me/5511948350477`;

    const alerta = () => {

        Swal.fire({
            title: 'Pagamento efetuado com sucesso:',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Falar com a motorista',
            cancelButtonText: 'Voltar para home'

        }).then((result) => {

            if (result.isConfirmed) {
                window.open(whatsappURL, '_blank');
            } else if (result.isDismissed) {
                navigate('/passageira')
            }
        });
    };

    return (
        <>
            <section className="point" id="page-create-point">
                <div className="point-container container grid">
                    <div id="page-create-point">
                        <header>
                            <MenuConfirmation />
                        </header>
                    </div>
                    <form>
                        <h1 style={
                            {
                                color: '#202020',
                                fontSize: '1.7rem'
                            }
                        }>confirme os detalhes de pagamento</h1>
                        <p style={
                            {
                                color: '#999999',
                                fontSize: '1rem',
                                fontWeight: '500'
                            }
                        }>revise e junte-se ao seu grupo de viagem!</p>
                        <section class="inputs flex">
                            <img src={qrcode.response.imagemQrcode} />
                            <div>GERANDO QRCODE</div>
                        </section>
                        <section class="info-security flex">
                            <img src={shield}
                                alt="ícone de segurança" />
                            seus dados estão seguros
                        </section>

                        <div className='button-wrapper'>
                            <button type="submit"
                                onClick={alerta}>
                                confirmar pagamento
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}

export default Payment
