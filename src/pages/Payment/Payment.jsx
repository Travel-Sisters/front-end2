import React, { useState } from 'react';
import Modal from 'react-modal';
import MenuConfirmation from '@/components/MenuConfirmation/Menu'
import axios from 'axios';

import warning from '@/assets/img/warning.svg'
import question from '@/assets/img/question.svg'
import shield from '@/assets/img/shield-check.svg'

import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import './Payment.css'

const formatInputDate = (dateString, forBackend = false) => {
    if (forBackend) {
        // formato "AAAA-MM"
        return dateString.replace(/(\d{4})(\d{2})/, '$1-$2');
    } else {
        // formato "MM/AAAA"
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



function Payment() {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handleConfirmPayment = () => {
        alerta();
        navigate();
        setModalIsOpen(false); // Fechar o modal após o pagamento ser confirmado
    };

    const navigate = useNavigate();
    const alerta = () => {
        Swal.fire({
            title: 'Pagamento efetuado com sucesso!',
            icon: 'ok',
            confirmButtonText: 'OK'
        });
        navigate('/passageira');
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
                            <div class="input-wrapper">
                                <label for="cc-number">número do cartão</label>
                                <input id="cc-number" type="text" placeholder="**** **** **** ****" />
                            </div>
                            <div class="input-wrapper">
                                <label for="cc-holder">nome do titular</label>
                                <input
                                    id="cc-holder"
                                    type="text"
                                    placeholder="nome como está no cartão"
                                    required
                                />
                                <div class="warning">
                                    <img src={warning} alt="ícone de alerta" />
                                    nome do titular é obrigatório
                                </div>
                            </div>

                            <div class="col-2 flex">
                                <div class="input-wrapper">
                                    <label for="cc-validity">validade</label>
                                    <input id="cc-validity" type="text" placeholder="mm/aa"
                                    />
                                </div>

                                <div class="input-wrapper">
                                    <label class="flex help" for="cc-cvv"
                                    >CVV
                                        <img
                                            src={question}
                                            alt="ícone de ajuda"
                                            title="esse número está, geralmente, nas costas do seu cartão"
                                        />
                                    </label>
                                    <input id="cc-cvv" type="text" placeholder="***" />
                                </div>
                            </div>
                        </section>
                        <section class="info-security flex">
                            <img src={shield} alt="ícone de segurança" />
                            seus dados estão seguros
                        </section>

                        <div className='button-wrapper'>
                            <button type="submit" onClick={alerta}>
                                confirmar pagamento
                            </button>
                        </div>
                        <button onClick={() => setModalIsOpen(true)}>WhatsApp</button>

                        <Modal
                            isOpen={modalIsOpen}
                            onRequestClose={() => setModalIsOpen(false)}
                            contentLabel="Modal de Pagamento"
                        >
                                <div>
                                    <p>Entre em contato pelo WhatsApp:</p>
                                    <a href={`https://wa.me/${11967918215}`} target="_blank" rel="noopener noreferrer">
                                    <button onClick={handleConfirmPayment}>Abrir WhatsApp</button>
                                    </a>
                                </div>
                        </Modal>
                    </form>
                </div>
            </section>
        </>
    )
}

export default Payment