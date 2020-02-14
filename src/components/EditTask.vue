<template>
  <div
    style="position: absolute; z-index: 1; left: 0; top: 0; width: 100vw; height: 100vh;"
  >
    <div
      class="row"
      style="background: rgba(0,0,0,0.7); width: 100%; height: 100%;  margin: 0; display: flex; justify-content: center; align-items: center;"
    >
      <div class="row">
        <div class="col">
          <div
            class="card-panel orange lighten-4"
            style="padding-top: 0; padding-bottom: 0;"
          >
            <span class="white-text">
              <!-- Form -->

              <div class="row">
                <form class="col s12 editForm" @submit.prevent="editTask">
                  <div class="row">
                    <div class="input-field col s12">
                      <input
                        id="title"
                        type="text"
                        class="validate editTask"
                        v-model="taskTitle"
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="input-field col s12">
                      <textarea
                        id="description"
                        class="materialize-textarea editTask"
                        v-model="taskDescription"
                      ></textarea>
                    </div>
                    <div
                      class="input-field col s12"
                      style="width: 100%; display: flex;justify-content: center;"
                    >
                      <button
                        class="btn waves-effect waves-light orange"
                        type="submit"
                      >
                        Submit
                        <i class="material-icons right">send</i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              <!--  -->
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      task: {},
      taskTitle: "",
      taskDescription: ""
    };
  },
  props: {
    TaskId: Number,
    BASEURL: String
  },
  methods: {
    fetchOneTask() {
      axios({
        method: "get",
        url: this.BASEURL + "task/" + this.TaskId,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          this.task = data;
          this.taskTitle = data.title;
          this.taskDescription = data.description;
        })
        .catch(err => {
          this.$alertify.error(err.response.data.msg);
        });
    },
    editTask() {
      axios({
        method: "put",
        url: this.BASEURL + "task/" + this.TaskId,
        data: {
          title: this.taskTitle,
          description: this.taskDescription
        },
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          this.$alertify.success(data.msg);
          this.$emit("changePage", "kanban");
        })
        .catch(err => {
          this.$alertify.error(err.response.data.msg);
        });
    }
  },
  created() {
    this.fetchOneTask();
  }
};
</script>

<style scoped>
.editForm {
  width: 40vw !important;
}

@media (max-width: 800px) {
  .editForm {
    width: 90vw !important;
  }
}
</style>