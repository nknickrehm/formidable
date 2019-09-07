<template lang="pug">
  #app
    .navbar.is-danger
      .navbar-item#disclaimer {{ $t('disclaimer') }}
    div(v-if='$auth.ready() && $auth.check()')
      mainNavigation
      router-view
    div(v-if='!$auth.ready() || !$auth.check()')
      gate
</template>

<script>
import 'bulma/css/bulma.css';
import 'font-awesome/css/font-awesome.min.css';

import MainNavigation from '@/components/UIComponents/MainNavigation';
import Gate from '@/components/Sites/Gate';

import englishLocals from './lang/en.json';
import germanLocals from './lang/de.json';

export default {
  name: 'App',
  components: {
    MainNavigation,
    Gate,
  },
  created() {
    this.$i18n.add('en', englishLocals);
    this.$i18n.add('de', germanLocals);
  },
};
</script>

<style lang="stylus">
  #app
    overflow: overlay
  #disclaimer
    margin-left auto
    margin-right auto
    color #fff
  .button
    > input[type="checkbox"], > input[type="radio"]
      display block
      position absolute
      opacity 0
      width 0
      height 0
</style>
