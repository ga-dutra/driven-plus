import styled from "styled-components";
import { FormWrapper } from "./LoginPage";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { putChangeUser } from "../services/drivenplus";

export default function UserUpdatePage() {
  const { userdata, setUserdata, config } = useContext(UserContext);
  const [form, setForm] = useState({
    name: userdata.name,
    email: userdata.email,
    cpf: userdata.cpf,
  });
  const navigate = useNavigate();

  function handleForm({ value, name }) {
    setForm({
      ...form,
      [name]: value,
    });
  }

  function sendForm() {
    const body = { ...form };
    const promise = putChangeUser(body, config);
    promise.then((res) => {
      setUserdata(res.data);
      navigate("/home");
    });
    promise.catch((err) => {
      console.log("Erro ano tentar alterar o usuário");
      alert(
        "Houve um erro ao tentar alterar os dados do usuário. Por favor, revise-os e tente novamente."
      );
    });
  }

  return (
    <Wrapper>
      <ion-icon
        onClick={() => navigate(`/users/${userdata.id}`)}
        name="arrow-back-outline"
      ></ion-icon>
      <FormWrapper>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendForm();
          }}
        >
          <input
            placeholder={userdata.name}
            name="name"
            type="text"
            onChange={(e) => {
              handleForm({ name: e.target.name, value: e.target.value });
            }}
            required
          ></input>
          <input
            placeholder={
              userdata.cpf.length === 11
                ? `${userdata.cpf.slice(0, 3)}.${userdata.cpf.slice(
                    3,
                    6
                  )}.${userdata.cpf.slice(6, 9)}-${userdata.cpf.slice(9)}`
                : userdata.cpf
            }
            name="cpf"
          ></input>
          <input
            placeholder={userdata.email}
            name="email"
            type="email"
            onChange={(e) => {
              handleForm({ name: e.target.name, value: e.target.value });
            }}
            required
          ></input>
          <input
            placeholder="Senha atual"
            name="currentPassword"
            type="password"
            onChange={(e) => {
              handleForm({ name: e.target.name, value: e.target.value });
            }}
            required
          ></input>
          <input
            placeholder="Nova senha"
            name="newPassword"
            type="password"
            onChange={(e) => {
              handleForm({ name: e.target.name, value: e.target.value });
            }}
          ></input>
          <button>SALVAR</button>
        </form>
      </FormWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 0 38px;
  margin-top: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  input:nth-child(2) {
    pointer-events: none;
  }

  ion-icon {
    position: fixed;
    left: 20px;
    top: 20px;
    font-size: 32px;
    cursor: pointer;
  }
`;
