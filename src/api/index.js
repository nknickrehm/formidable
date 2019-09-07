import Vue from 'vue';

export default {
  getUserProfile() {
    return new Promise((resolve, reject) => {
      Vue.axios.get('/user/profile/')
        .then(res => res.data)
        .then(res => resolve(res))
        .catch(e => reject(e));
    });
  },
  saveUserProfile(form) {
    return new Promise((resolve, reject) => {
      Vue.axios.put('/user/profile/', { form })
        .then(res => res.data)
        .then(res => resolve(res))
        .catch(e => reject(e));
    });
  },
  getFormsSummarized() {
    return new Promise((resolve, reject) => {
      Vue.axios.get('/user/forms?summarized=true')
        .then(res => res.data)
        .then(res => resolve(res))
        .catch(e => reject(e));
    });
  },
  getFormSummaryById(id) {
    return new Promise((resolve, reject) => {
      Vue.axios.get(`/user/forms/${id}/?summarized=true`)
        .then(res => res.data)
        .then(res => resolve(res))
        .catch(e => reject(e));
    });
  },
  getFormById(id) {
    return new Promise((resolve, reject) => {
      Vue.axios.get(`/user/forms/${id}/`)
        .then(res => res.data)
        .then(res => resolve(res))
        .catch(e => reject(e));
    });
  },
  getPDFById(id) {
    return new Promise((resolve, reject) => {
      Vue.axios.get(`/user/forms/${id}/pdf`)
        .then(res => res.data)
        .then(res => resolve(res))
        .catch(e => reject(e));
    });
  },
  removeFormById(id) {
    return new Promise((resolve, reject) => {
      Vue.axios.delete(`/user/forms/${id}/`)
        .then(res => res.data)
        .then(resolve())
        .catch(e => reject(e));
    });
  },
  generateNewForm(type) {
    return new Promise((resolve, reject) => {
      Vue.axios.post('/user/forms/', { type })
        .then(res => res.data)
        .then(res => resolve(res._id))
        .catch(e => reject(e));
    });
  },
  saveForm(form) {
    return new Promise((resolve, reject) => {
      Vue.axios.put(`/user/forms/${form._id}`, { form })
        .then(res => res.data)
        .then(resolve())
        .catch(e => reject(e));
    });
  },
  changeTagForForm(id, tag) {
    return new Promise((resolve, reject) => {
      Vue.axios.put(`/user/forms/${id}/tag`, { tag })
        .then(res => res.data)
        .then(resolve())
        .catch(e => reject(e));
    });
  },
  generatePDF(id) {
    return new Promise((resolve, reject) => {
      Vue.axios.get(`/user/forms/${id}/pdf`, { responseType: 'arraybuffer' })
        .then(res => resolve(new Blob([res.data], { type: 'application/pdf' })))
        .catch(e => reject(e));
    });
  },
};
