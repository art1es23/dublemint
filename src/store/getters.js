export default {
  // Get Currency List Captions
  getCurrencyList: ({ CURRENCY_LIST }) => {
    return CURRENCY_LIST.captions;
  },

  // Get Exchanger Properties
  getExchangerProps: ({ exchanger }) => {
    const {
      inputCurrency,
      outputCurrency,
      inputAmount,
      outputAmount,
      isOutput,
      isExchanger,
    } = exchanger;

    return {
      inputCurrency,
      outputCurrency,
      inputAmount,
      outputAmount,
      isOutput,
      isExchanger,
    };
  },

  //   Get Currency captions for exchange
  getInputCurrency: (state, { getExchangerProps }) => {
    return getExchangerProps.inputCurrency;
  },
  getOutputCurrency: (state, { getExchangerProps }) => {
    return getExchangerProps.outputCurrency;
  },

  //   Get Currency Value (Amount) for exchange
  getInputAmount: (
    state,
    { getExchangerProps, getCurrentCurrency, getOutputCurrency }
  ) => {
    return getExchangerProps.isOutput
      ? +(
          getExchangerProps.outputAmount /
          getCurrentCurrency.rates[getOutputCurrency]
        ).toFixed(2)
      : +getExchangerProps.inputAmount;
  },

  getOutputAmount: (
    state,
    { getExchangerProps, getCurrentCurrency, getOutputCurrency }
  ) => {
    return getExchangerProps.isOutput
      ? +getExchangerProps.outputAmount
      : ["BTC", "ETH"].includes(getOutputCurrency)
      ? +(
          getExchangerProps.inputAmount *
          getCurrentCurrency.rates[getOutputCurrency]
        ).toFixed(7)
      : +(
          getExchangerProps.inputAmount *
          getCurrentCurrency.rates[getOutputCurrency]
        ).toFixed(2);
  },

  //   Get Add New Currency to List Props
  getAddedPopupProperties: ({ addedPopup }) => {
    let { allCurrencies, isPopupShowing, searchValue, showAlert, isAdded } =
      addedPopup;

    searchValue = searchValue.charAt(0).toUpperCase() + searchValue.slice(1);

    allCurrencies = Object.entries(allCurrencies).map((key) => key);

    let filterList = allCurrencies.filter(
      (item) => item[1].indexOf(searchValue) > -1
    );

    return {
      allCurrencies,
      filterList,
      isPopupShowing,
      searchValue,
      showAlert,
      isAdded,
    };
  },

  //   Get data by Current selected currency
  getCurrentCurrency: ({ CURRENT_CURRENCY }) => {
    if (!CURRENT_CURRENCY) {
      return {
        base: "USD",
        rates: {
          BTC: 1,
        },
      };
    }
    const { base, rates, timestamp } = CURRENT_CURRENCY;
    return { base, rates, timestamp };
  },

  // Get Inactive List Currencies Props
  getInactiveListCurrencies: ({ inactiveList }) => {
    if (!inactiveList.selected) {
      return {};
    }
    const { captions, selectedCurrency, isInactive, selected } = inactiveList;
    return { captions, selectedCurrency, isInactive, selected };
  },
};
