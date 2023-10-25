import styled from "styled-components";

const App = styled.div`
  background-color: #fafafa;

  color: #202020;
  height: 100vh;
  overflow: hidden;

  padding: 2.4rem 3.2rem;

  height: 100vh;
  width: 100vw;
  max-width: 880px;

  display: grid;
  grid-template-rows: max-content 1fr max-content;
  margin: auto;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  #user-info {
    display: flex;
    align-items: center;
    gap: 1.6rem;
  }

  #user-info img {
    width: 4.8rem;
    height: 4.8rem;
    object-fit: cover;
    border-radius: 50%;
  }

  #user-status .status {
    display: flex;
    align-items: baseline;
    gap: 0.4rem;

    margin-top: 0.4rem;
  }

  #user-status .status::before {
    content: "";
    width: 0.8rem;
    height: 0.8rem;
    display: block;
    background-color: var(--pink);
    border-radius: 50%;
  }

  #user-status .status {
    color: var(--text);
    font-size: 1.2rem;
  }

  #last-seen {
    margin-top: 2.6rem;
    font-size: 1.2rem;
    line-height: 1.4rem;
    text-align: center;
  }
`;

const Messages = styled.div`
  overflow-y: scroll;
  padding-bottom: 2.4rem;

  #last-seen {
    margin-top: 2.6rem;
    font-size: 1.2rem;
    line-height: 1.4rem;
    text-align: center;
  }

  #messages {
    overflow-y: scroll;
    padding-bottom: 2.4rem;
  }

  #messages::-webkit-scrollbar {
    display: none;
  }

  .messages {
    margin-top: 3rem;
    display: grid;
    gap: 3rem;
    font-size: 1.2rem;
    line-height: 1.4rem;
  }

  .message .body {
    width: fit-content;
    margin-top: 1rem;
    background-color: var(--second-grey);
    color: var(--text);
    font-weight: 700;
    padding: 1.4rem;
    border-radius: 0 0.8rem 0.8rem 0.8rem;
  }

  .message:not(.you) {
    width: 40vw;
  }

  .message.you {
    margin-left: auto;
  }

  .message.you .top {
    text-align: right;
  }

  .message.you .body {
    background-color: var(--text);
    color: var(--background);
    border-radius: 0.8rem 0.8rem 0 0.8rem;
  }
`;

const Form = styled.form`
  form {
    display: flex;
    align-items: center;
    background: #0f0fe1;
    border-radius: 999rem;
    padding: 1.4rem 2.4rem;
    font: var(--body-font);
  }

  input {
    flex: 1;
    outline: none;
    color: #e1e1e6;
  }

  form:focus-within {
    outline: 2px solid white;
  }

  input::placeholder {
    color: #e1e1e6;
    font-size: 1.2rem;
    line-height: 1.4rem;
  }

  button i {
    color: #e1e1e6;
    font-size: 2.4rem;
  }

  input,
  button {
    background-color: transparent;
    border: 0;
  }
`;
const Button = styled.form`
  form {
    display: flex;
    align-items: center;
    background: #0f0fe1;
    border-radius: 999rem;
    padding: 1.4rem 2.4rem;
  }

  input {
    flex: 1;
    outline: none;
    color: #e1e1e6;
  }

  form:focus-within {
    outline: 2px solid white;
  }

  input::placeholder {
    color: #e1e1e6;
    font-size: 1.2rem;
    line-height: 1.4rem;
  }

  button i {
    color: #e1e1e6;
    font-size: 2.4rem;
  }

  input,
  button {
    background-color: transparent;
    border: 0;
  }
`;

export { App, Top, Messages, Form, Button };
