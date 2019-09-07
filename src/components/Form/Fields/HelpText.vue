<template lang="pug">
  .column
    .message
      .message-header
        p {{ $t("help") }}

      .message-body
        p(v-html='$t(mainContent)')
        p(v-for='additional in additionalContent',
          v-if='additional.show',
          v-html='$t(additional.content)')
</template>

<script>
export default {
  name: 'HelpText',
  props: [
    'mainContent',
    'additionalContent',
  ],
};
</script>

<style lang="stylus" scoped>
  .message
    @media (min-width: 768px)
      position fixed
      top 15rem
      width 33% !important

    .message-body
      p:not(:first-child)
        margin-top 1rem
</style>
