import axios from "axios";

const base_url = "https://mock-api.driven.com.br/api/v4/driven-plus";

function postLogin(body) {
  const promise = axios.post(`${base_url}/auth/login`, body);
  return promise;
}

function postSignUp(body) {
  const promise = axios.post(`${base_url}/auth/sign-up`, body);
  return promise;
}

function getPlans(config) {
  const promise = axios.get(`${base_url}/subscriptions/memberships`, config);
  return promise;
}

function getPlan(config, planId) {
  const promise = axios.get(
    `${base_url}/subscriptions/memberships/${planId}`,
    config
  );
  return promise;
}

function postSubscriptionPlan(body, config) {
  const promise = axios.post(`${base_url}/subscriptions/`, body, config);
  return promise;
}

function postChangePlan(body, config) {
  const promise = axios.post(`${base_url}/subscriptions`, body, config);
  return promise;
}

function deletePlan(config) {
  const promise = axios.delete(`${base_url}/subscriptions`, config);
  return promise;
}

function putChangeUser(body, config) {
  const promise = axios.put(`${base_url}/users/`, body, config);
  return promise;
}

export {
  postLogin,
  postSignUp,
  getPlans,
  getPlan,
  postSubscriptionPlan,
  postChangePlan,
  deletePlan,
  putChangeUser,
};
