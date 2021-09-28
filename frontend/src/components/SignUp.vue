<template>
  <div>
    <div class="input_row">
      <label for="id"> 아이디 </label>
      <v-text-field id="id" v-model="user.userid" />
    </div>
    <div class="input_row">
      <label for="name"> 이름 </label>
      <v-text-field  id="name" v-model="user.name" />
    </div>
    <div class="input_row">
      <label for="password"> 비밀번호 </label>
      <v-text-field id="password" v-model="user.password" />
    </div>
    <v-btn elevation="2" v-on:click="signUp">가입하기</v-btn>
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
    signUp: function () {
      this.$http
        .post("/api/users/signUp", {
          user: this.user,
        })
        .then((res) => {
          if (res.data.success == true) {
            alert(res.data.message);
            this.$router.push({name: 'Login'});
          }
          if (res.data.success == false) {
            alert(res.data.message);
          }
        })
        .catch(function (error) {
          alert(error);
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
.input_row > input{
  background:transparent;
  border: none;
  border-bottom: solid 1px #ccc;
  padding: 20px 0px 5px 0px;
  font-size: 14px;
  width: 100%;
}
input::placeholder{
  color: transparent;
}
input:placeholder-shown + label{
  color: #aaa;
  font-size: 14px;
  top: 15px;
}
input:focus + label, label{
  color: #8aa1a1;
  font-size: 10pt;
  pointer-events: none;
  position: absolute;
  left: 0px;
  top: 0px;
  transition: all 0.2s ease;
  -webkit-transition: all 0.2s ease;
  -moz-transition: all 0.2s ease;
  -o-transition: all 0.2s ease;
}
input:focus, input:not(:placeholder-shown){
  border-bottom: soild 1px #8aa1a1;
  outline:none;
}
</style>