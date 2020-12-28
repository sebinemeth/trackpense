<template>
  <div>
    <b-list-group>
      <b-list-group-item v-for="e in listitems" v-bind:key="e.id">
        {{ e.descripiton }}
      </b-list-group-item>
    </b-list-group>
  </div>
</template>
