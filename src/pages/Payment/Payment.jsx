import React, { useEffect, useState } from 'react';
import MenuConfirmation from '@/components/MenuConfirmation/Menu'

import shield from '@/assets/img/shield-check.svg'

import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import './Payment.css'
import { api, api_pix } from '../../api';

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



function Payment() {
    const navigate = useNavigate();
    const whatsappURL = `https://wa.me/5511948350477`;

    const [qrcode, setQrcode] = useState("");
    const [infoPreenchida, setInfoPreenchida] = useState(false);

    const getQrcode = async () => {

        try {
            const pix = JSON.parse(sessionStorage.getItem('pix'));
            const response = await api_pix.get(`/qrcode/${pix.locid}`);
            console.log('MOSTRANDO QRCODE -> ', response.data.response.imagemQrcode);
            // const t = response.data.imagemQrcode
            // console.log(t)
            setQrcode(response.data.response.imagemQrcode);
            setInfoPreenchida(true)
        } catch (error) {
            console.error('Erro ao obter QR code:', error);
        }
    };

    // const preencherInformacao = () => {
    //     setQrcode(getQrcode())
    //     setInfoPreenchida(true);
    // };

    // useEffect(() => {
    //     preencherInformacao();
    // }, [qrcode]);

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
                navigate('/passageira');
            }
        });
    };

    if (!infoPreenchida) {
        getQrcode()
        console.log('VARIAVEL ', qrcode)
    }


    return (
        <>
            {infoPreenchida ?
                <section className="point" id="page-create-point">
                    <div className="point-container container grid">
                        <header>
                            <MenuConfirmation />
                        </header>
                        <div className='form-payment'>
                            <h1 style={{ color: '#202020', fontSize: '1.7rem' }}>confirme os detalhes de pagamento</h1>
                            <p style={{ color: '#999999', fontSize: '1rem', fontWeight: '500' }}>revise e junte-se ao seu grupo de viagem!</p>
                            <div style={{ height: '100%' }} >
                                <img  src={qrcode} alt="" />
                            </div>
                            <section className="info-security flex">
                                <img src={shield} alt="ícone de segurança" />
                                seus dados estão seguros
                            </section>
                            <div className='button-wrapper'>
                                <button className='button-form' onClick={alerta}>confirmar pagamento</button>
                            </div>
                        </div>
                    </div>
                </section>
                : <div> carregando</div>}
        </>
    )
}

export default Payment
