<template lang="pug">
  .container
    .navbar
      .navbar-item
        a.button.is-medium.is-link(
          @click='newForm("businessTrip")')
          span.icon.is-small
            i.fa.fa-plus
          span(
            v-html='$t("businessTrip")')

      .navbar-end
        .navbar-item
          .buttons.is-grouped
            a.button.is-medium#btnFilter(
              @click='showFilter = !showFilter',
              :class='showFilter ? "is-link" : ""')
              span.icon.is-small
                i.fa.fa-filter

            a.button.is-medium#btnGrid(
              :class='display === "grid" ? "is-link" : ""',
              @click='setDisplay("grid")')
              span.icon.is-small
                i.fa.fa-th

            a.button.is-medium#btnList(
              :class='display === "list" ? "is-link" : ""',
              @click='setDisplay("list")')
              span.icon.is-small
                i.fa.fa-th-list

    .navbar(
      v-if='showFilter')
        .navbar-item
          .buttons
            label.button(
              :class='showBusinessTrips ? "is-link" : ""')
              input.checkbox(type='checkbox',
                v-model='showBusinessTrips',
                @change='filter()')
              span(v-html='$t("businessTrip")')

        .navbar-item
          .buttons
            label.button(
              v-for='tag in tags'
              :class='tag.show ? tag.colorClass : "is-outlined"')
              input.checkbox(type='checkbox',
                v-model='tag.show',
                @change='filter()')
              span(v-html='$t(tag.name)')

    gridView(
      :forms='showFilter ? filteredForms : forms',
      v-if='display === "grid"')
    listView(
      :forms='showFilter ? filteredForms : forms',
      v-if='display !== "grid"')
</template>

<script>
import GridView from '@/components/UIComponents/GridView';
import ListView from '@/components/UIComponents/ListView';
import API from '@/api';

export default {
  name: 'Dashboard',
  components: {
    GridView,
    ListView,
  },
  data() {
    return {
      display: localStorage.getItem('display'),
      filteredForms: [],
      forms: [],
      showFilter: false,
      showBusinessTrips: true,
      showVacation: true,
      tags: [
        {
          name: 'draft',
          colorClass: 'is-warning',
          show: true,
        },
        {
          name: 'sent',
          colorClass: 'is-info',
          show: true,
        },
        {
          name: 'accepted',
          colorClass: 'is-success',
          show: true,
        },
        {
          name: 'rejected',
          colorClass: 'is-danger',
          show: true,
        },
      ],
    };
  },
  methods: {
    setDisplay(type) {
      this.display = type;
      localStorage.setItem('display', type);
    },
    newForm(type) {
      if (type === 'businessTrip') {
        API.generateNewForm(type).then((_id) => {
          this.$router.push({ name: 'EditForm', params: { _id, isNew: true } });
        });
      }
    },
    filter() {
      this.filteredForms = this.forms.filter((form) => {
        if (form.type === 'businessTrip' && !this.showBusinessTrips) return false;
        return !!this.tags.find(tag => tag.name === form.tag && tag.show);
      });
    },
  },
  mounted() {
    if (!localStorage.getItem('display')) this.setDisplay('grid');
    API.getFormsSummarized().then((forms) => {
      this.forms = forms;
      this.filteredForms = forms;
    });
  },
};
</script>

<style lang="stylus" scoped>
#btnFilter
  margin-right 3rem
.container
  overflow-x hidden
</style>
