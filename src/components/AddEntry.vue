<template>
  <div class="root">
    <div v-if="income">
      <label>Income details</label>
      <label for="amount">Amount</label>
      <b-form-input type="number" : id="amount"></b-form-input>
    </div>
    <div v-else>
      <label>Expense details</label>
      <label for="amount">Amount</label>
      <b-form-input type="number" : id="amount"></b-form-input>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddEntry",
  props: {
    income: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  methods: {
    dosomething() {},
  },
};
</script>
