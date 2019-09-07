<template lang="pug">
  .section.columns
    table.table.is-striped.is-fullwidth.is-hoverable
      thead
        tr
          th(v-html='$t("type")')
          th(v-html='$t("from")')
          th(v-html='$t("to")')
          th(v-html='$t("tag")')
          th(v-html='$t("lastEdit")')
      tbody
        router-link(
          v-for='form in forms',
          tag='tr',
          :key='form._id',
          :to=`{
            name: "FormSummary",
            params: { _id: form._id },
          }`)
            td(v-html='$t(form.type)')
            td(v-html='formatDate(form.begin)')
            td(v-html='formatDate(form.end)')
            td(v-html='$t(form.tag)')
            td(v-html='formatDateTime(form.lastEdit)')
</template>

<script>
import helpers from '@/helpers';

export default {
  name: 'GridView',
  data() {
    return {
      h: helpers,
    };
  },
  props: ['forms'],
  methods: {
    formatDate(sDate) {
      if (!sDate) return '–';
      const date = this.h.makeDate(sDate);

      return this.$t('date', {
        year: date.getFullYear(),
        day: date.getDate(),
        month: this.$t(`m${date.getMonth() + 1}`),
      });
    },
    formatDateTime(sDate) {
      if (!sDate) return '–';
      const date = new Date(sDate);
      let hour = date.getHours();
      if (this.$i18n.locale() === 'en') hour = date.getHours() === 0 ? 12 : date.getHours() % 12;

      return this.$t('dateTime', {
        year: date.getFullYear(),
        day: date.getDate(),
        month: this.$t(`m${date.getMonth() + 1}`),
        hour,
        minutes: date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes(),
        AMPM: date.getHours() > 11 ? 'PM' : 'AM',
      });
    },
  },
  created() {
    const englishStrings = {
      type: 'Type',
      from: 'Begin',
      to: 'End',
      state: 'State',
      lastEdit: 'Last edited',
    };
    const germanStrings = {
      type: 'Art',
      from: 'Beginn',
      to: 'Ende',
      state: 'Status',
      lastEdit: 'Zuletzt geändert',
    };
    this.$i18n.add('en', englishStrings);
    this.$i18n.add('de', germanStrings);
  },
};
</script>

<style lang="stylus">
tbody
  tr
    cursor pointer
</style>
