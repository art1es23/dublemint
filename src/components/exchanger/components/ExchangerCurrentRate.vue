<template>
  <span class="exchanger-current-rate"
    >1 {{ inputCaption }} =
    {{ currentRate }}
    {{ outputCaption }}</span
  >
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ExchangerCurrentRate",
  props: {
    purpose: {
      type: String,
    },
  },
  computed: {
    ...mapGetters([
      "getInputCurrency",
      "getOutputCurrency",
      "getCurrentCurrency",
    ]),

    inputCaption() {
      return this.purpose === "input"
        ? this.getInputCurrency
        : this.getOutputCurrency;
    },

    outputCaption() {
      return this.purpose === "input"
        ? this.getOutputCurrency
        : this.getInputCurrency;
    },

    currentRate() {
      return this.purpose === "input" &&
        ["BTC", "ETH"].includes(this.outputCaption)
        ? (+this.getCurrentCurrency.rates[this.getOutputCurrency]).toFixed(7)
        : this.purpose === "input"
        ? (+this.getCurrentCurrency.rates[this.getOutputCurrency]).toFixed(2)
        : this.purpose === "output" &&
          ["BTC", "ETH"].includes(this.outputCaption)
        ? (1 / this.getCurrentCurrency.rates[this.getOutputCurrency]).toFixed(7)
        : (1 / this.getCurrentCurrency.rates[this.getOutputCurrency]).toFixed(
            2
          );
    },
  },
};
</script>

<style></style>
