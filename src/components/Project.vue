<template>
  <div>
    <div class="row">
      <ProjectItem
        v-for="project in projects"
        :key="project.id"
        :project="project"
        :BASEURL="BASEURL"
        @set-projectId2="setProjectId2"
        @to-kanban="toKanban"
      ></ProjectItem>

      <!-- ADD PROJECT BUTTON -->
      <AddProject></AddProject>
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
    setProjectId2(projectId) {
      // this.ProjectId = projectId;
      this.$emit("set-projectId", projectId);
    },
    toKanban(page) {
      this.$emit("change-page", page);
    }
  },
  created() {
    this.fetchProject();
  }
};
</script>

<style>
</style>