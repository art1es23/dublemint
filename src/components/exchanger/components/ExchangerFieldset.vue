<template>
  <fieldset class="exchanger__item" :class="purposeClass">
    <label :for="purpose === 'input' ? 'inputCurrency' : 'outputCurrency'">
      <span>{{ purpose === "input" ? "I have" : "I want" }}</span>
      <input
        type="number"
        @input="
          onChangeAmount($event, purpose === 'input' ? 'input' : 'output')
        "
        v-model="currentValue"
        max="10000"
      />
    </label>
    <!-- Current Rate -->
    <exchanger-current-rate :purpose="purpose" />

    <select
      :name="
        purpose === 'input' ? 'selectInputCurrency' : 'selectOutputCurrency'
      "
      @change="
        handlerCurrency($event, purpose === 'input' ? 'input' : 'output')
      "
      v-model="selectedCurrency"
    >
      <option
        v-for="currency in getCurrencyList"
        :key="currency"
        :value="currency"
      >
        {{ currency }}
      </option>
    </select>
  </fieldset>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ExchangerCurrentRate from "./ExchangerCurrentRate.vue";
export default {
  components: { ExchangerCurrentRate },
  name: "ExchangerFieldset",
  props: {
    purpose: {
      type: String,
    },
  },

  computed: {
    ...mapGetters({
      getCurrencyList: "getCurrencyList",
      getInputAmount: "getInputAmount",
      inputCurrency: "getInputCurrency",

      getOutputAmount: "getOutputAmount",
      outputCurrency: "getOutputCurrency",
    }),

    getInputCurrency: {
      get() {
        return this.inputCurrency;
      },
      set(currency) {
        return currency;
      },
    },

    getOutputCurrency: {
      get() {
        return this.outputCurrency;
      },
      set(currency) {
        return currency;
      },
    },

    selectedCurrency: {
      get() {
        return this.purpose === "input"
          ? this.getInputCurrency
          : this.getOutputCurrency;
      },

      set(currency) {
        return currency;
      },
    },

    purposeClass() {
      return this.purpose === "input" ? "exchanger-input" : "exchanger-output";
    },

    currentValue: {
      get() {
        return this.purpose === "input"
          ? this.getInputAmount
          : this.getOutputAmount;
      },

      set(newValue) {
        return newValue;
      },
    },
  },

  methods: {
    ...mapActions(["GET_API_DATA", "chooseCurrency", "changeAmount"]),

    handlerCurrency(event, handler) {
      const currency = event.target.value;
      const payload = {
        currency,
        handler,
        isInactive: false,
        isExchanger: true,
      };
      this.chooseCurrency(payload);
      this.GET_API_DATA();
    },

    onChangeAmount(event, handler) {
      if (event.target.max)
        event.target.value = Math.min(
          (+event.target.max).toFixed(2),
          (+event.target.value).toFixed(2) || 1
        );

      let amountValue = event.target.value;

      console.log("am: ", amountValue);
      const payload = {
        amountValue,
        handler,
      };
      this.changeAmount(payload);
    },
  },
};
</script>
