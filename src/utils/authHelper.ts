import jwtDecode from "jwt-decode";

const isLogin = (token: string) => {
  return !(token === "");
};

type tokenInfo = {
  id: string;
  email: string;
};

const getInfoFromToken = (token: string) => {
  try {
    const payload = jwtDecode(token);
    const result: tokenInfo = { id: payload.sub, email: payload.email };
    return result;
  } catch (error) {
    const emptyResult: tokenInfo = { id: "", email: "" };
    return emptyResult;
  }
};

const authHelper = {
  isLogin,
  getInfoFromToken
};

export default authHelper;
