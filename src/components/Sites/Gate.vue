<template lang="pug">
  div
    nav.navbar
      .navbar-end
        .navbar-item
          languageButton
    .section
      .notification.is-danger(v-if='failedAttempts > 0')
          button.delete(@click='failedAttempts = 0')
          | {{ $t('failedLogin') }}
      form.container
        h1.title {{ $t('welcome')}}
        h2.subtitle {{ $t('pleaseLogin') }}

        formBuilder(:fields='fields', @send='login()')
        label.checkbox
          input(
            type='checkbox',
            v-model='rememberMe')
          | &nbsp;{{ $t('rememberMe') }}
        br
        br
        input.button(type='submit', @click='login()', :value='$t("login")')
</template>

<script>
import Vue from 'vue';
import FormBuilder from '@/components/Form/FormBuilder';
import LanguageButton from '@/components/UIComponents/LanguageButton';

export default {
  name: 'Gate',
  components: { FormBuilder, LanguageButton },
  data() {
    return {
      rememberMe: true,
      failedAttempts: 0,
      fields: [
        {
          name: 'email',
          type: 'textField',
          label: {
            en: 'E-Mail',
            de: 'E-Mail',
          },
          value: '',
          placeholder: {
            en: '',
            de: '',
          },
          help: {
            en: 'Your email adress.',
            de: 'Ihre E-Mail Adresse.',
          },
          validation: {
            type: 'email',
          },
          condition: true,
          isValid: false,
        },
        {
          name: 'password',
          type: 'textField',
          label: {
            en: 'Password',
            de: 'Passwort',
          },
          value: '',
          placeholder: {
            en: '',
            de: '',
          },
          help: {
            en: 'Your passphrase.',
            de: 'Ihr Passwort.',
          },
          validation: {
            type: 'password',
          },
          condition: true,
          isValid: false,
        },
      ],
    };
  },
  mounted() {
    const rememberedEmail = localStorage.getItem('email');
    if (rememberedEmail) this.fields[0].value = rememberedEmail;
    window.addEventListener('keyup', (event) => {
      if (event.keyCode === 13) { 
          this.login();
        }
    });
    /*Vue.axios.post('/enroll', {
      email: 'foo@bar.org',
      password: 'foo@bar.org',
      firstName: 'Foo',
      lastName: 'Bar',
      institute: 'Institute of Foo',
    })
      .then()
      .catch();*/
  },
  methods: {
    login() {
      if (this.remberMe) localStorage.setItem('email', this.fields[0].value);
      else localStorage.removeItem('email');
      this.$auth.login({
        data: {
          email: this.fields[0].value,
          password: this.fields[1].value,
        },
        error: () => this.failedAttempts += 1,
        fetchUser: false,
        rememberMe: true,
      });
    },
  },
};
</script>

<style lang="stylus" scoped>
</style>
