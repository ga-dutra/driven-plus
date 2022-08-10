import { Link } from "react-router-dom";
import { FormWrapper } from "./LoginPage";
import styled from "styled-components";
import { useState } from "react";

export default function SignUpPage() {
  const [form, setForm] = useState({});

  function handleForm({ value, name }) {
    console.log(value, name);
    setForm({
      ...form,
      [name]: value,
    });
  }

  return (
    <Wrapper>
      <FormWrapper>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            placeholder="nome"
            name="name"
            type="text"
            onChange={(e) => {
              handleForm({ name: e.target.name, value: e.target.value });
            }}
            required
          ></input>
          <input
            placeholder="CPF"
            name="cpf"
            type="text"
            onChange={(e) => {
              handleForm({ name: e.target.name, value: e.target.value });
            }}
            required
          ></input>
          <input
            placeholder="E-mail"
            name="email"
            type="email"
            onChange={(e) => {
              handleForm({ name: e.target.name, value: e.target.value });
            }}
            required
          ></input>
          <input
            placeholder="Senha"
            name="password"
            type="password"
            onChange={(e) => {
              handleForm({ name: e.target.name, value: e.target.value });
            }}
            required
          ></input>
          <button>CADASTRAR-SE</button>
          <Link to="/">
            <span>Já tem uma conta? Faça Login!</span>
          </Link>
        </form>
      </FormWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 0 38px;
  margin-top: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
