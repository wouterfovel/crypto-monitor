<template>
  <v-app>
    <v-main class="background">
      <v-container class="pa-0" fluid>
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {

}
</script>

<style lang="scss">
  @import "global";

  .background {
    background: $color-background;
    background: -webkit-linear-gradient(to right, $color-background, $color-background-gradient);
    background: linear-gradient(to right, $color-background, $color-background-gradient);
  }
</style>
