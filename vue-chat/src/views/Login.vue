<template>
  <v-app>
    <div class="login-box">
      <v-card class="login-form">
        <v-alert
          dense
          text
          type="success"
          class="success-message"
          v-if="message"
        >
          {{ message }}
        </v-alert>
        <v-alert
          dense
          outlined
          type="error"
          class="error-message"
          v-if="errorMessage"
        >
          {{ errorMessage }}
        </v-alert>
        <v-card-title>Login</v-card-title>
        <v-card-subtitle>ユーザー情報をご入力ください</v-card-subtitle>
        <v-btn text color="light-blue" to="signup" class="login-to-signup"
          >新規登録はこちら</v-btn
        >
        <v-sheet class="mx-auto" width="300">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>
            <v-text-field
              v-model="password"
              type="password"
              label="Password"
              required
            ></v-text-field>

            <div class="d-flex flex-column">
              <v-btn
                class="login-btn"
                color="success"
                block
                @click="submit"
                :disabled="isValid"
              >
                LOGIN
              </v-btn>
              <v-btn class="mt-4" block> CLEAR </v-btn>
            </div>
          </v-form>
        </v-sheet>
      </v-card>
    </div>
  </v-app>
</template>
<script>
import { auth } from "../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default {
  data: () => ({
    valid: true,
    email: "",
    emailRules: [
      (v) => !!v || "メールアドレスを入力してください",
      (v) => /.+@.+\..+/.test(v) || "メールアドレスが不正です",
    ],
    password: "",
    message: "",
    errorMessage: "",
  }),
  computed: {
    isValid() {
      return !this.valid;
    },
  },
  mounted() {
    if (localStorage.message) {
      this.message = localStorage.message;
      localStorage.message = "";
    }
  },
  methods: {
    async submit() {
      try {
        const result = await signInWithEmailAndPassword(
          auth,
          this.email,
          this.password
        );

        const user = result.user;
        const authData = {
          displayName: user.displayName,
          email: user.email,
          uid: user.uid,
          refreshToken: user.refreshToken,
          photoURL: user.photoURL,
        };

        sessionStorage.setItem("user", JSON.stringify(authData));

        this.$router.push("/");
      } catch (error) {
        this.errorMessage = "ログインに失敗しました";
      }
    },
  },
};
</script>
<style scoped>
.login-form {
  margin: 150px;
  padding: 30px;
}
.login-box {
  width: 50%;
  margin: 0px auto;
}
.login-btn {
  margin-right: 20px;
}
.login-to-signup {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
