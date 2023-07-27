// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: [
    // Using package name
    '@nuxtjs/stylelint-module',
    '@element-plus/nuxt',
  ],
  stylelint: {
    cache: false,
    lintOnStart: false,
    fix: true,
  },
});
