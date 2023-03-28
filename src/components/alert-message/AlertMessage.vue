<template>
  <div class="alert-message">
    <div class="alert-message-wrapper">
      <p>
        {{
          isAdded
            ? `This currency has already added!`
            : `The currency is added!`
        }}
      </p>
      <button class="button button-close" @click="close">x</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "AlertMessage",
  props: {
    isAdded: {
      type: Boolean,
    },
  },

  methods: {
    ...mapActions(["handlerAlertMessage"]),
    close() {
      const payload = {
        showAlert: false,
      };

      this.handlerAlertMessage(payload);
    },
  },
};
</script>
