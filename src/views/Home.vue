<template>
  <div class="home">
    <h2>Welcome</h2>

    <b-button v-b-modal.addExpense>Add expense</b-button>
    <b-button v-b-modal.addIncome>Add income</b-button>

    <b-modal id="addExpense" title="Add expense">
      <add-entry :income="false"></add-entry>
    </b-modal>

    <b-modal id="addIncome" title="Add income">
      <add-entry :income="true"></add-entry>
    </b-modal>

    <entry-list :listitems="listitems"></entry-list>
  </div>
</template>

<script>
//import firebase from "firebase";
import AddEntry from "@/components/AddEntry.vue";
import EntryList from "@/components/EntryList.vue";

export default {
  name: "Home",
  components: { AddEntry, EntryList },
  prop: ["user"],
  data() {
    return { listitems: [] };
  },
};
</script>
