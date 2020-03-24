<template>
  <a-breadcrumb>
    <a-breadcrumb-item>
      <router-link to="/users">Users</router-link>
    </a-breadcrumb-item>
    <a-breadcrumb-item>Profile</a-breadcrumb-item>
    <a-breadcrumb-item>{{ UID }}</a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({})
export default class App extends Vue {
  @Prop() readonly UID!: string;
}
</script>
