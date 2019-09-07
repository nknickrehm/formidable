<template lang="pug">
  a.button.is-medium.is-outlined(@click='changeLanguage()')
    span.icon
      i.flag-icon(:class='localizedFlagClass')
    span {{ $t('language') }}
</template>

<script>
import 'flag-icon-css/css/flag-icon.min.css';

export default {
  name: 'LanguageButton',
  data() {
    return {
    };
  },
  created() {
    this.$i18n.add('de', { language: 'Deutsch' });
    this.$i18n.add('en', { language: 'English' });
  },
  methods: {
    changeLanguage() {
      const newLocale = this.$i18n.locale() === 'en' ? 'de' : 'en';
      this.$i18n.set(newLocale);
    },
  },
  computed: {
    localizedFlagClass() {
      return this.$i18n.locale() === 'en' ? 'flag-icon-us' : 'flag-icon-de';
    },
  },
};
</script>

<style lang="stylus">

</style>
