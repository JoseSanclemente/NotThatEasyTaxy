<template>
  <md-card>
    <md-card-header data-background-color="orange">
      <slot name="title"></slot>
    </md-card-header>

    <md-card-content>
      <slot name="description"></slot>
      <slot name="inputs"></slot>
    </md-card-content>

    <md-card-actions id="login">
      <slot name="footer"></slot>
    </md-card-actions>
  </md-card>
</template>

<style lang="css">
  #login {
    justify-content: center;
  }
</style>
