import { PlansContext } from "../contexts/PlansContext";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import styled from "styled-components";
import userIcon from "../assets/img/userIcon.svg";
import { deletePlan } from "../services/drivenplus";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const { plansdata } = useContext(PlansContext);
  const { userdata, config } = useContext(UserContext);
  const navigate = useNavigate();
  console.log(`plansdata: ${JSON.stringify(plansdata)}`);
  console.log(`userdata: ${JSON.stringify(userdata)}`);

  function cancelPlan() {
    const promise = deletePlan(config);
    promise.then((res) => {
      console.log("plano cancelado com sucesso");
      navigate("/subscriptions");
    });
    promise.catch((err) => console.log("Erro ao tentar cancelar o plano."));
  }

  return (
    <Wrapper>
      <Header>
        <img src={plansdata.image} alt="" />
        <img
          onClick={() => navigate(`/users/${userdata.id}`)}
          src={userIcon}
          alt=""
        />
      </Header>
      <ContendContainer>
        <p>Olá, {userdata.name}</p>
        {plansdata.perks.map((value) => (
          <a key={value.id} href={value.link} target="_blank" rel="noreferrer">
            <Button key={value.id}>{value.title}</Button>
          </a>
        ))}
      </ContendContainer>
      <FooterContainer>
        <Button onClick={() => navigate("/subscriptions")}>Mudar Plano</Button>
        <Button onClick={cancelPlan}>Cancelar</Button>
      </FooterContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 0 38px;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    position: fixed;
  }
  img:nth-child(1) {
    width: 75px;
    height: 50px;
    top: 32px;
    left: 38px;
  }
  img:nth-child(2) {
    top: 22px;
    right: 22px;
    cursor: pointer;
  }
`;

const Header = styled.div`
  display: flex;
`;

const ContendContainer = styled.div`
  width: 300px;
  text-align: center;
  margin-top: 100px;

  p {
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
    margin-bottom: 52px;
  }
`;

const Button = styled.button`
  width: 100%;
  height: 52px;
  border: solid #ff4791;
  border-radius: 8px;
  background-color: #ff4791;
  margin-bottom: 10px;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  color: #ffffff;
  cursor: pointer;
`;

const FooterContainer = styled.div`
  width: 300px;
  position: fixed;
  bottom: 30px;

  button:nth-child(2) {
    background-color: #ff4747;
    border: solid #ff4747;
  }
`;
