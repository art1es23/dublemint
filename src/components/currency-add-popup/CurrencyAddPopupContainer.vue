<template>
  <div class="currency-add-popup">
    <div class="currency-add-popup-header">
      <button class="button button-close" @click="close">Close</button>
      <h2 class="currency-add-popup__title">
        Add new currency to exchange list
      </h2>
    </div>

    <label for="" class="currency-add-input-wrapper">
      <input
        type="text"
        placeholder="Search currency"
        @input="update"
        class="currency-add-input"
      />
    </label>

    <icon-preloader v-if="!currencyList" />
    <div class="currency-list" v-if="currencyList">
      <div
        v-for="currency in currencyList"
        :key="currency[0]"
        class="currency-list__item"
        @click="add(currency[0])"
      >
        {{ currency[1] }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import IconPreloader from "../icons/IconPreloader.vue";
export default {
  components: { IconPreloader },
  name: "CurrencyAddPopupContainer",

  computed: {
    ...mapGetters(["getAddedPopupProperties"]),

    currencyList() {
      return this.getAddedPopupProperties.filterList;
    },

    searchValue() {
      return this.getAddedPopupProperties.searchValue;
    },
  },

  methods: {
    ...mapActions(["handlerAddPopup", "searchCurrency", "handlerAddCurrency"]),
    update(event) {
      const payload = {
        searchValue: event.target.value,
      };

      this.searchCurrency(payload);
    },
    close() {
      const payload = {
        isPopupShowing: false,
      };
      document.documentElement.classList.remove("hidden");
      this.handlerAddPopup(payload);
    },
    add(newCurrency) {
      const payload = {
        newCurrency,
        isPopupShowing: false,
        searchValue: "",
        showAlert: true,
      };

      document.documentElement.classList.remove("hidden");
      this.handlerAddCurrency(payload);
    },
  },
};
</script>

<style></style>
