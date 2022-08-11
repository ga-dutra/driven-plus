import drivenLogo from "../assets/img/drivenLogo.svg";
import styled from "styled-components";
import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { postLogin } from "../services/drivenplus";

export default function LoginPage() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();
  const userStored = JSON.parse(localStorage.getItem("user"));
  const { setUserdata } = useContext(UserContext);

  function localStorageLogin() {
    if (userStored) {
      const userStoredData = {
        email: userStored.email,
        password: userStored.password,
      };
      const promise = postLogin(userStoredData);
      promise.then((res) => {
        setUserdata(res.data);
        console.log(res.data);
        console.log("login pelo localstorage");
        navigate("/subscriptions");
      });
      promise.catch((err) => {
        return;
      });
    }
  }
  useEffect(() => {
    localStorageLogin();
  }, []);

  function handleForm({ value, name }) {
    console.log(value, name);
    setForm({
      ...form,
      [name]: value,
    });
  }

  function sendForm() {
    const body = { ...form };
    const promise = postLogin(body);
    promise.then((res) => {
      localStorage.setItem("user", JSON.stringify(res.data));
      setUserdata(res.data);
      navigate("/subscriptions");
    });
    promise.catch((err) => {
      alert(
        "Não foi possível efetuar o login! Por favor, cheque seus dados e tente novamente."
      );
    });
  }

  return (
    <Wrapper>
      <img src={drivenLogo} alt="Driven Logo" />
      <FormWrapper>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendForm();
          }}
        >
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
          <button>ENTRAR</button>
          <Link to="/sign-up">
            <span>Não tem uma conta? Cadastre-se!</span>
          </Link>
        </form>
      </FormWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 0 38px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    margin-top: 140px;
    margin-bottom: 90px;
  }
`;

const FormWrapper = styled.div`
  width: 300px;
  text-align: center;

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  input {
    font-family: "Roboto", sans-serif;
    border: solid #ffffff;
    margin-bottom: 16px;
    min-height: 52px;
    border-radius: 5px;
    padding: 0 14px;
    font-size: 15px;
  }

  input::placeholder {
    color: #7e7e7e;
  }

  input:focus {
    outline: none;
  }

  button {
    height: 52px;
    border: solid #ff4791;
    border-radius: 8px;
    background-color: #ff4791;
    margin-top: 8px;
    margin-bottom: 24px;
    font-weight: 700;
    font-size: 14px;
    line-height: 16px;
    color: #ffffff;
    cursor: pointer;
  }

  span {
    text-decoration-line: underline;
    font-weight: 400;
    font-size: 15px;
  }
`;

export { FormWrapper };
