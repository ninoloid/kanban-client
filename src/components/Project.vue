<template>
  <div>
    <div class="row">
      <ProjectItem
        v-for="project in projects"
        :key="project.id"
        :project="project"
        :BASEURL="BASEURL"
        @setProjectId="setProjectId"
        @changePage="changePage"
        @refetchProject="refetchProject"
      ></ProjectItem>

      <!-- ADD PROJECT BUTTON -->
      <AddProject
        @refetchProject="refetchProject"
        :BASEURL="BASEURL"
      ></AddProject>
      <!--  -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ProjectItem from "./ProjectItem";
import AddProject from "./addProject";

export default {
  data() {
    return {
      projects: []
    };
  },
  props: {
    BASEURL: String
  },
  components: {
    ProjectItem,
    AddProject
  },
  methods: {
    fetchProject() {
      axios({
        methods: "get",
        url: this.BASEURL + "project",
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          this.projects = data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    setProjectId(projectId) {
      this.$emit("setProjectId", projectId);
    },
    changePage(page) {
      this.$emit("changePage", page);
    },
    refetchProject() {
      this.fetchProject();
    }
  },
  created() {
    this.fetchProject();
  }
};
</script>

<style>
</style>