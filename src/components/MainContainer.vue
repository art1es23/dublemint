<template>
  <div class="main-container">
    <header-container />

    <!-- Exchanger -->
    <icon-preloader v-if="!getCurrentCurrency || getCurrentCurrency === {}" />
    <exchanger-container v-if="getCurrentCurrency" />

    <!-- Inactive List -->
    <inactive-currencies-container />

    <!-- Add Form Popup -->
    <currency-add-popup-container
      v-if="getAddedPopupProperties.isPopupShowing"
    />

    <alert-message
      :isAdded="getAddedPopupProperties.isAdded"
      v-if="getAddedPopupProperties.showAlert"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AlertMessage from "./alert-message/AlertMessage.vue";
import CurrencyAddPopupContainer from "./currency-add-popup/CurrencyAddPopupContainer.vue";
import ExchangerContainer from "./exchanger/ExchangerContainer.vue";
import HeaderContainer from "./header/HeaderContainer.vue";
import IconPreloader from "./icons/IconPreloader.vue";
import InactiveCurrenciesContainer from "./inactive-currencies/InactiveCurrenciesContainer.vue";
export default {
  name: "MainContainer",
  components: {
    ExchangerContainer,
    InactiveCurrenciesContainer,
    HeaderContainer,
    CurrencyAddPopupContainer,
    IconPreloader,
    AlertMessage,
  },

  computed: {
    ...mapGetters(["getAddedPopupProperties", "getCurrentCurrency"]),
  },

  methods: {
    ...mapActions(["GET_API_DATA", "GET_API_CURRENCIES"]),
  },
  mounted() {
    this.GET_API_DATA();
    this.GET_API_CURRENCIES();
  },
};
</script>

<style></style>
