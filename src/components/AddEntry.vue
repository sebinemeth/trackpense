<template>
  <div class="root">
    <!-- https://bootstrap-vue.org/docs/components/form/#form -->
    <div v-if="income"></div>
    <div v-else></div>
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
