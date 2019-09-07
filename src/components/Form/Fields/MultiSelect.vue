<template lang="pug">
  .columns(@mouseover='setFocused()')

    .column.is-three-fifths
      label.label(v-html='$t(`${name}_label`)')

      .buttons
        label.button.is-outlined(v-for='option in options',
          :class=`[option.value ? "is-success" : "",
            validate && !isValid ? "is-danger": "",
            focusedField === name && focusedOption === option.name ? "is-focused" : ""]`,
          @mouseover='setFocused(option.name)')
          input.checkbox(type='checkbox',
            @focus='setFocused(option.name)',
            @change='updateValue(option.name, !option.value)'
            :value='option.value')
          span(v-html='$t(`${name}_${option.name}_label`)')

    helpText(
      v-if='focusedField === name',
      :mainContent='`${name}_help`',
      :additionalContent='additionalHelp')

</template>

<script>
import HelpText from '@/components/Form/Fields/HelpText';

export default {
  name: 'MultiSelect',
  components: { HelpText },
  props: ['name', 'label', 'options', 'help', 'validate', 'condition', 'isValid', 'focusedField'],
  data() {
    return {
      additionalHelp: [],
      focusedOption: '',
    };
  },
  created() {
    const englishStrings = {};
    const germanStrings = {};

    englishStrings[`${this.name}_label`] = this.label.en;
    englishStrings[`${this.name}_help`] = this.help.en;

    germanStrings[`${this.name}_label`] = this.label.de;
    germanStrings[`${this.name}_help`] = this.help.de;

    this.options.forEach((option) => {
      englishStrings[`${this.name}_${option.name}_label`] = option.label.en;
      englishStrings[`${this.name}_${option.name}_help`] = option.help.en;
      germanStrings[`${this.name}_${option.name}_label`] = option.label.de;
      germanStrings[`${this.name}_${option.name}_help`] = option.help.de;
      this.additionalHelp.push({
        name: option.name,
        content: `${this.name}_${option.name}_help`,
        show: false,
      });
    });

    this.$i18n.add('en', englishStrings);
    this.$i18n.add('de', germanStrings);
  },
  methods: {
    setFocused(option) {
      if (option) {
        this.additionalHelp = this.additionalHelp.map((helpObject) => {
          const newHelpObject = helpObject;
          newHelpObject.show = newHelpObject.name === option;
          return newHelpObject;
        });
      }
      this.focusedOption = option;
      this.$parent.focusedField = this.name;
    },
    updateValue(name, value) {
      this.$emit('change', { name, value });
    },
  },
};
</script>

<style lang="stylus" scoped>
</style>
