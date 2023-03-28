<template>
  <header class="header-container">
    <h1 class="title">.qmpwwsd Converter</h1>
    <div class="button-wrapper">
      <button class="button button-popup" @click="show">Add Currency</button>
      <span class="current-date">Current Date: {{ currentDate }}</span>
      <button class="button button-update" @click="update">Update Rates</button>
    </div>

    <!-- <teleport to="body"> -->
    <div class="preload-wrapper" v-if="showPreload">
      <icon-preloader />
    </div>
    <!-- </teleport> -->
  </header>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import dateBuilder from "@/utils/dateBuilder";
import IconPreloader from "../icons/IconPreloader.vue";
export default {
  components: { IconPreloader },
  name: "HeaderContainer",

  data() {
    return {
      isUpdated: false,
      showPreload: false,
    };
  },

  computed: {
    ...mapGetters(["getCurrentCurrency"]),
    currentDate() {
      return dateBuilder(true);
    },
  },

  methods: {
    ...mapActions(["handlerAddPopup", "GET_API_DATA"]),

    show() {
      const payload = {
        isPopupShowing: true,
      };

      document.documentElement.classList.add("hidden");

      this.handlerAddPopup(payload);
    },

    update() {
      if (!this.isUpdated) {
        this.GET_API_DATA();
        this.showPreload = true;
        this.isUpdated = true;
        setTimeout(() => {
          this.showPreload = false;
        }, 300);
        setTimeout(() => {
          this.isUpdated = false;
        }, 5000);
      }
    },
  },
};
</script>
