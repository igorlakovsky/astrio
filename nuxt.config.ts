// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    // Using package name
    '@nuxtjs/stylelint-module',
  ],
  stylelint: {
    lintOnStart: false,
    fix: true,
  },
})
