<template>
  <div>
    <b-list-group>
      <b-list-group-item v-for="e in listitems" v-bind:key="e.id">
        <div>{{ e.descripiton }}</div>
        <div>{{ e.date }}</div>
        <div float="right">{{ e.amount }}</div>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
export default {
  name: "Entry List",
  props: {
    listitems: {
      type: Array,
      default: []
    }
  }
}
</script>