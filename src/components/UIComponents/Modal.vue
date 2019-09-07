<template lang="pug">
  .modal
    .modal-background
    .modal-content
      .card
        .card-header
          h1.card-header-title(
            v-html='$t("notification")')
        .card-content
          .content
            p(
              v-html='$t(info.key)')

        .card-footer
          a.card-footer-item(
            @click='accept',
            v-html='$t("yes")')

          a.card-footer-item(
            @click='reject',
            v-html='$t("no")')

          a.card-footer-item(
            @click='close',
            v-html='$t("cancel")')
</template>

<script>
export default {
  name: 'Modal',
  props: ['info'],
  created() {
    const englishStrings = {};
    englishStrings[this.info.key] = this.info.en;
    const germanStrings = {};
    germanStrings[this.info.key] = this.info.de;

    this.$i18n.add('en', englishStrings);
    this.$i18n.add('de', germanStrings);
  },
  methods: {
    accept() {
      this.$emit('accept');
    },
    reject() {
      this.$emit('reject');
    },
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style lang="stylus" scoped>
</style>
