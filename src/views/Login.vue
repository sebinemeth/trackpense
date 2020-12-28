<template>
  <div class="login">
    <h3>Sign in</h3>
    <input v-model="email" type="text" placeholder="email" /><br />
    <input v-model="password" type="password" placeholder="password" /><br />
    <button @click="login">Sign in</button><br />
    <button @click="loginGoogle">Sign in with Google</button><br />
    <router-link to="/signup">Sign up</router-link>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "Login",
  data() {
    return {email: "", password: ""};
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
