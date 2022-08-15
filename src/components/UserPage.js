import styled from "styled-components";
import { FormWrapper } from "./LoginPage";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

export default function UserPage() {
  const navigate = useNavigate();
  const { userdata } = useContext(UserContext);
  return (
    <Wrapper>
      <ion-icon
        onClick={() => navigate("/home")}
        name="arrow-back-outline"
      ></ion-icon>
      <FormWrapper>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input placeholder={userdata.name}></input>
          <input
            placeholder={
              userdata.cpf.length === 11
                ? `${userdata.cpf.slice(0, 3)}.${userdata.cpf.slice(
                    3,
                    6
                  )}.${userdata.cpf.slice(6, 9)}-${userdata.cpf.slice(9)}`
                : userdata.cpf
            }
          ></input>
          <input placeholder={userdata.email}></input>
        </form>
        <button onClick={() => navigate(`/users/${userdata.id}/update`)}>
          ATUALIZAR
        </button>
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

  button {
    width: 100%;
  }

  ion-icon {
    position: fixed;
    left: 20px;
    top: 20px;
    font-size: 32px;
    cursor: pointer;
  }

  input {
    pointer-events: none;
  }
`;
