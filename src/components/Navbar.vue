<template>
  <nav>
    <div class="nav-wrapper deep-orange lighten-3">
      <a
        style="margin-left: 1rem"
        class="brand-logo center hide-on-med-and-down"
        ><i class="material-icons">view_day</i>Kanbandung</a
      >
      <ul id="helloUsername" class="left">
        <li
          v-if="currentPage !== 'login'"
          style="margin-left: 1rem; font-size: 1.5rem"
        >
          Hello, {{ currentActiveUser }}
        </li>
      </ul>
      <ul id="nav-mobile" class="right">
        <!-- <li v-if="currentPage !== 'login'">
          <a @click="searching = !searching"
            ><i class="material-icons">search</i></a
          >
        </li> -->
        <li v-if="currentPage !== 'login'">
          <a @click.prevent="logout">Sign Out</a>
        </li>
      </ul>
      <!-- <SearchBar v-if="searching"></SearchBar> -->
    </div>
  </nav>
</template>

<script>
import Vue from "vue";
import { LoaderPlugin } from "vue-google-login";
// import SearchBar from "./SearchBar";

export default {
  data() {
    return {
      searching: false,
      username: null
    };
  },
  props: {
    currentPage: String,
    currentActiveUser: String
  },
  methods: {
    logout() {
      localStorage.clear();
      this.searching = false;
      this.signOut();
      this.$emit("changePage", "login");
    },
    signOut() {
      Vue.GoogleAuth.then(auth2 => {
        auth2.signOut();
      });
    }
  },
  watch: {
    currentActiveUser(username) {
      this.username = username;
    }
  }
};
</script>

<style scoped>
@media (max-width: 720px) {
  #helloUsername {
    display: none;
  }
}
</style>