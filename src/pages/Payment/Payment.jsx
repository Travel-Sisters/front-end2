import React from 'react';
import MenuConfirmation from '@/components/MenuConfirmation/Menu'

import warning from '@/assets/img/warning.svg'
import question from '@/assets/img/question.svg'
import shield from '@/assets/img/shield-check.svg'

import {useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import './Payment.css'

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
    const whatsappURL = `https://wa.me/${telefoneMotorista}`;

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
                            <MenuConfirmation/>
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
                            <div class="input-wrapper">
                                <label for="cc-number">número do cartão</label>
                                <input id="cc-number" type="text" placeholder="**** **** **** ****"/>
                            </div>
                            <div class="input-wrapper">
                                <label for="cc-holder">nome do titular</label>
                                <input id="cc-holder" type="text" placeholder="nome como está no cartão" required/>
                                <div class="warning">
                                    <img src={warning}
                                        alt="ícone de alerta"/>
                                    nome do titular é obrigatório
                                </div>
                            </div>

                            <div class="col-2 flex">
                                <div class="input-wrapper">
                                    <label for="cc-validity">validade</label>
                                    <input id="cc-validity" type="text" placeholder="mm/aa"/>
                                </div>

                                <div class="input-wrapper">
                                    <label class="flex help" for="cc-cvv">CVV
                                        <img src={question}
                                            alt="ícone de ajuda"
                                            title="esse número está, geralmente, nas costas do seu cartão"/>
                                    </label>
                                    <input id="cc-cvv" type="text" placeholder="***"/>
                                </div>
                            </div>
                        </section>
                        <section class="info-security flex">
                            <img src={shield}
                                alt="ícone de segurança"/>
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
