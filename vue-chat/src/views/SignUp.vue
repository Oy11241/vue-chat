<template>
  <v-app>
    <div class="login-box">
      <v-card class="login-form">
        <v-alert
          dense
          outlined
          type="error"
          class="error-message"
          v-if="errorMessage"
        >
          {{ errorMessage }}
        </v-alert>
        <v-card-title>SignUp</v-card-title>
        <v-card-subtitle>ユーザー情報をご入力ください</v-card-subtitle>
        <v-btn text color="light-blue" to="login" class="signup-to-login"
          >ログイン画面はこちら</v-btn
        >
        <v-sheet class="mx-auto" width="300">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="name"
              :rules="nameRules"
              label="UserName"
              required
            ></v-text-field>
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
                SIGN UP
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
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export default {
  data: () => ({
    valid: true,
    name: "",
    nameRules: [
      (v) => !!v || "名前を入力してください",
      (v) => (v && v.length <= 10) || "名前は10文字以内で入力してください",
    ],
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
  methods: {
    async submit() {
      try {
        const result = await createUserWithEmailAndPassword(
          auth,
          this.email,
          this.password
        );
        await updateProfile(result.user, { displayName: this.name });

        localStorage.message = "新規作成に成功しました";
        this.$router.push("/login");
      } catch (error) {
        console.error("エラー詳細:", error);
        this.errorMessage = "ユーザーの新規作成に失敗しました。";
      }
    },
  },
};
</script>
<style scoped>
.login-form {
  margin: 170px;
  padding: 30px;
}
.login-box {
  width: 60%;
  margin: 0px auto;
}
.login-btn {
  margin-right: 20px;
}
.signup-to-login {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
