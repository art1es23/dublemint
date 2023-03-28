export default {
  SET_CURRENT_CURRENCY: (
    state,
    { res: { data }, getOutputCurrency, getInactiveListCurrencies }
  ) => {
    if (!state.inactiveList.selected) {
      state.inactiveList.selected = data;
    }
    if (getInactiveListCurrencies.isInactive) {
      state.inactiveList.selected = data;
    } else {
      state.CURRENT_CURRENCY = data;
    }
    state.exchanger.outputAmount = data.rates[getOutputCurrency];
  },

  SET_LIST_CURRENCIES: (state, { data }) => {
    state.addedPopup.allCurrencies = data;
  },

  setCurrency: (
    { exchanger, inactiveList },
    { currency, handler, isInactive, isExchanger }
  ) => {
    inactiveList.isInactive = isInactive;
    exchanger.isExchanger = isExchanger;
    if (handler === "output") {
      exchanger.outputCurrency = currency;
    } else {
      exchanger.inputCurrency = currency;
    }
  },

  setAmount: ({ exchanger }, { amountValue, handler }) => {
    if (handler === "output") {
      exchanger.outputAmount = +amountValue;
      exchanger.isOutput = true;
    } else {
      exchanger.inputAmount = +amountValue;
      exchanger.isOutput = false;
    }
  },
  swapCurrencies: ({ exchanger }, { getInputAmount, getOutputAmount }) => {
    [exchanger.inputCurrency, exchanger.outputCurrency] = [
      exchanger.outputCurrency,
      exchanger.inputCurrency,
    ];

    [exchanger.inputAmount, exchanger.outputAmount] = [
      getOutputAmount,
      getInputAmount,
    ];
  },

  changeStateAddPopup: ({ addedPopup }, { isPopupShowing }) => {
    addedPopup.isPopupShowing = isPopupShowing;
  },

  setSearchValue: ({ addedPopup }, { searchValue }) => {
    addedPopup.searchValue = searchValue;
  },

  setNewCurrency: (
    { CURRENCY_LIST, addedPopup },
    { newCurrency, isPopupShowing, searchValue, showAlert }
  ) => {
    if (!CURRENCY_LIST.captions.includes(newCurrency)) {
      CURRENCY_LIST.captions.push(newCurrency);
      addedPopup.isAdded = false;
    } else {
      addedPopup.isAdded = true;
    }
    addedPopup.isPopupShowing = isPopupShowing;
    addedPopup.searchValue = searchValue;
    addedPopup.showAlert = showAlert;
  },

  changeInactiveCurrency: (
    { inactiveList, exchanger },
    { selectedCurrency, isInactive, isExchanger }
  ) => {
    inactiveList.selectedCurrency = selectedCurrency;
    inactiveList.isInactive = isInactive;
    exchanger.isExchanger = isExchanger;
  },

  closeAlertMessage: ({ addedPopup }, { showAlert }) => {
    addedPopup.showAlert = showAlert;
    addedPopup.isAdded = false;
  },
};
