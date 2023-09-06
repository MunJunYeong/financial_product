/* eslint-disable no-unused-vars */

// cus
import { openDialog } from "@/lib/defines";
import CalcService from "@/service/calc";

const calcModule = {
  state: {},
  mutations: {},
  getters: {},
  actions: {
    // 정기 적금 및 예금 계산 (data의 type으로 예*적금 분리)
    async CALC_REG_SAVINGS_DEPOSIT({ dispatch }, data) {
      try {
        const res = await CalcService.CalcRegSavingsDeposit(data);
        return res.data.tax;
      } catch (err) {
        dispatch(openDialog, err.message, { root: true });
        throw false;
      }
    },
  },
};

export default calcModule;
