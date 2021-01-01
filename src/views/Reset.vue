<template>
  <div class="reset">
    <b-row class="justify-content-center">
      <b-col cols="10" sm="6">
        <b-card class="mt-4">
          <h3>Reset password</h3>
          <b-form>
            <b-form-input
              class="mt-3"
              v-model="email"
              type="text"
              placeholder="email"
            />
            <div class="mt-3 d-flex justify-content-between">
              <b-button @click="sendEmail">Send link</b-button>
            </div>
            <div class="mt-3">
              Back to <router-link to="/login">Sign in</router-link>
            </div>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "SignUp",
  data() {
    return { email: "", password: "" };
  },
  methods: {
    async sendEmail() {
      try {
        await firebase.auth().sendPasswordResetEmail(this.email);
        this.$bvToast.toast(`Email sent to ${this.email}`, {
          title: `Success`,
          variant: "success",
          solid: true,
        });
        console.log(`Email sent to ${this.email}`);
      } catch (error) {
        this.$bvToast.toast(error.message, {
          title: `Fail`,
          variant: "danger",
          solid: true,
        });
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
