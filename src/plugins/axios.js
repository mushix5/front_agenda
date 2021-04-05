import Vue from 'vue';
import axios from 'axios';

const axiosConfig = {
    baseURL: process.env.VUE_APP_URL,
    timeout: 30000,
  };

Vue.prototype.$http = axios.create(axiosConfig);
