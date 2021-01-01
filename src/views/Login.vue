<template>
  <div class="login">
    <b-row class="justify-content-center">
      <b-col cols="10" sm="6">
        <b-card class="mt-4">
          <h3>Sign in</h3>
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
              <b-button @click="login">Sign in</b-button>
              <b-button @click="loginGoogle" variant="danger">Google</b-button>
            </div>
            <div class="mt-3">
              Don't have an account? <router-link to="/signup">Sign up</router-link>
            </div>
            <div class="mt-3">
              <router-link to="/reset">Forgot password?</router-link>
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
  name: "Login",
  data() {
    return { email: "", password: "" };
  },
  methods: {
    async login(event, provider = null) {
      try {
        if (!provider)
          await firebase
            .auth()
            .signInWithEmailAndPassword(this.email, this.password);
        else await firebase.auth().signInWithPopup(provider);
        this.$router.replace("home");
      } catch (error) {
        console.log(error);
      }
    },
    loginGoogle() {
      this.login(null, new firebase.auth.GoogleAuthProvider());
    },
  },
};
</script>

<style lang="scss" scoped></style>
