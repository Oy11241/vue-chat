<template>
  <v-navigation-drawer v-model="drawer">
    <v-sheet class="pa-4" color="grey-lighten-4">
      <v-avatar color="indigo">
        <v-icon dark> mdi-account-circle </v-icon>
      </v-avatar>
      <div class="username">{{ userAuth && userAuth.displayName }}</div>
    </v-sheet>

    <v-divider></v-divider>

    <v-list>
      <v-list-item
        v-for="[icon, text, to] in links"
        :key="icon"
        :prepend-icon="icon"
        :title="text"
        :to="to"
        link
      >
      </v-list-item>
      <v-list-item @click="logout" link>
        <template v-slot:prepend>
          <v-icon>mdi-logout</v-icon>
        </template>
        <template v-slot:title> ログアウト </template>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { auth } from "../../firebase/firebase";

export default {
  mounted() {
    this.userAuth = JSON.parse(sessionStorage.getItem("user"));
  },
  data: () => ({
    drawer: null,
    links: [["mdi-inbox-arrow-down", "ルーム", "/"]],
    userAuth: null,
  }),
  methods: {
    logout() {
      auth
        .signOut()
        .then(() => {
          localStorage.message = "ログアウトに成功しました";
          this.$router.push("/login");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
