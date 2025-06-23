<template>
  <v-app id="inspire">
    <Sidebar />
    <v-app-bar extended>
      <v-app-bar-title>ルーム</v-app-bar-title>
      <CreateRoom />
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row>
          <v-col v-for="room in rooms" :key="room.id" cols="4">
            <router-link :to="{ path: '/chat', query: { roomId: room.id } }">
              <v-avatar color="grey lighten-2" size="128">
                <v-icon dark size="100"> mdi-account-circle </v-icon>
              </v-avatar>
            </router-link>
            <div class="roomName">{{ room.name }}</div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import CreateRoom from "../components/modal/CreateRoom.vue";
import Sidebar from "../components/layouts/Sidebar";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

export default {
  components: {
    Sidebar,
  },
  data: () => ({
    rooms: [],
  }),
  mounted() {
    this.getRooms();
  },
  methods: {
    async getRooms() {
      this.rooms = [];
      const roomRef = collection(db, "rooms");
      const snapshot = await getDocs(roomRef);

      snapshot.docs.map((doc) => {
        const data = { ...doc.data() };
        data.id = doc.id;
        this.rooms.push(data);
      });
    },
  },
  //
};
</script>
