<template>
  <div>
    <div class="input_row">
      <label for="id">아이디</label>
      <v-text-field type="text" id="id" v-model="user.userid">
    </div>
    <div class="input_row">
      <label for="password">비밀번호</label>
      <v-text-field type="password" id="password" v-model="user.password">
    </div>
    <v-btn elevation="2" v-on:click="login">로그인</v-btn>
    <v-btn elevation="2" v-on:click="goToSignUp">Go to Sign Up</v-btn>
  </div>
</template>

<script>

export default {
  data () {
    return {
      user: {
        userid: '',
        password: ''
      }
    }
  },
  methods: {
    goToSignUp () {
      this.$router.push({ name: 'SignUp' })
    },
    login() {
      this.$http.post('/api/users/login', {
        user: this.user
      })
      .then(
        (res) => {
          console.log(res)
          if (res.data == 'success') {
            alert(res.data);
            this.$router.push({ name: 'MainMenu' })
          }
          else {
            alert(res.data)
          }
        }
        )
      .catch(err => {
        alert(err);
      })
    }
  }
}
</script>

