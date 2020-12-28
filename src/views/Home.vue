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
        <total-balance :listitems="listitems"></total-balance>
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
import TotalBalance from "../components/TotalBalance.vue";

export default {
  name: "Home",
  components: { AddEntry, EntryList, LineChart, TotalBalance },
  props: ["user"],
  data() {
    return { listitems: [] };
  },
  computed: {
    chartData() {
      const days = {};
      for (const e of this.listitems) {
        const day = this.formatDate(e.timestamp);
        if (!days[day]) days[day] = [];
        days[day].push(e);
      }

      const income = Object.values(days).map((day) =>
        day
          .filter((e) => e.income)
          .reduce((acc, e) => acc + parseInt(e.amount), 0)
      );

      const expense = Object.values(days).map((day) =>
        day
          .filter((e) => !e.income)
          .reduce((acc, e) => acc + parseInt(e.amount), 0)
      );

      return {
        labels: Object.keys(days),
        datasets: [
          {
            label: "Income",
            backgroundColor: "#0fc0fc",
            data: income,
          },
          {
            label: "Expense",
            backgroundColor: "#f87979",
            data: expense,
          },
        ],
      };
    },
  },
  methods: {
    formatDate(date) {
      var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    },
  },
  watch: {
    user() {
      const database = firebase.database();

      const ref = database.ref("users/" + this.user.uid + "/transactions");
      ref.on("value", (snapshot) => {
        const data = snapshot.val();
        console.log(snapshot);
        this.listitems = Object.entries(data).map((entry) =>
          Object.assign(entry[1], { id: entry[0] })
        );
      });
    },
  },
};
</script>
