import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { PlansContext } from "../contexts/PlansContext";
import { useContext, useEffect } from "react";
import { getPlans } from "../services/drivenplus";
import { UserContext } from "../contexts/UserContext";
import LoadingAnimation from "./LoadingAnimation";

export default function SubscriptionsPage() {
  const { config } = useContext(UserContext);
  const { plansdata, setPlansdata } = useContext(PlansContext);

  useEffect(() => {
    const promise = getPlans(config);
    promise.then((res) => {
      setPlansdata(res.data);
    });
    promise.catch((err) => console.log("erro na requisição dos planos"));
    console.log(plansdata);
  }, [config]);
  const navigate = useNavigate();

  function Plan({ image, planId, planPrice }) {
    return (
      <ImgWrapper onClick={() => navigate(`/subscriptions/${planId}`)}>
        <img src={image} alt="" />
        <span>
          R$ {planPrice.slice(0, 2)},{planPrice.slice(3, 5)}
        </span>
      </ImgWrapper>
    );
  }

  return (
    <Wrapper>
      {plansdata[0] ? (
        <>
          <h1>Escolha seu plano</h1>
          {plansdata.map((value) => (
            <Plan
              key={value.id}
              image={value.image}
              planId={value.id}
              planPrice={value.price}
            />
          ))}
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

  h1 {
    font-weight: 700;
    font-size: 34px;
    margin: 30px 0;
  }
`;

const ImgWrapper = styled.div`
  cursor: pointer;
  display: flex;
  width: 300px;
  height: 180px;
  border: solid 3px #7e7e7e;
  border-radius: 8px;
  margin-bottom: 12px;

  img {
    padding-left: 26px;
  }
  span {
    font-weight: 700;
    font-size: 24px;
    padding: 76px 0 0 16px;
  }
`;

const LoadingAnimationWrapper = styled.div`
  margin-top: calc(50vh - 50px);
`;

export { LoadingAnimationWrapper };
