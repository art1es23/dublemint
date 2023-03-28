<template>
  <section class="inactive-currencies">
    <div
      class="inactive-currencies__item inactive-currency"
      v-for="currency in inactiveList"
      :key="currency"
      @click="handlerCurrency(currency)"
    >
      <span class="inactive-currency__caption">{{ currency }}</span>
      <span class="inactive-currency__timestamp">{{ currentDate }}</span>
      <div class="rates-container" v-if="selectedCurrency === currency">
        <div
          class="rates-container__item rate"
          v-for="rate in filteredCurrencies"
          :key="rate"
        >
          <span class="rate__caption">{{ rate }}</span>
          <span class="rate__value">{{
            ["BTC", "ETH"].includes(rate)
              ? (+getInactiveListCurrencies.selected.rates[rate]).toFixed(7)
              : (+getInactiveListCurrencies.selected.rates[rate]).toFixed(2)
          }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import dateBuilder from "@/utils/dateBuilder";

export default {
  name: "InactiveCurrenciesContainer",

  computed: {
    ...mapGetters([
      "getCurrencyList",
      "getCurrentCurrency",
      "getInputCurrency",
      "getInactiveListCurrencies",
    ]),

    selectedCurrency() {
      return this.getInactiveListCurrencies.selectedCurrency;
    },

    inactiveList() {
      return this.getInactiveListCurrencies.captions;
    },

    filteredCurrencies() {
      return this.getCurrencyList.filter((item) => {
        return item !== this.selectedCurrency;
      });
    },

    currentDate() {
      return dateBuilder();
    },
  },

  methods: {
    ...mapActions(["GET_API_DATA", "handlerInactiveCurrency"]),
    handlerCurrency(currentCurrency) {
      const payload = {
        selectedCurrency: currentCurrency,
        isInactive: true,
        isExchanger: false,
      };

      this.handlerInactiveCurrency(payload);
      this.GET_API_DATA();
    },
  },
};
</script>
