const Vue = require('vue')
const Vuex = require('./dist/vuex')

Vue.use(Vuex)

const MY_PROP = 'myProperty'
const store = new Vuex.Store({
  strict: true,
  state: {
    someFakePropertyAndNoTheOneIShouldHave: 12345
  },
  actions: {
    [MY_PROP] ({ commit }, data) {
      console.log('>> Action', data)
      commit(MY_PROP, data)
    }
  },
  mutations: {
    [MY_PROP] (state, data) {
      console.log('>> Mutation', data)
      state[MY_PROP] = data
    }
  },
  getters: {
    [MY_PROP] (state) {
      console.log('>> Getter', state[MY_PROP])
      return state[MY_PROP]
    }
  },
  modules: {

  }
})

store.registerModule('MyModule', {
  namespaced: true,
  modules: {
    baz: {
      namespaced: true,
      state: {
        // foo: 'bar',
        fuji: 'bar'
      },
      actions: {
        foo ({ commit }, data) {
          console.log('>> foo Action', data)
          commit('foo', data)
        }
      },
      mutations: {
        foo (state, data) {
          console.log('>> foo Mutation', data)
          state['foo'] = data
        }
      },
      getters: {
        foo (state) {
          console.log('>> foo Getter', state['foo'])
          return state['foo']
        }
      }

    }
  }

})

new Vue({
  store: store,
  el: '#app',
  computed: {
    myData () {
      console.log(MY_PROP in this.$store.getters) // true
      return this.$store.getters[MY_PROP] || 'Store gave me nothing :('
    }
  },
  created () {
    console.log('>> Created', this.myData)
  }
})

store.dispatch(MY_PROP, ['foo', 'bar'])
store.dispatch('MyModule/baz/foo', 121212)
