// vendor
import moment from "moment";

// cus
import utils from "../lib/utils/http"

// preset
const url = process.env.VUE_APP_AUTH_PROD_URL + "/user-prod";

/**
 * Save user's product
 * @param {Object} data
 * @param {string} data.name // 없을 수도 있음.
 * @param {string} data.startDate
 * @param {number} data.period
 * @param {number} data.price
 * @param {number} data.rate
 * @param {number} data.totalInterest
 * @param {boolean} data.isSimple
 * @param {string} data.type
 * @param {number} data.userIdx
 */
// TODO: change function name
const SaveProductAfterCalc = async (data) => {
  const finishDate = moment(data.startDate)
    .add(data.period, "months")
    .format("YYYY-MM-DD");
  data.name = data.name || "N/A";

  console.log(data)
  try {
    const res = await utils.POST(`${url}/user-prod/${data.userIdx}`, {
      name: data.name,
      start_date: data.startDate,
      finish_date: finishDate,
      period: data.period,
      monthly_payment: data.price,
      rate: data.rate,
      is_simple: data.isSimple,
      total_interest: data.totalInterest,
      type: data.type,
    });
    return res;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

/**
 * Get user's prdoucts
 * @param {number} userIdx
 */
const GetUserProducts = async (userIdx) => {
  try {
    const res = await utils.GET(`${url}/${userIdx}`, {});
    return res;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

/**
 * Get user's prdoucts
 * @param {number} userIdx
 * @param {number} productIdx
 */
const GetUserProduct = async (userIdx, productIdx) => {
  try {
    const res = await utils.GET(
      `${url}/${Number(userIdx)}/prod/${Number(productIdx)}`
    );
    return res;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// get detail installments by product code
const UpdateUserProduct = async (name, userIdx, productIdx) => {
  try {
    const res = await utils.UPDATE(
      `${url}/${userIdx}/prod/${productIdx}`,
      {
        name: name,
      }
    );
    return res;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default {
  SaveProductAfterCalc,
  GetUserProducts,
  GetUserProduct,
  UpdateUserProduct,
};
