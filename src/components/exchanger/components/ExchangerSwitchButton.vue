<template>
  <label for="switchCurrency" class="exchanger-switch-button">
    <input
      id="switchCurrency"
      type="button"
      class="exchanger-switch-input"
      @click.prevent="handlerSwitch"
    />
    <icon-switch class="exchanger-switch-icon" />
  </label>
</template>

<script>
import IconSwitch from "@/components/icons/IconSwitch.vue";
import { mapActions } from "vuex";
export default {
  components: { IconSwitch },
  name: "ExchangerSwitchButton",

  methods: {
    ...mapActions(["GET_API_DATA", "switchCurrencies"]),

    handlerSwitch() {
      this.switchCurrencies();
      this.GET_API_DATA();
    },
  },
};
</script>
