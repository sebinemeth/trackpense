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
      <b-card class="my-3">
        <line-chart :chart-data="chartData"></line-chart>
      </b-card>

      <h4>Recent activity</h4>

      <div class="d-flex justify-content-between">
        <b-button v-b-modal.addExpense>
          <b-icon-file-minus /> Add expense
        </b-button>
        <b-button v-b-modal.addIncome>
          <b-icon-file-plus /> Add income
        </b-button>
      </div>

      <b-modal id="addExpense" title="Add expense" hide-footer>
        <add-entry :income="false" :user="user"></add-entry>
      </b-modal>

      <b-modal id="addIncome" title="Add income" hide-footer>
        <add-entry :income="true" :user="user"></add-entry>
      </b-modal>

      <entry-list :listitems="listitems" class="mt-3"></entry-list>
    </b-container>
  </div>
</template>

<script>
import firebase from "firebase";
import AddEntry from "@/components/AddEntry.vue";
import EntryList from "@/components/EntryList.vue";
import LineChart from "@/components/LineChart.js";

export default {
  name: "Home",
  components: { AddEntry, EntryList, LineChart },
  props: ["user"],
  data() {
    return { listitems: [] };
  },
  computed: {
    chartData() {
      return {
        labels: this.listitems.map((item) =>
          new Date(item.timestamp).toLocaleString()
        ),
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#f87979",
            data: this.listitems.map(
              (item) => item.amount * (item.income ? 1 : -1)
            ),
          },
        ],
      };
    },
  },
  mounted() {
    const database = firebase.database();

    console.log(this.user.uid);

    const ref = database.ref("users/" + this.user.uid + "/transactions");
    ref.on("value", (snapshot) => {
      const data = snapshot.val();
      if(snapshot)
        this.listitems = Object.entries(data).map((entry) =>
          Object.assign(entry[1], { id: entry[0] })
        );
    });
  },
};
</script>
