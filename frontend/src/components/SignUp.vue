<template>
  <div>
    <div class="input_row">
      <label for="id"> 아이디 </label>
      <input type="text" id="id" v-modle="user.userid" />
    </div>
    <div class="input_row">
      <label for="name"> 이름 </label>
      <input type="text" id="name" v-modle="user.name" />
    </div>
    <div class="input_row">
      <label for="password"> 비밀번호 </label>
      <input type="password" id="id" v-modle="user.password" />
    </div>
    <button v-on:click="signUp">가입하기</button>
    <router-link :to="{ name: 'Login'}"> 
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        userid: "",
        name: "",
        password: "",
      },
    };
  },

  methods: {
    signUp: function (event) {
      this.$http
        .post("/api/users/signUp", {
          user: this.user,
        })
        .then((res) => {
          if (res.data.success == ture) {
            alert(res.data.message);
            router.push({name: 'Login'});
          }
          if (res.data.success == false) {
            alert(res.data.message);
          }
        })
        .catch(function (error) {
          alert("error");
        });
    },
  },
};
</script>

<style>
.input_row{
position: relative;
margin: 10px 0;
}
</style>