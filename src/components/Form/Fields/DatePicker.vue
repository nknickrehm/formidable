<template lang="pug">
  .columns(v-if='condition')

    .column.is-three-fifths
      .field
        label.label(
          v-text='$t(`${name}_label`)')
        .control
          .control.has-icons-right
          input.input(
            type='text',
            :placeholder='$t(`${name}_placeholder`)',
            :class=`[focusedField === name ? "focused" : "",
              isValid ? "is-success" : "",
              validate && !isValid ? "is-danger" : ""]`,
            :value='value',
            @input='updateValue($event.target.value)',
            @focus='setFocused()')
          datepicker(
            v-if='focusedField === name',
            :value='dateValue',
            :language='$i18n.locale()',
            :monday-first='$i18n.locale() === "de"',
            :inline='true',
            format='dd.MM.yyyy',
            @selected='updateDateValue')
    helpText(
      v-if='focusedField === name',
      :mainContent='`${name}_help`')
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import HelpText from '@/components/Form/Fields/HelpText';

export default {
  name: 'DatePicker',
  data() {
    return {
      dateValue: new Date(),
    };
  },
  props: ['name', 'label', 'value', 'placeholder', 'validate', 'help', 'condition', 'isValid', 'focusedField'],
  components: { Datepicker, HelpText },
  created() {
    const englishStrings = {};
    const germanStrings = {};

    englishStrings[`${this.name}_label`] = this.label.en;
    englishStrings[`${this.name}_placeholder`] = this.placeholder.en;
    englishStrings[`${this.name}_help`] = this.help.en;

    germanStrings[`${this.name}_label`] = this.label.de;
    germanStrings[`${this.name}_placeholder`] = this.placeholder.de;
    germanStrings[`${this.name}_help`] = this.help.de;

    this.$i18n.add('en', englishStrings);
    this.$i18n.add('de', germanStrings);

    if (this.value) {
      this.updateValue(this.value);
    }
  },
  methods: {
    setFocused() {
      this.$parent.focusedField = this.name;
    },
    updateValue(value) {
      if (value.match(/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)\d{2})$/)) {
        const temp = value.split('.');
        const date = new Date();
        date.setFullYear(temp[2]);
        date.setMonth(temp[1] - 1);
        date.setDate(temp[0]);
        this.dateValue = date;
      }
      this.$emit('input', value);
    },
    updateDateValue(date) {
      const days = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
      const month = date.getMonth() < 11 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
      this.updateValue(`${days}.${month}.${date.getFullYear()}`);
    },
  },
};
</script>

<style lang="stylus" scoped>
</style>
