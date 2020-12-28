<template>
  <div>
    <b-jumbotron :header="totalSum" class="text-center"> </b-jumbotron>
  </div>
</template>

<script>
export default {
  name: "TotalBalance",
  props: ["listitems"],
  computed: {
    totalSum() {
      return (
        this.listitems
          .reduce((acc, e) => acc + parseInt(e.amount * (e.income ? 1 : -1)), 0)
          .toFixed(0) + " Ft"
      );
    },
  },
};
</script>
