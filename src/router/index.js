import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from '@/components/Sites/Dashboard';
import UserProfile from '@/components/Sites/UserProfile';
import EditForm from '@/components/Sites/EditForm';
import FormSummary from '@/components/Sites/FormSummary';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
    },
    {
      path: '/profile',
      name: 'UserProfile',
      component: UserProfile,
    },
    {
      path: '/form/:_id/edit',
      name: 'EditForm',
      component: EditForm,
      props: true,
    },
    {
      path: '/form/:_id/',
      name: 'FormSummary',
      component: FormSummary,
      props: true,
    },
  ],
});
