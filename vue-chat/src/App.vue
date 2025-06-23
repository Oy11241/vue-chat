<template>
  <v-app>
    <v-layout>
      <v-main>
        <router-view />
      </v-main>
    </v-layout>
  </v-app>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.grey-darken-1 {
  background-color: #757575 !important;
  border-color: #757575 !important;
}

.pa-4 {
  padding: 16px !important;
}

.username {
  padding: 10px;
}
</style>
