<template>
  <div
    class="loginContainer"
    style="width: 100%; height: 90vh; display: flex; justify-content: center; align-items: center;"
  >
    <div style="max-width: 600px;" class="mainLogin">
      <div class="col s12 m12">
        <div class="card horizontal">
          <div class="card-image loginImage">
            <img src="https://picsum.photos/300/400" />
          </div>
          <div class="card-stacked" style="align-self: center;">
            <div class="card-content">
              <div class="row">
                <form
                  class="col s12"
                  @submit.prevent="haveAccount ? login() : register()"
                >
                  <div class="row" v-if="haveAccount">
                    <div class="input-field col s12 loginBox">
                      <input
                        id="identification"
                        type="text"
                        class="validate"
                        v-model="identification"
                      />
                      <label for="identification">Username or email</label>
                    </div>
                  </div>

                  <div class="row registerItem" v-if="!haveAccount">
                    <div class="input-field col s12 loginBox">
                      <input
                        id="username"
                        type="text"
                        class="validate"
                        v-model="username"
                      />
                      <label for="username">Username</label>
                    </div>
                  </div>

                  <div class="row registerItem" v-if="!haveAccount">
                    <div class="input-field col s12 loginBox">
                      <input
                        id="email"
                        type="email"
                        class="validate"
                        v-model="email"
                      />
                      <label for="email">Email Address</label>
                    </div>
                  </div>

                  <div class="row">
                    <div class="input-field col s12 loginBox">
                      <input
                        id="password"
                        type="password"
                        class="validate"
                        v-model="password"
                      />
                      <label for="password">Password</label>
                    </div>
                  </div>

                  <button
                    class="btn waves-effect waves-light"
                    type="submit"
                    name="action"
                    style="width: 100%;"
                    v-if="haveAccount"
                  >
                    Login
                    <i class="material-icons right">send</i>
                  </button>

                  <button
                    class="btn waves-effect waves-light"
                    type="submit"
                    name="action"
                    style="width: 100%;"
                    v-if="!haveAccount"
                  >
                    Register
                    <i class="material-icons right">send</i>
                  </button>

                  <p
                    v-if="haveAccount"
                    style="margin-top: 15px"
                    class="labelContainer"
                  >
                    <span class="linkLabel">Don't have account?</span>
                    <a href="" @click.prevent="isRegistered(false)"
                      >Register here!</a
                    >
                  </p>

                  <p
                    v-if="!haveAccount"
                    style="margin-top: 15px"
                    class="labelContainer"
                  >
                    <span class="linkLabel">Have an account?</span>
                    <a href="" @click.prevent="isRegistered(true)"
                      >Login here!</a
                    >
                  </p>
                  <GoogleLogin
                    :params="params"
                    :renderParams="renderParams"
                    :onSuccess="onSignIn"
                    style="margin-top: 20px"
                    v-if="haveAccount"
                  ></GoogleLogin>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import GoogleLogin from "vue-google-login";

export default {
  components: {
    GoogleLogin
  },
  data() {
    return {
      haveAccount: true,
      username: "",
      email: "",
      password: "",
      identification: "",
      params: {
        client_id:
          "176024940848-oq1flsps09gkdlg95216avrlp7ivtrro.apps.googleusercontent.com"
      },
      renderParams: {
        width: 250,
        longtitle: true,
        theme: "dark"
      }
    };
  },
  props: {
    BASEURL: String
  },
  methods: {
    login() {
      axios({
        method: "post",
        url: this.BASEURL + "login",
        data: {
          identification: this.identification,
          password: this.password
        }
      })
        .then(({ data }) => {
          this.$alertify.success(`Welcome back, ${this.identification}!`);
          this.$emit("changePage", "project");
          this.$emit("setCurrentActiveUser", data.username);
          this.identification = "";
          this.password = "";

          localStorage.access_token = data.token;
          localStorage.username = data.username;
        })
        .catch(err => {
          this.$alertify.error(err.response.data.msg);
          this.identification = "";
          this.password = "";
        });
    },
    register() {
      axios({
        method: "post",
        url: this.BASEURL + "register",
        data: {
          username: this.username,
          email: this.email,
          password: this.password
        }
      })
        .then(({ data }) => {
          this.$alertify.success(`Welcome, ${data.username}!`);
          this.$emit("changePage", "project");
          this.$emit("setCurrentActiveUser", data.username);
          this.username = "";
          this.email = "";
          this.password = "";

          localStorage.access_token = data.token;
          localStorage.username = data.username;
        })
        .catch(err => {
          this.$alertify.error(err.response.data.errors[0]);
          this.username = "";
          this.email = "";
          this.password = "";
        });
    },
    isRegistered(bool) {
      this.identification = "";
      this.username = "";
      this.email = "";
      this.password = "";
      this.haveAccount = bool;
    },
    onSignIn(googleUser) {
      const google_token = googleUser.getAuthResponse().id_token;
      axios({
        method: "POST",
        url: this.BASEURL + "google-auth",
        data: { google_token }
      })
        .then(({ data }) => {
          localStorage.access_token = data.token;
          localStorage.username = data.username;

          this.$alertify.success(`Welcome, ${data.username}!`);
          this.$emit("changePage", "project");
          this.$emit("setCurrentActiveUser", data.username);
        })
        .catch(err => {
          this.$alertify.error(err.response.data.msg);
        });
    }
  }
};
</script>

<style scoped>
.registerItem {
  margin-bottom: 0;
}

.loginBox {
  margin-bottom: 0;
}

@media (max-width: 992px) {
  .loginImage {
    align-self: center;
  }
}

@media (max-width: 480px) {
  .loginBox {
    margin: 0;
  }

  .mainLogin {
    padding: 0.5rem;
  }

  .linkLabel {
    display: none;
    color: red;
  }

  .labelContainer {
    font-size: 0.9rem;
  }

  .loginImage {
    display: none;
  }
}
</style>