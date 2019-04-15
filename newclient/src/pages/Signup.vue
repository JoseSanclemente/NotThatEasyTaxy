<template>
  <div
    class="md-layout md-gutter md-alignment-center-center text-center"
    id="main-container"
  >
    <login-card
      class="md-layout-item md-size-33 md-medium-size-50 md-small-size-70 md-xsmall-size-100"
    >
      <h4 slot="title" class="title">No That Easy Taxi</h4>
      <md-field class="md-form-group" slot="inputs">
        <label for="font">Tipo de usuario</label>
        <md-select v-model="type">
          <md-option value="driver"> Conductor</md-option>
          <md-option value="client"> Pasajero</md-option>
        </md-select>
      </md-field>

      <md-field class="md-form-group" slot="inputs">
        <md-icon>account_circle</md-icon>
        <label>Nombre</label>
        <md-input v-model="name"></md-input>
      </md-field>

      <md-field class="md-form-group" slot="inputs" v-if="isDriver">
        <md-icon>calendar_today</md-icon>
        <label>Fecha de nacimiento</label>
        <md-input v-model="birthDate"></md-input>
      </md-field>

      <md-field class="md-form-group" slot="inputs">
        <md-icon>account_box</md-icon>
        <label>{{ idLabel }}</label>
        <md-input v-model="id" type="id"></md-input>
      </md-field>

      <md-field class="md-form-group" slot="inputs" v-if="isDriver">
        <md-icon>directions_car</md-icon>
        <label>Placa del taxi</label>
        <md-input v-model="taxiPlate"></md-input>
      </md-field>

      <md-field class="md-form-group" slot="inputs" v-if="isDriver">
        <md-icon>directions_car</md-icon>
        <label>Modelo</label>
        <md-input v-model="model"></md-input>
      </md-field>

      <md-field class="md-form-group" slot="inputs" v-if="isDriver">
        <md-icon>calendar_today</md-icon>
        <label>Año</label>
        <md-input v-model="year"></md-input>
      </md-field>

      <md-field class="md-form-group" slot="inputs" v-if="isDriver">
        <md-icon>security</md-icon>
        <label>SOAT</label>
        <md-input v-model="soat"></md-input>
      </md-field>

      <md-field class="md-form-group" slot="inputs" v-if="isDriver">
        <md-icon>directions_car</md-icon>
        <label>Baul</label>
        <md-input v-model="trunk"></md-input>
      </md-field>

      <md-field class="md-form-group" slot="inputs" v-if="isDriver">
        <md-icon>directions_car</md-icon>
        <label>Marca</label>
        <md-input v-model="brand"></md-input>
      </md-field>

      <md-field class="md-form-group" slot="inputs" v-if="isClient">
        <md-icon>credit_card</md-icon>
        <label>Tarjeta de crédito</label>
        <md-input v-model="creditCard"></md-input>
      </md-field>

      <md-field class="md-form-group" slot="inputs">
        <md-icon>lock_outline</md-icon>
        <label>Contraseña...</label>
        <md-input v-model="password" type="password"></md-input>
      </md-field>

      <md-button
        id="login-button"
        slot="footer"
        class="md-simple md-success md-lg"
        v-on:click="signIn()"
        >Entrar</md-button
      >
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
      type: "client",
      id: "",
      password: "",
      taxiPlate: "",
      name: "",
      birthDate: "",
      model: "",
      year: "",
      soat: "",
      trunk: "",
      brand: "",
      creditCard: ""
    };
  },
  methods: {
    signIn: function() {
      console.log("hi")
      superagent
        .post("http://localhost:8080/api/" + this.type)
        .send({
          taxi_id: this.taxiPlate,
          model: this.model,
          year: parseInt(this.year, 10),
          soat: this.soat,
          trunk: this.trunk,
          brand: this.brand,
          driver_id: this.id,
          name: this.name,
          birth_date: this.birthDate
        })
        .end((err, res) => {
          console.log(err)
          console.log(res)
          if (err != null) {
            return;
            //TODO: Notify error in conection
          }
          if (res.statusCode != 200) {
            return;
            //TODO: Notidy error in login
          }
          this.$router.push("/" + this.type + "/map");
        });
    }
  },
  computed: {
    idLabel: function() {
      if (this.type == "driver") {
        return "Cédula";
      }
      return "Número de telefono";
    },

    isClient: function() {
      return this.type == "client";
    },

    isDriver: function() {
      return this.type == "driver";
    }
  }
};
</script>

<style>
#main-container {
  min-width: 100%;
  min-height: 100%;
  overflow: scroll;

}
::-webkit-scrollbar { 
    display: none !important; 
}
#login-button {
  align-content: center;
}
</style>
