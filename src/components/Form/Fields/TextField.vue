<template lang="pug">
  .columns(v-if='condition')
    .column.is-three-fifths
      .field
        label.label(v-text='$t(`${name}_label`)')
        .control.has-icons-right
          input.input(
            :type='validation ? validation.type : "text"',
            :placeholder='$t(`${name}_placeholder`)',
            :class=`[focusedField === name ? "focused" : "",
              isValid ? "is-success" : "",
              validate && !isValid ? "is-danger" : ""]`,
            :value='value',
            @input='updateValue($event.target.value)',
            @focus='setFocused()')

    helpText(
      v-if='focusedField === name',
      :mainContent='`${name}_help`')
</template>

<script>
import HelpText from '@/components/Form/Fields/HelpText';

export default {
  name: 'TextField',
  components: { HelpText },
  props: [
    'name',
    'label',
    'value',
    'placeholder',
    'help',
    'validate',
    'condition',
    'isValid',
    'focusedField',
    'validation',
  ],
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
  },
  methods: {
    setFocused() {
      this.$parent.focusedField = this.name;
    },
    updateValue(value) {
      this.$emit('input', value);
    },
  },
};
</script>

<style lang="stylus" scoped>
</style>
