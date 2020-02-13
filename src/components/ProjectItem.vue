<template>
  <div
    class="col s6 m4 l3 xl2"
    style="padding: 0 0.3rem;"
    @click="setProjectId"
  >
    <div class="card" style="background:url('../assets/img/White.jpg')">
      <i
        style="position: absolute; top: 0.3rem; right: 0.3rem"
        @click.prevent="addColl"
        class="material-icons detailButton"
        >dehaze</i
      >
      <i
        style="position: absolute; top: 1.8rem; right: 0.3rem"
        @click.prevent="deleteProject"
        class="material-icons deleteProject"
        >delete_forever</i
      >
      <div class="card-content">
        <span class="card-title" style="font-size: 1.2rem; font-weight:bold">
          {{ project.name }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      changepage: true
    };
  },
  props: {
    project: Object,
    BASEURL: String
  },
  methods: {
    setProjectId() {
      if (this.changepage) {
        this.$emit("setProjectId", this.project.id);
        this.$emit("changePage", "kanban");
      }
    },
    addColl() {
      this.$emit("setProjectId", this.project.id);
      this.$emit("changePage", "addCollaborator");
    },
    deleteProject() {
      this.changepage = false;
      axios({
        method: "delete",
        url: this.BASEURL + "project/" + this.project.id,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          this.$alertify.success(data.msg);
          this.changepage = true;
          this.$emit("refetchProject");
        })
        .catch(err => {
          this.$alertify.error(err.response.data.msg);
          this.changepage = true;
        });
    }
  }
};
</script>

<style scoped>
.detailButton {
  color: blue;
  transition: 1s;
  cursor: pointer;
}

.detailButton:hover {
  color: purple;
  transition: 1s;
}

.deleteProject {
  color: red;
  transition: 1s;
  cursor: pointer;
}

.deleteProject:hover {
  color: darkred;
  transition: 1s;
}
</style>