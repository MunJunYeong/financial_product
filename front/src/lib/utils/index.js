import axios from "@/lib/axios";
import store from "@/store";

const unauthorizedMsg = "토큰이 만료 되었습니다. 다시 로그인 해주세요.";

const POST = async (url, payload) => {
  const token = localStorage.getItem("access_token");
  try {
    return await axios.post(url, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err) {
    if (err.response && err.response.status === 401) {
      store.dispatch("HANDLE_AUTH_ERROR", Error(unauthorizedMsg));
    }
    throw err;
  }
};

const GET = async (url) => {
  const token = localStorage.getItem("access_token");
  try {
    return await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err) {
    if (err.response && err.response.status === 401) {
      store.dispatch("HANDLE_AUTH_ERROR", Error(unauthorizedMsg));
    }
    throw err;
  }
};

const SetToken = (accessToken, refreshToken) => {
  localStorage.setItem("access_token", accessToken);
  localStorage.setItem("refresh_token", refreshToken);
};

const RemoveToken = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};

export default {
  POST,
  GET,
  SetToken,
  RemoveToken,
};
