<template lang="pug">
  .container
    modal(
      :class='showModal ? "is-active" : ""',
      :info='saveWarning',
      @accept='save(); exit();',
      @reject='exit();',
      @close='showModal = false')
    .navbar
      .navbar-item
        a.button.is-medium#btnBack(
          @click='tryExit')
          span.icon.is-small
            i.fa.fa-arrow-left
          span(
            v-html='$t("back")')

    .section
      .container
        formBuilder(
          :fields='fields',
          :validate='validate')

        .buttons(
            v-if='form')
          a.button.is-primary(
            @click='save()'
            v-html='$t("save")')

          a.button.is-primary(
            @click='save(); exit();'
            v-html='$t("save") + " & " + $t("exit").toLowerCase()')

          a.button.is-danger(
            @click='tryExit()'
            v-html='$t("exit")')
</template>

<script>
import FormBuilder from '@/components/Form/FormBuilder';
import Modal from '@/components/UIComponents/Modal';
import API from '@/api';

export default {
  name: 'EditForm',
  data() {
    return {
      fields: [],
      validate: false,
      form: null,
      saveWarning: {
        de: 'Es gibt ungesicherte Änderungen in diesem Formular. Möchten Sie diese speichern?',
        en: 'There are unsaved changes made to this form. Do you want to save them before you quit?',
      },
      showModal: false,
    };
  },
  created() {
    API.getFormById(this._id).then((form) => {
      this.form = JSON.parse(JSON.stringify(form));
      this.fields = JSON.parse(JSON.stringify(form.fields));
      this.validate = !this.isNew;
    });

    const englishStrings = {
      dashboard: 'Dashboard',
    };
    const germanStrings = {
      dashboard: 'Übersicht',
    };
    this.$i18n.add('en', englishStrings);
    this.$i18n.add('de', germanStrings);
  },
  beforeDestroy() {
    this.tryExit();
  },
  props: ['_id', 'isNew'],
  components: {
    FormBuilder,
    Modal,
  },
  methods: {
    tryExit() {
      if (JSON.stringify(this.fields) === JSON.stringify(this.form.fields)) this.exit();
      else this.showModal = true;
    },
    exit() {
      setTimeout(() => this.$router.push({ name: 'FormSummary', params: { _id: this.form._id } }), 200);
    },
    save() {
      this.validate = true;
      if (this._id && this.form && this.fields) {
        this.form.fields = JSON.parse(JSON.stringify(this.fields));
        this.form.lastEdit = new Date();
        API.saveForm(this.form);
      }
    },
  },
};
</script>

<style lang="stylus">
</style>
