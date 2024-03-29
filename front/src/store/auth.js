/* eslint-disable no-unused-vars */
// vendor
import jwt_decode from "jwt-decode";

// cus
import AuthService from "@/service/auth";
import utils from "../lib/utils/http";

const authModule = {
  state: {
    user: null,
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    CLEAR_USER(state) {
      state.user = null;
      utils.RemoveToken();
    },
    SET_USER_OTP_ENABLED(state, otpEnabled) {
      state.user.otp_enabled = otpEnabled;
    },
    SET_USER_INFO(state, data) {
      state.user.name = data.name;
      state.user.email = data.email;
    },
  },
  getters: {
    GET_USER(state) {
      return state.user;
    },
  },
  actions: {
    // sign up
    async SIGN_UP({ commit, dispatch }, data) {
      const res = await AuthService.SignUp(data);
      return res.data;
    },

    // sign in (login)
    async SIGN_IN({ commit, dispatch }, inputData) {
      const res = await AuthService.SignIn(inputData);
      const data = res.data;
      if (!data) return false; // fail to login

      // save token
      utils.SetToken(data.access_token, data.refresh_token);
      // set user
      const user = jwt_decode(data.access_token);
      commit("SET_USER", user);
      return true;
    },

    // logout
    Logout({ commit }) {
      commit("CLEAR_USER");
    },

    // authenticate
    async AUTHENTICATE({ dispatch }) {
      await AuthService.Authenticate();
    },
    // update user's otp enabled
    async UPDATE_OTP_ENABLED({ commit, dispatch }, data) {
      await AuthService.UpdateOtpEnabled(data);
      commit("SET_USER_OTP_ENABLED", data.otp_enabled);
    },
    async UPDATE_USER_INFO({ commit, dispatch }, data) {
      await AuthService.UpdateUserInfo(data);
      commit("SET_USER_INFO", data);
      return true;
    },
    async REFRESH_ACCESS_TOKEN({ commit, dispatch }, refreshToken) {
      const res = await AuthService.RefreshAccessToken(refreshToken);
      return res.data;
    },
  },
};

export default authModule;
