import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../contexts/UserContext";
import { getPlan } from "../services/drivenplus";
import LoadingAnimation from "./LoadingAnimation";
import { LoadingAnimationWrapper } from "./SubscriptionsPage";
import listIcon from "../assets/img/listIcon.svg";
import priceIcon from "../assets/img/priceIcon.svg";

export default function PlanSigningPage() {
  const { config } = useContext(UserContext);
  const planId = useParams().planId;
  const [planInfo, setPlanInfo] = useState({});
  const [form, setForm] = useState({});

  useEffect(() => {
    const promise = getPlan(config, planId);
    promise.then((res) => {
      setPlanInfo(res.data);
      console.log(planInfo);
    });
    promise.catch((err) => console.log("erro na requisição do plano"));
  }, []);
  function handleForm({ value, name }) {
    console.log(value, name);
    setForm({
      ...form,
      [name]: value,
    });
  }
  return (
    <Wrapper>
      {planInfo.image ? (
        <>
          <PlanLogo>
            <img src={planInfo.image} alt="Plan Logo" />
            <p>{planInfo.name}</p>
          </PlanLogo>
          <PlanInformationsContainer>
            <div>
              <img src={listIcon} alt="List Icon" />
              <span>Benefícios:</span>
              <ul>
                {planInfo.perks.map((value) => (
                  <li>{value.title}</li>
                ))}
              </ul>
              <img src={priceIcon} alt="Price Icon" />
              <span>Preço:</span>
              <p>
                R$ {planInfo.price.slice(0, 2)},{planInfo.price.slice(3, 5)}{" "}
                cobrados mensalmente
              </p>
            </div>
            <FormWrapper>
              <form onSubmit={(e) => e.preventDefault()}>
                <input
                  placeholder="Nome impresso no cartão"
                  name="cardName"
                  type="text"
                  onChange={(e) => {
                    handleForm({ name: e.target.name, value: e.target.value });
                  }}
                  required
                ></input>
                <input
                  placeholder="Dígitos do cartão"
                  name="cardNumber"
                  type="text"
                  onChange={(e) => {
                    handleForm({ name: e.target.name, value: e.target.value });
                  }}
                  required
                ></input>
                <div>
                  <input
                    placeholder="Código de segurança"
                    name="securityNumber"
                    type="number"
                    onChange={(e) => {
                      handleForm({
                        name: e.target.name,
                        value: e.target.value,
                      });
                    }}
                    required
                  ></input>
                  <input
                    placeholder="Validade (MM/AA)"
                    name="expirationDate"
                    type="text"
                    onChange={(e) => {
                      handleForm({
                        name: e.target.name,
                        value: e.target.value,
                      });
                    }}
                    required
                  ></input>
                </div>
              </form>
            </FormWrapper>
          </PlanInformationsContainer>
        </>
      ) : (
        <LoadingAnimationWrapper>
          <LoadingAnimation></LoadingAnimation>
        </LoadingAnimationWrapper>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 0 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PlanLogo = styled.div`
  display: flex;
  flex-direction: column;

  img {
    margin-top: 80px;
    margin-bottom: 20px;
  }

  p {
    font-weight: 700;
    font-size: 32px;
  }
`;

const PlanInformationsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 320px;
  align-items: flex-start;
  margin-top: 20px;

  img {
    margin-right: 5px;
  }
  span {
    font-size: 16px;
  }
  p {
    font-size: 14px;
    margin: 4px 0 24px 0;
  }

  ul {
    list-style: decimal;
    margin: 10px 0;
    margin-left: 16px;
  }
  li {
    font-size: 14px;
  }
`;

const FormWrapper = styled.div`
  width: 320px;
  form {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  input {
    font-family: "Roboto", sans-serif;
    border: solid #ffffff;
    margin-bottom: 10px;
    min-height: 52px;
    border-radius: 8px;
    padding: 0 12px;
  }

  div input {
    width: 155px;
  }
  div input:nth-child(1) {
    margin-right: 10px;
    padding-right: 0px;
    padding-left: 10px;
  }

  input::placeholder {
    color: #7e7e7e;
  }

  input:focus {
    outline: none;
  }

  div {
    display: flex;
    flex-direction: row;
  }
`;
