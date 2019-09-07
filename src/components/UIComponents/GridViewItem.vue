<template lang="pug">
  router-link.column.is-one-third(:to=`{
      name: "FormSummary",
      params: { _id: form._id },
    }`)
      .card
        .card-content
          .media
            .media-content
              .tags.has-addons
                h2.tag.is-medium(
                  v-html='$t(form.type)')
                h2.tag.is-medium(
                  v-html='$t(form.tag)',
                  :class='getColor(form.tag)')
              h1.title.has-text-centered {{ $t(form.name) }}
          .content.has-text-centered
            h3.is-size-6(
              v-html='formatDatePeriod(form.begin, form.end)')
</template>

<script>
import helpers from '@/helpers';

export default {
  name: 'GridViewItem',
  data() {
    return {
      h: helpers,
      tags: [
        {
          name: 'draft',
          colorClass: 'is-warning',
        },
        {
          name: 'sent',
          colorClass: 'is-info',
        },
        {
          name: 'accepted',
          colorClass: 'is-success',
        },
        {
          name: 'rejected',
          colorClass: 'is-danger',
        },
      ],
    };
  },
  props: ['form'],
  methods: {
    formatDatePeriod(sBegin, sEnd) {
      if (!sBegin && !sEnd) return '-';
      if (!sBegin) return this.formatDate(sEnd);
      if (!sEnd) return this.formatDate(sBegin);

      const begin = this.h.makeDate(sBegin);
      const end = this.h.makeDate(sEnd);

      if (begin.getFullYear() === end.getFullYear()) {
        if (begin.getMonth() === end.getMonth()) {
          if (begin.getDate() === end.getDate()) {
            return this.formatDate(begin);
          }
          return this.$t('datePeriodSameMonth', {
            month: this.$t(`m${begin.getMonth() + 1}`),
            dayBegin: begin.getDate(),
            dayEnd: end.getDate(),
            year: begin.getFullYear(),
          });
        }
        return this.$t('datePeriodSameYear', {
          monthBegin: this.$t(`m${begin.getMonth() + 1}`),
          monthEnd: this.$t(`m${end.getMonth() + 1}`),
          dayBegin: begin.getDate(),
          dayEnd: end.getDate(),
          year: begin.getFullYear(),
        });
      }

      return this.$t('datePeriodSameYear', {
        monthBegin: this.$t(`m${begin.getMonth() + 1}`),
        monthEnd: this.$t(`m${end.getMonth() + 1}`),
        dayBegin: begin.getDate(),
        dayEnd: end.getDate(),
        yearBegin: begin.getFullYear(),
        yearEnd: end.getFullYear(),
      });
    },
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
      const date = this.h.makeDate(sDate);
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
    getColor(tag) {
      const found = this.tags.find(aTag => aTag.name === tag);
      if (found) return found.colorClass;
      return '';
    },
  },
};
</script>

<style lang="stylus" scoped>
  .media-content
    overflow hidden !important
</style>
