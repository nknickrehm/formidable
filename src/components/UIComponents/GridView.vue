<template lang="pug">
  .section.columns.is-multiline
    gridViewItem(v-for='form in forms',
      :form='form',
      :key='form._id')
</template>

<script>
import GridViewItem from '@/components/UIComponents/GridViewItem';

export default {
  name: 'GridView',
  components: { GridViewItem },
  props: ['forms'],
};
</script>

<style lang="stylus">
</style>
