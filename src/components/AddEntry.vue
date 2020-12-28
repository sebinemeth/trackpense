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
    <b-button @click="addEntry">Add</b-button>
  </div>
</template>

<script>

import firebase from 'firebase';

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
      description: ""
    };
  },
  methods: {
    addEntry() {
      var transactions = firebase.database().ref('users/' + this.user.uid + '/transactions');
      var newTransRef = transactions.push();
      newTransRef.set({
        income: this.income,
        amount: this.amount,
        description: this.description,
        timestamp : Date.now()
      });
    },
  },
};
</script>
