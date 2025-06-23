<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" @click="dialog = true">
          ルーム作成
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">ルーム作成</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="name"
                  label="ルーム名 *"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>* 必須項目</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="onSubmit"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { db } from "../../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";

export default {
  data: () => ({
    dialog: false,
    name: "",
  }),
  methods: {
    async onSubmit() {
      const roomRef = collection(db, "rooms");
      await addDoc(roomRef, {
        name: this.name,
        createdAt: new Date(),
      });
      this.dialog = false;
      location.reload();
    },
  },
};
</script>
