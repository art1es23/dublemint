<template>
  <section class="exchanger-container">
    <form action="" id="exchanger" class="exchanger">
      <!-- Input -->
      <exchanger-fieldset purpose="input" />

      <!-- Current Rate -->
      <!-- <exchanger-current-rate /> -->

      <!-- Switch Button -->
      <exchanger-switch-button />

      <!-- Output -->
      <exchanger-fieldset purpose="output" />
    </form>
  </section>
</template>

<script>
// import ExchangerCurrentRate from "./components/ExchangerCurrentRate.vue";
import ExchangerFieldset from "./components/ExchangerFieldset.vue";
import ExchangerSwitchButton from "./components/ExchangerSwitchButton.vue";
export default {
  components: {
    ExchangerSwitchButton,
    // ExchangerCurrentRate,
    ExchangerFieldset,
  },
  name: "ExchangerContainer",
};
</script>
