<template>
  <div>
    <b-alert show variant="warning">
      This is a secure page!
    </b-alert>
    <b-row>
      <b-col md="8">
        <b-card title="Response">
          <pre>{{ debug || 'No response yet' }}</pre>
        </b-card>
      </b-col>
      <b-col md="4">
        <b-card title="Scopes" class="mb-2">
          User: <b-badge>{{ $auth.hasScope('user') }}</b-badge>
          Test: <b-badge>{{ $auth.hasScope('test') }}</b-badge>
          Admin: <b-badge>{{ $auth.hasScope('admin') }}</b-badge>
        </b-card>
        <b-card title="token">
          {{ token || 'No token yet' }}
        </b-card>
      </b-col>
    </b-row>
    <hr>
    <b-btn-group>
      <b-button @click="fetchSomething()">
        API Call
      </b-button>
      <b-button @click="$auth.fetchUser()">
        Fetch User
      </b-button>
      <b-button @click="$auth.logout()">
        Logout
      </b-button>
    </b-btn-group>
  </div>
</template>

<script>
export default {
  middleware: ['auth'],
  data() {
    return {
      debug: '',
      token: ''
    }
  },
  computed: {
    state() {
      return JSON.stringify(this.$auth.$state, undefined, 2)
    }
  },
  methods: {
    async fetchSomething() {
      this.token = await this.$auth.getToken('azurestorageaad')
      this.$axios.onRequest((config) => {
        config.headers['Access-Control-Allow-Origin'] = '*'
        config.headers['x-ms-version'] = '2017-11-09'
        config.headers['x-ms-date'] = (new Date()).toGMTString()
      })
      // Change the url in the following line
      const ip = await this.$axios.$get('https://kvaesauthdemo.blob.core.windows.net/test/styles.css')
      this.debug = ip
    }
  }
}
</script>
