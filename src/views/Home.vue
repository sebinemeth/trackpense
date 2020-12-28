<template>
  <div class="home">
    <h2>Welcome</h2>
    <a @click="logout">Log out</a>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "Home",
  components: {},
  methods: {
    async logout() {
      await firebase.auth().signOut();
      this.$router.replace("login");
    },
  },
};
</script>
