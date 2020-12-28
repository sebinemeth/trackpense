<template>
  <div class="home">
    <b-container class="mt-4">
      <h4>User information</h4>
      <b-card class="my-3">
        <b-media>
          <template #aside>
            <b-avatar :src="user.photoUrl" />
          </template>

          <h5 class="mt-0">{{ user.name || "anonymus" }}</h5>
          <p class="mb-0">
            {{ user.email }}
            <b-icon-check-circle-fill
              v-if="user.emailVerified"
              variant="success"
            />
            <template v-else>
              <b-icon-exclamation-circle-fill variant="danger" /><br />
              <!--<b-link @click="verifyEmail">
                Email cím igazolása
              </b-link>-->
            </template>
          </p>
        </b-media>
      </b-card>
      <h4>Balance</h4>
      <b-card class="my-3"> </b-card>

      <h4>Recent activity</h4>

      <div class="d-flex justify-content-between">
        <b-button v-b-modal.addExpense
          ><b-icon-file-minus /> Add expense</b-button
        >
        <b-button v-b-modal.addIncome><b-icon-file-plus /> Add income</b-button>
      </div>

      <b-modal id="addExpense" title="Add expense">
        <add-entry :income="false"></add-entry>
      </b-modal>

      <b-modal id="addIncome" title="Add income">
        <add-entry :income="true"></add-entry>
      </b-modal>

      <entry-list :listitems="listitems"></entry-list>
    </b-container>
  </div>
</template>

<script>
import firebase from "firebase";
import AddEntry from "@/components/AddEntry.vue";
import EntryList from "@/components/EntryList.vue";

export default {
  name: "Home",
  components: { AddEntry, EntryList },
  props: ["user"],
  data() {
    return { listitems: [] };
  },
  mounted() {
    const database = firebase.database();

    const ref = database.ref("users/" + this.user.uid);
    ref.on("value", (snapshot) => {
      const data = snapshot.val();
      console.log(data);
    });
  },
};
</script>
