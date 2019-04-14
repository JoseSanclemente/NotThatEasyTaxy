<template>
  <div class="md-layout md-gutter md-alignment-center-center text-center" id="main-container">
    <login-card
      class="md-layout-item md-size-33 md-medium-size-50 md-small-size-70 md-xsmall-size-100"
    >
      <h4 slot="title" class="title">No That Easy Taxi</h4>
      <md-field class="md-form-group" slot="inputs">
        <label for="font">Tipo de usuario</label>
        <md-select v-model="type">
          <md-option value="driver">Conductor</md-option>
          <md-option value="user">Pasajero</md-option>
        </md-select>
      </md-field>
      <md-field class="md-form-group" slot="inputs">
        <md-icon>account_box</md-icon>
        <label>{{ idLabel }}</label>
        <md-input v-model="id" type="id"></md-input>
      </md-field>
      <md-field class="md-form-group" slot="inputs">
        <md-icon>lock_outline</md-icon>
        <label>Contraseña...</label>
        <md-input v-model="password" type="password" v-on:keyup.enter="signIn()"></md-input>
      </md-field>
      <md-button
        id="login-button"
        slot="footer"
        class="md-simple md-success md-lg"
        v-on:click="signIn()"
      >Entrar</md-button>
    </login-card>
  </div>
</template>
<script>
import LoginCard from "@/components/Cards/LoginCard.vue";
import superagent from "superagent";

export default {
  components: {
    LoginCard
  },
  data() {
    return {
      type: "user",
      id: "",
      password: ""
    };
  },
  methods: {
    signIn: function() {
      superagent
        .get("http://localhost:8080/api/driver/" + this.id)
        .set("password", this.password)
        .end((err, res) => {
          if (err != null) {
            return
            //TODO: Notify error in conection
          }
          if(res.statusCode != 200) {
            return
            //TODO: Notidy error in login
          }
          this.$router.push('/user/dashboard')
        })
    }
  },
  computed: {
    idLabel: function() {
      if (this.type == "driver") {
        return "Cédula..."
      }
      return "Número de telefono..."
    }
  }
};
</script>

<style>
#main-container {
  min-width: 100%;
  min-height: 100%;
}
#login-button {
  align-content: center;
}
</style>
