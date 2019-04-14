<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications></notifications>

    <side-bar>
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/client/dashboard" v-if="isUser()">
        <md-icon>dashboard</md-icon>
        <p>Dashboard</p>
      </sidebar-link>
      <sidebar-link to="/client/map" v-if="isUser()">
        <md-icon>location_on</md-icon>
        <p>Viajar</p>
      </sidebar-link>
      <sidebar-link to="/client/profile">
        <md-icon>person</md-icon>
        <p>User Profile</p>
      </sidebar-link>
      <sidebar-link to="/table">
        <md-icon>content_paste</md-icon>
        <p>Table list</p>
      </sidebar-link>
      <sidebar-link to="/typography">
        <md-icon>library_books</md-icon>
        <p>Typography</p>
      </sidebar-link>
      <sidebar-link to="/icons">
        <md-icon>bubble_chart</md-icon>
        <p>Icons</p>
      </sidebar-link>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content></dashboard-content>

      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>
<style lang="scss"></style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "@/pages/Layout/MobileMenu.vue";

export default {
  data: function() {
    return {
    };
  },
  components: {
    TopNavbar,
    DashboardContent,
    ContentFooter,
    MobileMenu
  },
  methods: {
    isUser: function() {
      return this.$route.path.includes("client")
    },

    isDriver: function() {
      return this.$route.path.includes("driver")
    }
  }
};
</script>
