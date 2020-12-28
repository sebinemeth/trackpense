<template>
  <div id="app">
    <div id="nav">
      <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand href="#">TrackPense</b-navbar-brand>
        <b-navbar-nav class="ml-auto">
          <b-button @click="logout" variant="dark">Logout</b-button>
        </b-navbar-nav>
      </b-navbar>
    </div>
    <router-view :user="user" />
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "App",
  data() {
    return { user: {} };
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      this.user = user
        ? {
            name: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
            emailVerified: user.emailVerified,
            uid: user.uid,
          }
        : {};
    });
  },
  methods: {
    async logout() {
      await firebase.auth().signOut();
      this.$router.replace("login");
    },
  },
};
</script>

<style lang="scss"></style>
