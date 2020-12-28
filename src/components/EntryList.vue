<template>
  <div>
    <b-list-group>
      <b-list-group-item v-for="e in listitems" v-bind:key="e.id">
        <div class="d-flex w-100 justify-content-between">
          <h5>{{ e.description }}</h5>
          <h6>{{ new Date().toLocaleDateString(e.timestamp) }}</h6>
        </div>
        <div class="d-flex w-100 justify-content-between">
          <h5 v-if="e.income" style="color: green">{{ e.amount }}</h5>
          <h5 v-else style="color: red">{{ -e.amount }}</h5>
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