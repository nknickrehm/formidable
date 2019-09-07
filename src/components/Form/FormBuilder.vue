<template lang="pug">
  form(@submit.prevent='')
    component(
      v-for='field in fields',
      :is='field.type',
      :key='field.name',
      :focusedField='focusedField',
      :validate='validate',
      v-bind='field',
      v-if='shouldShow(field.condition)',
      @input='value => setFieldValue(field, value)',
      @change='option => setOptionValue(field, option)',
      @keydown.enter="send")
</template>

<script>
import TextField from '@/components/Form/Fields/TextField';
import MultiSelect from '@/components/Form/Fields/MultiSelect';
import RadioGroup from '@/components/Form/Fields/RadioGroup';
import DatePicker from '@/components/Form/Fields/DatePicker';
import ButtonSelect from '@/components/Form/Fields/ButtonSelect';

export default {
  name: 'FormBuilder',
  data() {
    return {
      focusedField: '',
    };
  },
  props: ['fields', 'validate'],
  components: {
    TextField,
    MultiSelect,
    RadioGroup,
    DatePicker,
    ButtonSelect,
  },
  methods: {
    shouldShow(conditions) {
      if (typeof conditions === 'boolean') return conditions;

      let show = true;

      conditions.forEach((condition) => {
        this.fields.forEach((field) => {
          if (field.type === 'multiSelect') {
            field.options.forEach((option) => {
              if (option.name === condition.field) {
                if (option.value !== condition.value) show = false;
              }
            });
          } else if (field.name === condition.field) {
            if (field.value !== condition.value) show = false;
          }
        });
      });
      return show;
    },
    setFieldValue(field, newValue) {
      field.value = newValue;
      this.evaluateForm();
    },
    setOptionValue(field, option) {
      field.options.forEach((o) => {
        if (o.name === option.name) o.value = option.value;
      });

      this.evaluateForm();
    },
    send() {
      console.log('Enter');
      this.$emit('send');
    },
    evaluateForm() {
      this.fields.forEach((field) => {
        const { isOptional } = field;
        if (isOptional) {
          field.isValid = true;
          return;
        }
        if (field.type === 'textField') {
          const { validation } = field;
          if (!validation) {
            field.isValid = field.value.length > 0;
            return;
          }
          const { type } = validation;

          switch (type) {
            case 'email': {
              // eslint-disable-next-line
              const mailregex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
              field.isValid = field.value.match(mailregex);
              return;
            }
            case 'number': {
              field.isValid = !isNaN(parseInt(field.value, 10));
              return;
            }
            default: {
              field.isValid = field.value.length > 0;
              return;
            }
          }
        }
        if (field.type === 'radioGroup' || field.type === 'datePicker') field.isValid = field.value !== null && field.value !== '';
        if (field.type === 'multiSelect') field.isValid = !!field.options.find(option => option.value);
        if (field.type === 'datePicker') {
          if (!field.value) field.isValid = false;
          else field.isValid = !!field.value.match(/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)\d{2})$/);
        }
        if (!this.shouldShow(field.condition)) field.isValid = true;
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  form
    margin-bottom 2rem
</style>
