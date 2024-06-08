import React, { useState, useEffect } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import rosa from '../../assets/img/rosa.png';
import eye from '../../assets/img/eye.svg';
import eyeOff from '../../assets/img/eye-off.svg';
import bg from '../../assets/img/bg.jpg';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import config from '../../../config';
import { api, api_pix } from '../../api';

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePassword = () => {
        setPasswordVisible((prev) => !prev);
    };


    const handleFormSubmit = async (evento) => {
        evento.preventDefault();
        const usuario = {
            email,
            senha
        };
        if (!email || !senha) {
            Swal.fire({
                title: 'Preencha todos os campos!',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        const setSessionStoraged = async (userId) => {
            try {
                //const response = await api.get(`http://localhost:8080/usuarios/buscarPoId/${userId}`)
                const response = await api.get(`/usuarios/buscarPoId/${userId}`);
                console.log(response)

            } catch (error) {
                console.log('erro ao buscar usuário: ', error)
            }
        }


        try {
            //const response = await api.post('http://localhost:8080/usuarios/entrar', usuario);
            const response = await api.post(`/usuarios/entrar`, usuario);

            if (response.status === 200) {
                const token = response.data.token;

                sessionStorage.setItem('authToken', token);
                sessionStorage.setItem('usuario', response.data.nome);
                sessionStorage.setItem('idUsuarioLogin', response.data.userId);
                // sessionStorage.setItem('cpf', response.data.cpf)

                console.log('Resposta do servidor:', response.data);
                //alert('Usuário entrou com sucesso!');
                setEmail('');
                setSenha('');

                if (response.data.userId !== null && response.data.userId !== undefined) {

                    // setSessionStoraged(response.data.userId)

                    //const responseM = await api.get(`http://localhost:8080/usuarios/verificar-perfil/${response.data.userId}`);
                    const responseM = await api.get(`/usuarios/verificar-perfil/${response.data.userId}`);

                    sessionStorage.setItem('idMotoristaLogin', responseM.data.id);

                    if (responseM.status === 204) {

                        navigate('/passageira')
                    } else if (responseM.status === 200) {
                        Swal.fire({
                            title: 'Escolha uma opção:',
                            icon: 'question',
                            showCancelButton: true,
                            confirmButtonText: 'Passageira',
                            cancelButtonText: 'Motorista'
                        }).then((result) => {
                            if (result.isConfirmed) {

                                Swal.fire('Passageira', '', 'success');
                                navigate('/passageira')
                            } else if (result.isDismissed) {

                                Swal.fire('Motorista', '', 'success');
                                navigate('/motorista')
                            }
                        });
                    }

                }

                // navigate('/sair');
            } else {
                throw new Error('Ops! Ocorreu um erro interno.');
            }
        } catch (error) {
            console.error('Erro ao logar usuário:', error);
            Swal.fire({
                title: 'E-mail ou senha incorretos',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            document.getElementById('senha').value = '';
        }
    };

    useEffect(() => {
        const showModal = (openButton, modalContent) => {
            const openBtn = document.getElementById(openButton);
            const modalContainer = document.getElementById(modalContent);

            if (openBtn && modalContainer) {
                openBtn.addEventListener('click', (event) => {
                    event.preventDefault();
                    modalContainer.classList.add('show-modal');
                });
            }
        };
        showModal('open-modal', 'modal-container');

        const closeBtns = document.querySelectorAll('.close-modal');

        const closeModal = () => {
            const modalContainer = document.getElementById('modal-container');
            modalContainer.classList.remove('show-modal');
        };

        closeBtns.forEach(c => c.addEventListener('click', (event) => {
            event.preventDefault();
            closeModal();
        }));

        return () => {
            const openBtn = document.getElementById('open-modal');
            if (openBtn) {
                openBtn.removeEventListener('click', showModal);
            }
            closeBtns.forEach(c => c.removeEventListener('click', closeModal));
        };
    }, []);


    return (
        <>
            <div id="page" className="flex">
                <div>
                    <header>
                        <img src={rosa}
                            alt="" />
                    </header>
                    <main>
                        <div className="headline">
                            <h1>acesse a plataforma</h1>
                            <p className='p'>
                                faça login ou registre-se para trilhar seu caminho.
                            </p>
                        </div>
                        <form>
                            <div className="input-wrapper">
                                <label htmlFor="email">e-mail</label>
                                <input id="email" type="email" name="email"
                                    value={
                                        email.email
                                    }
                                    onChange={
                                        (e) => setEmail(e.target.value)
                                    }
                                    required
                                    placeholder="digite seu e-mail" />
                            </div>

                            <div className="input-wrapper">
                                <div className="label-wrapper flex">
                                    <label htmlFor="senha">senha</label>
                                </div>

                                <input type={
                                    passwordVisible ? 'text' : 'password'
                                }
                                    id="senha"
                                    value={
                                        senha.senha
                                    }
                                    onChange={
                                        (e) => setSenha(e.target.value)
                                    }
                                    placeholder="digite sua senha" />

                                <img onClick={togglePassword}
                                    className={
                                        `eye ${passwordVisible ? 'hide' : ''
                                        }`
                                    }
                                    src={eyeOff}
                                    alt="" />
                                <img onClick={togglePassword}
                                    className={
                                        `eye ${passwordVisible ? '' : 'hide'
                                        }`
                                    }
                                    src={eye}
                                    alt="" />
                            </div>

                            <button type="submit"
                                onClick={handleFormSubmit}>entrar</button>

                            <div className="create-account">
                                <p>não possui uma conta?</p><a><span onClick={() => navigate('/cadastro')}> cadastre-se</span></a>
                                <br />
                                <a href="#modal-container" id="open-modal" className="modal-link">
                                    ao continuar, afirmo que concordo com a Política de privacidade e os Termos de uso.
                                </a>
                                <section className="modal container">

                                    <div className="modal-container" id="modal-container">
                                        <div className="modal-content">
                                            <div className="modal-close close-modal" title="Close">
                                                <i className='bx bx-x'></i>
                                            </div>
                                            <div style={{ textAlign: 'center' }}>
                                                <img src={rosa} alt="" />
                                            </div>
                                            <h1 className="modal-title">Política de Privacidade definida entre usuário e Travel Sisters</h1>
                                            <p className="modal-description">
                                                PRIVACIDADE DO USUÁRIO <br />
                                                Proteger sua privacidade é muito importante para nós. Suas senhas são armazenadas nos servidores da
                                                TRAVEL-SISTERS de forma criptografada. As informações sensíveis são transferidas entre seu navegador e o
                                                site/aplicativo de forma criptografada, utilizando o protocolo seguro HTTPS. Ao transmitir informações
                                                sensíveis, você deve sempre garantir que seu navegador seja capaz de validar o certificado do site/aplicativo.<br /><br />
                                                COLETA DE DADOS<br />
                                                Em nossa plataforma, as informações são coletadas das seguintes formas:<br /><br />
                                                USO DE INFORMAÇÕES PESSOAIS<br />
                                                O presente termo permite que a TRAVEL-SISTERS use suas informações pessoais para diferentes finalidades.<br />
                                                1. Informações fornecidas por você: Identificação pessoal, como nome completo, CPF, data de nascimento,
                                                e-mail. Eventualmente e em caso de necessidade, poderá ser feita a solicitação de informações por meio
                                                de contato direto da TRAVEL-SISTERS via e-mail. A TRAVEL-SISTERS não possui qualquer
                                                responsabilidade sobre a veracidade dos dados apresentados por você.<br />
                                                2. Informações de transações: Coletamos detalhes sobre as transações relacionados ao uso que você faz
                                                em nossa Plataforma, incluindo o tipo de serviço solicitado, a data e a hora de prestação do serviço, o
                                                valor cobrado, o trajeto e outros dados relacionados às transações. Além disso, se alguém usar eventuais
                                                códigos promocionais, poderemos associar seu nome à pessoa.<br />
                                                3. Histórico de contato: A TRAVEL-SISTERS armazena informações a respeito de todos os contatos já
                                                realizados entre os usuários, como conteúdos baixados a partir de nossas páginas e interações via chat
                                                online, e-mail, preenchimento ou telefone.<br />
                                                4. E-mail: É utilizado para a operação de envio de material solicitado pelo Usuário, como resposta de
                                                questionamentos, confirmações, proposta de compras e vendas, pedidos de negociações, contratos,
                                                assim como para o compartilhamento de informativos e notícias.
                                                Também pode ser usado para envio de Newsletters vinculadas aos serviços prestados pela TRAVELSISTERS. Por fim, o e-mail será utilizado, ainda, para comunicação direta da TRAVEL-SISTERS e de seus
                                                parceiros. No entanto, o Usuário poderá cancelar o seu cadastro a qualquer momento, clicando no link
                                                disponibilizado para esse fim, ao final da mensagem eletrônica.<br />
                                                5. Dados de download: Poderão ser usados e divulgados em pesquisas e estatísticas de forma
                                                generalizada, não sendo revelada abertamente ao público nenhuma informação pertinente do Usuário, a
                                                menos que autorizada explicitamente. Será usado também para consulta interna da TRAVEL-SISTERS e
                                                para aperfeiçoamento do serviço.<br />
                                                6. CPF/CNPJ: Seu número de CPF (pessoa física) ou CNPJ (pessoa jurídica) poderá ser usado para verificar
                                                os limites disponíveis junto às autoridades competentes, regulamentadoras e fiscais relevantes do Brasil
                                                ou para eventuais necessidades, a fim de garantir o sucesso das transações e satisfação dos clientes, de
                                                forma que esses dados serão sempre mantidos em segurança.<br /><br />
                                                SEGURANÇA<br />
                                                A TRAVEL-SISTERS tem o compromisso de preservar a estabilidade, segurança e funcionalidade da rede, por
                                                meio de medidas técnicas compatíveis com os padrões internacionais e pelo estímulo ao uso de boas práticas.
                                                A segurança é feita por sistemas de terceiros. Todavia nenhum serviço disponível na internet possui total
                                                garantia contra invasões ilegais. Em casos em que terceiros não autorizados invadam o sistema de forma
                                                ilícita, a TRAVEL-SISTERS não se responsabiliza pelos danos por eles causados.<br /><br />
                                                IDIOMA<br />
                                                Toda a documentação legal do site/aplicativo, incluindo os presentes Termos e Condições de Uso, foi
                                                elaborada em língua portuguesa. A TRAVEL-SISTERS poderá, a seu exclusivo critério, disponibilizar traduções
                                                de tais documentos no site/aplicativo apenas para conveniência do Usuário, a seu exclusivo critério. A versão
                                                portuguesa destes Termos e Condições de Uso e das Políticas de Privacidade é a única consentida pela
                                                TRAVEL-SISTERS. Em caso de contradição ou divergência entre a versão em português e eventual tradução
                                                para qualquer outro idioma, prevalecerá sempre a versão em língua portuguesa.<br /><br />
                                                DURAÇÃO<br />
                                                Esta Políticas de Privacidade e os Termos de Uso têm duração indefinida e permanecerão em vigor enquanto
                                                o site/aplicativo estiver ativo. Da mesma forma, o acesso e a utilização do site/aplicativo e dos recursos por ele
                                                oferecidos têm, em princípio, duração indeterminada, a exclusivo critério da TRAVEL-SISTERS. A TRAVELSISTERS reserva-se, no entanto, o direito de suspender e/ou cancelar, de forma unilateral e a qualquer
                                                momento, o acesso ao site/aplicativo ou algumas de suas partes ou recursos, sem necessidade de prévio
                                                aviso.<br /><br />
                                                LEI APLICÁVEL E FORO DE ELEIÇÃO<br />
                                                O site/aplicativo é controlado, operado e administrado pela TRAVEL-SISTERS na cidade de São Paulo, Estado
                                                de São Paulo, Brasil, podendo ser acessado por qualquer dispositivo conectado à Internet,
                                                independentemente de sua localização geográfica. Em vista das diferenças que podem existir entre as
                                                legislações locais e nacionais, ao acessar o site/aplicativo, o Usuário concorda que a legislação aplicável para
                                                fins destes Termos e Condições de Uso será aquela vigente na República Federativa do Brasil. A TRAVELSISTERS e o Usuário concordam que o Foro Central da Comarca de São Paulo, SP, Brasil, será o único
                                                competente para dirimir qualquer questão ou controvérsia oriunda ou resultante do uso do site/aplicativo,
                                                renunciando expressamente a qualquer outro, por mais privilegiado que seja, ou venha a ser.<br />
                                                4. Dados bancários: Os dados bancários dos Usuários não ficarão armazenados ou compartilhados em
                                                nosso site/aplicativo. As transações financeiras ocorridas na plataforma respeitam a todos os protocolos
                                                de segurança e privacidade exigidos por lei, dispostos por meio do gateway de pagamentos utilizado
                                                pela TRAVEL-SISTERS, API de meios de pagamento responsáveis pelo serviço.<br />
                                                5. Compartilhamento com parceiros: Suas informações pessoais poderão ser compartilhadas com nossos
                                                parceiros de forma genérica e para pesquisas, respeitando a inviolabilidade e sigilo das comunicações
                                                feitas na internet e as comunicações privadas.<br />
                                                6. Acesso às suas informações pessoais: Poderão ver todas as suas informações pessoais apenas
                                                funcionários, prepostos e sócios da TRAVEL-SISTERS. Os demais Usuários poderão checar apenas
                                                informações pertinentes em certos momentos necessários, como, por exemplo, ao chamar uma corrida.
                                                Eventualmente, caso a inserção de suas informações se dê em ações criadas em parcerias, os parceiros
                                                explicitamente identificados também terão acesso à informação.<br /><br />
                                                CONTATO<br />
                                                A TRAVEL-SISTERS disponibiliza seu endereço eletrônico (e-mail) de atendimento para receber todas as
                                                comunicações que o Usuário desejar fazer, que é: travelsisters@outlook.com. Todas as solicitações devem
                                                sempre estar acompanhadas das informações de contato, para que possamos finalizar o atendimento. Os
                                                Termos e Condições de Uso e Políticas de Privacidade podem ser consultados a qualquer tempo, de forma
                                                online, por meio da Plataforma.
                                            </p>

                                            <button className="modal-button-link close-modal">
                                                concordo que li os termos de Uso e Privacidade.
                                            </button>
                                        </div>
                                    </div>
                                </section>

                            </div>
                        </form>

                    </main>
                </div>
                <img src={bg} alt="giovana" />
            </div>
        </>
    )
}
