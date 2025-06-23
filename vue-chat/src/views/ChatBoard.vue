<template>
  <v-app id="inspire">
    <Sidebar />
    <v-main>
      <h1>{{ room ? room.name : "" }}</h1>
      <v-container class="py-8 px-6" fluid>
        <v-row>
          <v-col v-for="card in cards" :key="card" cols="12">
            <v-card>
              <v-list lines="two">
                <v-list-subheader :title="card"></v-list-subheader>

                <template v-for="(data, index) in messages" :key="index">
                  <v-list-item>
                    <template v-slot:prepend>
                      <div class="avatar-wrapper">
                        <v-avatar color="grey-darken-1">
                          <v-icon dark>mdi-account-circle</v-icon>
                        </v-avatar>
                        <div class="username">{{ data.name }}</div>
                      </div>
                    </template>

                    <v-list-item-subtitle class="message">{{
                      data.message
                    }}</v-list-item-subtitle>

                    <template v-slot:append>
                      <div class="timestamp">
                        {{ formatTime(data.createdAt) }}
                      </div>
                    </template>
                  </v-list-item>

                  <v-divider
                    v-if="index !== messages.length - 1"
                    :key="`divider-${index}`"
                  ></v-divider>
                </template>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <v-textarea
        v-model="body"
        append-icon="mdi-comment"
        class="mx-2"
        label="メッセージを送信する"
        rows="3"
        auto-grow
      ></v-textarea>
      <v-btn class="me-4" type="submit" :disabled="invalid" @click="submit">
        submit
      </v-btn>

      <v-btn @click="clear"> clear </v-btn>
    </v-main>
  </v-app>
</template>

<script>
import { db } from "../firebase/firebase";
import {
  getDoc,
  addDoc,
  doc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import Sidebar from "../components/layouts/Sidebar";

export default {
  components: {
    Sidebar,
  },
  async created() {
    this.roomId = this.$route.query.roomId;

    const roomRef = doc(db, "rooms", this.roomId);
    const roomSnap = await getDoc(roomRef);

    if (!roomSnap.exists()) {
      await this.$router.push("/");
    } else {
      this.room = roomSnap.data();
    }
  },
  mounted() {
    this.userAuth = JSON.parse(sessionStorage.getItem("user"));

    const messagesRef = collection(db, "rooms", this.roomId, "messages");
    const q = query(messagesRef, orderBy("createdAt", "asc"));

    onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          this.messages.push(change.doc.data());
        }
      });
    });
  },
  data: () => ({
    messages: [],
    body: "",
    roomId: "",
    room: null,
    cards: ["Today"],
    drawer: null,
    links: [
      ["mdi-inbox-arrow-down", "Inbox", "/"],
      ["mdi-send", "Send", "/about"],
      ["mdi-delete", "Trash", "/about"],
      ["mdi-alert-octagon", "Spam", "/about"],
    ],
    userAuth: null,
  }),
  computed: {
    invalid() {
      return !this.body ? true : false;
    },
  },
  methods: {
    clear() {
      this.body = "";
    },
    async submit() {
      try {
        const roomRef = doc(db, "rooms", this.roomId);
        const messagesRef = collection(roomRef, "messages");

        await addDoc(messagesRef, {
          message: this.body,
          name: this.userAuth.displayName,
          createdAt: new Date(),
        });

        this.body = "";
      } catch (error) {
        alert("メッセージの送信に失敗しました");
      }
    },
    formatTime(timestamp) {
      if (!timestamp) return "";

      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");

      return `${hours}:${minutes}`;
    },
  },
};
</script>
