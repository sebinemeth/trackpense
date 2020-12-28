<template>
  <div class="signup">
    <b-row class="justify-content-center">
      <b-col cols="10" sm="6">
        <b-card class="mt-4">
          <h3>Sign up</h3>
          <b-form>
            <b-form-input
              class="mt-3"
              v-model="email"
              type="text"
              placeholder="email"
            />
            <b-form-input
              class="mt-3"
              v-model="password"
              type="password"
              placeholder="password"
            />
            <div class="mt-3 d-flex justify-content-between">
              <b-button @click="signup">Sign up</b-button>
            </div>
            <div class="mt-3">
              Already have an account? <router-link to="/login">Sign in</router-link>
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
    async signup() {
      try {
        await firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password);
        this.$router.replace("home");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
