<template>
  <div>
    <b-list-group>
      <b-list-group-item v-for="e in listitems" v-bind:key="e.id">
        <div class="d-flex w-100 justify-content-between">
          <h5>{{ e.description }}</h5>
          <h6>{{ new Date(e.timestamp).toLocaleDateString() }}</h6>
        </div>
        <div class="d-flex w-100 justify-content-between">
          <h5 v-if="e.income" style="color: green">{{ e.amount }}</h5>
          <h5 v-else style="color: red">{{ -e.amount }}</h5>
          <b-button @click="editEntry(e)" variant="outline-secondary">
            Edit
          </b-button>
        </div>
      </b-list-group-item>
    </b-list-group>
    <b-modal id="editExpense" title="Edit expense" hide-footer>
      <add-entry :income="false" :user="user" :transaction="transaction"></add-entry>
    </b-modal>
    <b-modal id="editIncome" title="Edit income" hide-footer>
      <add-entry :income="true" :user="user" :transaction="transaction"></add-entry>
    </b-modal>
  </div>
</template>

<script>
import AddEntry from "@/components/AddEntry.vue";

export default {
  name: "EntryList",
  components: { AddEntry },
  props: ["listitems", "user"],
  data() {
    return { transaction: null };
  },
  methods: {
    editEntry(e) {
      this.transaction = e;
      if (e.income) {
        this.$bvModal.show("editIncome");
      } else {
        this.$bvModal.show("editExpense");
      }
    },
  },
};
</script>
