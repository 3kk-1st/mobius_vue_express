<template>
  <div>
    <div class="input_row">
      <label for="id">아이디</label>
      <input type="text" id="id" v-model="user.userid">
    </div>
    <div class="input_row">
      <label for="password">비밀번호</label>
      <input type="password" id="password" v-model="user.password">
    </div>
    <button v-on:click="login">로그인</button>
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
    login() {
      this.$http.post('/api/users/login', {
        user: this.user
      })
      .then(
        (res) => {  //로그인 성공
          alert(res.data.message);
          this.$router.push({ name: 'MainMenu' })
        },
        (err) => { // error 를 보여줌
          alert('Login failed! please check your id or password' + err);
      })
      .catch(err => {
        alert(err);
      })
    }
  }
}
</script>

