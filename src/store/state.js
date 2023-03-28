export default {
  CURRENCY_LIST: {
    captions: localStorage.getItem("CURRENCY_LIST")
      ? JSON.parse(localStorage.getItem("CURRENCY_LIST"))
      : ["USD", "EUR", "UAH", "GBP", "BTC", "ETH", "DASH", "XRP"],
  },

  inactiveList: {
    captions: ["USD", "EUR", "UAH"],
    selectedCurrency: "USD",
    isInactive: false,
    selected: null,
  },

  addedPopup: {
    allCurrencies: {},
    isPopupShowing: false,
    searchValue: "",
    showAlert: false,
    isAdded: false,
  },

  CURRENT_CURRENCY: null,

  exchanger: {
    inputCurrency: "USD",
    outputCurrency: "BTC",
    inputAmount: 1,
    outputAmount: 1,
    isOutput: false,
    isExchanger: true,
  },
};
