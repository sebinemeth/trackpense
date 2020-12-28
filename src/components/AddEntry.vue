<template>
  <div class="root">
    <div v-if="income">
      <label for="amount">Amount</label>
      <b-form-input v-model=amount type="number" id="amount"></b-form-input>

      <label for="description">Description</label>
      <b-form-input v-model=description type="text" id="description" placeholder="salary"></b-form-input>
    </div>
    <div v-else>
      <label for="amount">Amount</label>
      <b-form-input v-model=amount type="number" id="amount"></b-form-input>

      <label for="description">Description</label>
      <b-form-input v-model=description type="text" id="description" placeholder="Bread"></b-form-input>
    </div>
    <div>
      <label for="example-datepicker">Date</label>
      <b-form-datepicker id="example-datepicker" v-model="date" class="mb-2" ></b-form-datepicker>
    </div>
    <b-button @click="addEntry">Add</b-button>
  </div>
</template>

<script>

import firebase from 'firebase';
import moment from 'moment';

export default {
  name: "AddEntry",
  props: {
    income: {
      type: Boolean,
      default: false
    },
    user: {
      type: Object
    }
  },
  data() {
    return {
      amount: 0,
      description: "",
      date: new Date().getFullYear() + "-" + (new Date().getMonth()+1) + "-" +  new Date().getDate(),
      transId: ""
    };
  },
  methods: {
    addEntry() {
      var newTransRef = undefined
      let transactionsPath = 'users/' + this.user.uid + '/transactions'
      if (this.transId) {
        newTransRef = firebase.database().ref(transactionsPath + '/' + this.transId); 
      } else {
        var transactions = firebase.database().ref(transactionsPath);
        newTransRef = transactions.push();
      }

      var momentDate = moment(this.date, 'YYYY-MM-DD');
      var jsDate = momentDate.toDate();

      newTransRef.set({
        income: this.income,
        amount: this.amount,
        description: this.description,
        timestamp: jsDate.getTime()
      });
      this.$bvModal.hide("addExpense")
      this.$bvModal.hide("addIncome")
    },
  },
};
</script>
