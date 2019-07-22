export default {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/eslint-module',
    '@nuxtjs/auth'
  ],
  // Auth
  auth: {
    redirect: {
      callback: '/callback'
    },
    strategies: {
      azurestorageaad: {
        _scheme: 'oauth2',
        authorization_endpoint:
          'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
        userinfo_endpoint: false,
        scope: ['https://storage.azure.com/user_impersonation'],
        access_type: 'code',
        access_token_endpoint:
          'https://login.microsoftonline.com/common/oauth2/v2.0/token',
        response_type: 'token',
        token_type: 'Bearer',
        redirect_uri: 'http://localhost:3000/callback',
        client_id: 'USE_YOUR_CLIENT/APP_ID',
        token_key: 'access_token',
        state: 'CHANGE_THIS_TO_A_UNIQUE_AND_NON_GUESSABLE'
      }
    }
  },
  // Router
  router: {
    middleware: ['auth']
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
