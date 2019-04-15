<template>
  <div>
    <md-table v-model="trips" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID">{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Fecha de viaje">{{ item.date }}</md-table-cell>
        <md-table-cell md-label="Valor pagado">{{ item.cost }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: "simple-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      selected: [],
      trips: [
        {
          id: "37438920",
          cost: "$36,738",
          date: "11/04/2019"
        },
        {
          id: "89542416",
          cost: "$23,738",
          date: "10/04/2019"
        },
        {
          id: "94174322",
          cost: "$56,142",
          date: "05/04/2019"
        }
      ]
    };
  }
};
</script>
