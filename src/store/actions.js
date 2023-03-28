// API_KEY = '725c09ee524d498e8f6456a0af914a61'
import axios from "axios";
const API_KEY = "725c09ee524d498e8f6456a0af914a61";
const API_URL = "https://openexchangerates.org/api/";

// new ZbIKWgflWUiztcOWcTy3pTJ24NBpkZ7X
// https://api.apilayer.com/exchangerates_data/latest?

const API_KEY_new = "ZbIKWgflWUiztcOWcTy3pTJ24NBpkZ7X";
const API_URL_new = "https://api.apilayer.com/exchangerates_data/latest";

export default {
  GET_API_DATA: async ({
    commit,
    getters: {
      getInputCurrency,
      getOutputCurrency,
      getInactiveListCurrencies,
      getExchangerProps,
    },
  }) => {
    const selectedCurrency = getInactiveListCurrencies.isInactive
      ? getInactiveListCurrencies.selectedCurrency
      : getExchangerProps.isExchanger
      ? getInputCurrency
      : "";

    const options = {
      method: "GET",
      url: `${API_URL_new}`,
      params: {
        apikey: API_KEY_new,
        base: selectedCurrency,
        format: "json",
        // symbol: "UAH",
        show_alternative: true,
        prettyprint: true,
      },
    };

    // const options = {
    //   method: "GET",
    //   url: `${API_URL}latest.json`,
    //   params: {
    //     format: "json",
    //     base: selectedCurrency,
    //     app_id: API_KEY,
    //     show_alternative: true,
    //     prettyprint: true,
    //   },
    // };

    try {
      await axios
        .request(options)
        .then((res) => {
          //   console.log(res.data);
          commit("SET_CURRENT_CURRENCY", {
            res,
            getOutputCurrency,
            getInactiveListCurrencies,
          });
        })
        .catch((err) => console.log("Error: ", err));
    } catch (error) {
      console.log(error);
    }
  },

  GET_API_CURRENCIES: async ({ commit }) => {
    const options = {
      method: "GET",
      url: `${API_URL}currencies.json`,
      params: {
        format: "json",
        app_id: API_KEY,
        show_alternative: true,
      },
    };

    await axios
      .request(options)
      .then((res) => {
        // console.log(res.data);
        commit("SET_LIST_CURRENCIES", res);
      })
      .catch((err) => console.log("Error: ", err));
  },

  chooseCurrency: ({ commit }, payload) => {
    commit("setCurrency", payload);
  },

  switchCurrencies: ({
    commit,
    getters: { getInputAmount, getOutputAmount },
  }) => {
    commit("swapCurrencies", { getInputAmount, getOutputAmount });
  },

  changeAmount: ({ commit }, payload) => {
    commit("setAmount", payload);
  },

  handlerAddPopup: ({ commit }, payload) => {
    commit("changeStateAddPopup", payload);
  },

  searchCurrency: ({ commit }, payload) => {
    commit("setSearchValue", payload);
  },

  handlerAddCurrency: ({ commit }, payload) => {
    commit("setNewCurrency", payload);
  },

  handlerInactiveCurrency: ({ commit }, payload) => {
    commit("changeInactiveCurrency", payload);
  },

  handlerAlertMessage: ({ commit }, payload) => {
    commit("closeAlertMessage", payload);
  },
};
