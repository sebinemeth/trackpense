<template>
  <div class="root">
    <label for="amount">Amount</label>
      <b-form-input v-model="amount" type="number" id="amount" min="0" oninput="validity.valid||(value='');"></b-form-input>
    <label for="description">Description</label>
    <div v-if="income">
      <b-form-input
        v-model="description"
        type="text"
        id="description"
        placeholder="salary"
      ></b-form-input>
    </div>
    <div v-else>
      <b-form-input
        v-model="description"
        type="text"
        id="description"
        placeholder="Bread"
      ></b-form-input>
    </div>
    <div>
      <label for="example-datepicker">Date</label>
      <b-form-datepicker
        id="example-datepicker"
        v-model="date"
        class="mb-2"
      ></b-form-datepicker>
    </div>
    <div class="d-flex justify-content-between">
      <b-button @click="addEntry">{{
        this.transaction ? "Save" : "Add"
      }}</b-button>
      <div v-if=this.transaction>
        <b-button @click="deleteEntry" variant="danger">{{"Delete"}}</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import moment from "moment";

export default {
  name: "AddEntry",
  props: {
    income: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Object,
    },
    transaction: {
      type: Object,
    },
  },
  data() {
    return {
      amount: 0,
      description: "",
      date:
        new Date().getFullYear() +
        "-" +
        (new Date().getMonth() + 1) +
        "-" +
        new Date().getDate(),
    };
  },
  mounted() {
    if (this.transaction) {
      this.amount = this.transaction.amount;
      this.description = this.transaction.description;
      var dt = new Date(this.transaction.timestamp);
      this.date =
        dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate();
    }
  },
  methods: {
    addEntry() {
      var newTransRef = undefined;
      let transactionsPath = "users/" + this.user.uid + "/transactions";
      if (this.transaction) {
        newTransRef = firebase
          .database()
          .ref(transactionsPath + "/" + this.transaction.id);
      } else {
        var transactions = firebase.database().ref(transactionsPath);
        newTransRef = transactions.push();
      }

      var momentDate = moment(this.date, "YYYY-MM-DD");
      var jsDate = momentDate.toDate();

      newTransRef.set({
        income: this.income,
        amount: this.amount,
        description: this.description,
        timestamp: jsDate.getTime(),
      });
      this.$bvModal.hide("addExpense");
      this.$bvModal.hide("addIncome");
      this.$bvModal.hide("editExpense");
      this.$bvModal.hide("editIncome");
    },
    deleteEntry() {
      let transactionsPath = "users/" + this.user.uid + "/transactions";

      var newTransRef = firebase
        .database()
        .ref(transactionsPath + "/" + this.transaction.id);

      newTransRef.remove();

      this.$bvModal.hide("addExpense");
      this.$bvModal.hide("addIncome");
      this.$bvModal.hide("editExpense");
      this.$bvModal.hide("editIncome");
    },
  },
};
</script>
