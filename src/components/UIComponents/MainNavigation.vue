<template lang="pug">
  .container
    nav.navbar
      .navbar-end
        .navbar-item
          .buttons.is-grouped
            languageButton
            router-link.button.is-medium(
              :to='{ name: "UserProfile" }')
                span.icon.is-small
                    i.fa.fa-user
                span(
                  v-html='$t("userProfile")')
            a.button.is-medium(
              @click='logout()')
              span.icon.is-small
                i.fa.fa-lock
              span(
                v-html='$t("logout")')
</template>

<script>
import LanguageButton from '@/components/UIComponents/LanguageButton';

export default {
  name: 'MainNavigation',
  components: {
    LanguageButton,
  },
  methods: {
    logout() {
      this.$auth.logout();
    },
  },
};
</script>

<style lang="stylus">
</style>
