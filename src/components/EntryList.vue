<template>
  <div>
    <b-list-group>
      <b-list-group-item v-for="e in listitems" v-bind:key="e.id">
        <div class="d-flex w-100 justify-content-between">
          <h5>{{ e.description }}</h5>
          <div>{{ new Date().toLocaleDateString(e.timestamp) }}</div>
        </div>
        <div class="d-flex w-100 justify-content-between">
          <div v-if="e.income" style="color: green">{{ e.amount }}</div>
          <div v-else style="color: red">{{ -e.amount }}</div>
          <b-button variant="outline-secondary"> Edit </b-button>
        </div>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
export default {
  name: "EntryList",
  props: [
    "listitems" 
  ]
}
</script>