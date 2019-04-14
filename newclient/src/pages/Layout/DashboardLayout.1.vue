<template>
  <div
    class="wrapper t-wrapper"
    :class="[{'nav-open': $sidebar.showSidebar}, {'rtl': $route.meta.rtlActive}]"
  >
    <notifications></notifications>
    <side-bar>
      <user-menu></user-menu>
      <template slot="links">
        <sidebar-item
          :link="{name: 'Consulta', icon: 'dashboard', path: '/dashboard/check'}"
        ></sidebar-item>
        <sidebar-item
          :link="{name: 'Consulta masiva', icon: 'backup', path: '/dashboard/report'}"
        ></sidebar-item>
        <sidebar-item
          :link="{name: 'Centro de Ayuda', icon: 'help_outline', path: 'https://support.truora.com/hc/es-419', isRoute: true, target:'__blank', external: true}"
        ></sidebar-item>
      </template>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <div :class="{content: !$route.meta.hideContent}" @click="toggleSidebar">
        <router-view></router-view>
      </div>
      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>
<script>
import TopNavbar from '@/components/TopNavbar.vue'
import ContentFooter from '@/components/ContentFooter.vue'
import UserMenu from '@/components/UserMenu.vue'

export default {
  components: {
    TopNavbar,
    ContentFooter,
    UserMenu
  },
  methods: {
    toggleSidebar () {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false)
      }
    }
  }
}
</script>
<style lang="scss">
$scaleSize: 0.95;
@keyframes zoomIn95 {
  from {
    opacity: 0;
    transform: scale3d($scaleSize, $scaleSize, $scaleSize);
  }
  to {
    opacity: 1;
  }
}
.main-panel .zoomIn {
  animation-name: zoomIn95;
}
@keyframes zoomOut95 {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: scale3d($scaleSize, $scaleSize, $scaleSize);
  }
}
.main-panel .zoomOut {
  animation-name: zoomOut95;
}
</style>
