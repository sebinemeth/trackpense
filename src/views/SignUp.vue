<template>
  <div class="signup">
    <h3>Sign up</h3>
    <input v-model="email" type="text" placeholder="email" /><br />
    <input v-model="password" type="password" placeholder="password" /><br />
    <button @click="signup">Sign up</button><br />
    <router-link to="/login">Back to login</router-link>
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
