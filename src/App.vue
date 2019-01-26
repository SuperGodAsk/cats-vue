<template>
  <v-app>
    <v-navigation-drawer
            fixed
            :mini-variant="miniVariant"
            v-model="drawer"
            app
    >
      <v-list>
        <v-list-tile
                router
                :to="item.to"
                :key="i"
                v-for="(item, i) in items"
                exact
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn icon @click.stop="miniVariant = !miniVariant" v-if="drawer">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat to="/" exact>Home</v-btn>
      </v-toolbar-items>

    </v-toolbar>
    <v-content>
      <v-container fill-height>
        <v-slide-y-transition mode="out-in">
            <router-view></router-view>
        </v-slide-y-transition>
      </v-container>
    </v-content>
    <v-footer :fixed="fixed" app>
    </v-footer>
  </v-app>
</template>
<script>
    import firebase from 'firebase'

    export default {
        created(){
            this.$store.commit('setUserInfo',firebase.auth().currentUser)
            this.$router.options.routes.forEach(route => {
                this.items.push({
                    icon: route.mdIcon,
                    title: route.title,
                    to: route.path,
                })
            })

        },
        data () {
            return {
                drawer: false,
                fixed: false,
                items: [],
                miniVariant: false,
                right: true,
                title: 'Котеечный приют',
                name: ''
            }
        }
    }
</script>
