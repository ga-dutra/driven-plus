import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../contexts/UserContext";
import { PlansContext } from "../contexts/PlansContext";
import { getPlan, postSubscriptionPlan } from "../services/drivenplus";
import LoadingAnimation from "./LoadingAnimation";
import { LoadingAnimationWrapper } from "./SubscriptionsPage";
import listIcon from "../assets/img/listIcon.svg";
import priceIcon from "../assets/img/priceIcon.svg";
import closeIcon from "../assets/img/closeIcon.svg";

export default function PlanSigningPage() {
  const { config } = useContext(UserContext);
  const { setPlansdata } = useContext(PlansContext);
  const planId = useParams().planId;
  const [planInfo, setPlanInfo] = useState({});
  const [form, setForm] = useState({});
  const [confirmButton, setConfirmButton] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const promise = getPlan(config, planId);
    promise.then((res) => {
      setPlanInfo(res.data);
      setForm({ ...form, membershipId: Number(planId) });
    });
    promise.catch((err) => console.log("erro na requisição do plano"));
  }, []);

  function handleForm({ value, name }) {
    setForm({
      ...form,
      [name]: value,
    });
  }
  function showConfirmationButton() {
    setConfirmButton(true);
  }

  function sendForm() {
    const body = { ...form };
    const promise = postSubscriptionPlan(body, config);
    promise.then((res) => {
      setPlansdata(res.data.membership);
      navigate("/home");
    });
    promise.catch((err) => {
      console.log("Erro ao assinar plano");
      alert(
        "Houve um erro ao completar a assinatura do plano. Por favor, revise seus dados e tente novamente."
      );
      setConfirmButton(false);
    });
  }

  return (
    <>
      <Wrapper clicked={confirmButton}>
        {planInfo.image ? (
          <>
            <ion-icon
              onClick={() => navigate("/subscriptions")}
              name="arrow-back-outline"
            ></ion-icon>
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
                    <li key={value.id}>{value.title}</li>
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
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    showConfirmationButton();
                  }}
                >
                  <input
                    placeholder="Nome impresso no cartão"
                    name="cardName"
                    type="text"
                    onChange={(e) => {
                      handleForm({
                        name: e.target.name,
                        value: e.target.value,
                      });
                    }}
                    required
                  ></input>
                  <input
                    placeholder="Dígitos do cartão"
                    name="cardNumber"
                    type="text"
                    onChange={(e) => {
                      handleForm({
                        name: e.target.name,
                        value: e.target.value,
                      });
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
                          value: Number(e.target.value),
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
                  <button>ASSINAR</button>
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
      {confirmButton ? (
        <ConfirmPurchaseContainer>
          <img onClick={() => setConfirmButton(false)} src={closeIcon} alt="" />
          <p>
            Tem certeza de que deseja assinar o plano {planInfo.name} (R$
            {planInfo.price.slice(0, 2)},{planInfo.price.slice(3, 5)})?
          </p>
          <div>
            <div onClick={() => setConfirmButton(false)}>Não</div>
            <div onClick={sendForm}>Sim</div>
          </div>
        </ConfirmPurchaseContainer>
      ) : (
        ""
      )}
    </>
  );
}

const Wrapper = styled.div`
  pointer-events: ${(props) => (props.clicked ? "none" : "inherit")};
  opacity: ${(props) => (props.clicked ? "0.4" : "1")};
  margin: 0 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  ion-icon {
    position: fixed;
    left: 20px;
    top: 20px;
    font-size: 32px;
    cursor: pointer;
  }
`;

const PlanLogo = styled.div`
  display: flex;
  flex-direction: column;

  img {
    margin-top: 80px;
    margin-bottom: 20px;
    width: 140px;
    height: 96px;
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
  margin-top: 30px;

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
    margin-bottom: 20px;
  }
  li {
    font-size: 14px;
    padding: 2px 0;
  }
`;

const FormWrapper = styled.div`
  width: 320px;
  form {
    margin-top: 10px;
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

  button {
    height: 52px;
    border: solid #ff4791;
    border-radius: 8px;
    background-color: #ff4791;
    font-weight: 700;
    font-size: 14px;
    line-height: 16px;
    color: #ffffff;
    cursor: pointer;
  }
`;

const ConfirmPurchaseContainer = styled.div`
  position: fixed;
  top: calc(50vh - 210px);
  left: calc(50vw - 125px);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 250px;
  height: 210px;
  background-color: #ffffff;
  border-radius: 12px;

  img {
    cursor: pointer;
    position: fixed;
    top: 20px;
    right: 20px;
  }

  > div {
    display: flex;
  }

  p {
    text-align: center;
    width: 205px;
    padding: 26px 10px;
    color: #000000;
    font-size: 20px;
    line-height: 22px;
    font-weight: 700;
  }
  div div {
    cursor: pointer;
    width: 96px;
    height: 52px;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    color: #ffffff;
  }
  div div:nth-child(1) {
    background-color: #cecece;
    margin-right: 10px;
  }
  div div:nth-child(2) {
    background-color: #ff4791;
  }
`;
