// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: [
    // Using package name
    '@nuxtjs/stylelint-module',
  ],
  stylelint: {
    cache: false,
    lintOnStart: false,
    fix: true,
  },
  css: ['ant-design-vue/dist/reset.css'],
});
