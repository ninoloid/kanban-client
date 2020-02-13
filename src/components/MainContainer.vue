<template>
  <div>
    <NavBar :currentPage="currentPage" @changePage="changePage"></NavBar>

    <Login v-if="currentPage === 'login'" @changePage="changePage"></Login>

    <div class="row" v-else-if="currentPage === 'kanban'">
      <KanbanContainer
        title="Backlog"
        :tasks="getBacklog"
        :BASEURL="BASEURL"
        :ProjectId="ProjectId"
        @fetchTask="fetchTask"
      ></KanbanContainer>
      <KanbanContainer
        title="Todo"
        :tasks="getTodo"
        :BASEURL="BASEURL"
        :ProjectId="ProjectId"
        @fetchTask="fetchTask"
      ></KanbanContainer>
      <KanbanContainer
        title="Ongoing"
        :tasks="getOngoing"
        :BASEURL="BASEURL"
        :ProjectId="ProjectId"
        @fetchTask="fetchTask"
      ></KanbanContainer>
      <KanbanContainer
        title="Done"
        :tasks="getDone"
        :BASEURL="BASEURL"
        :ProjectId="ProjectId"
        @fetchTask="fetchTask"
      ></KanbanContainer>
    </div>

    <Project
      v-if="currentPage === 'project'"
      :BASEURL="BASEURL"
      @setProjectId="setProjectId"
      @changePage="changePage"
    ></Project>
  </div>
</template>

<script>
import KanbanContainer from "./KanbanContainer";
import NavBar from "./Navbar";
import Login from "./Login";
import Project from "./Project";
import axios from "axios";

export default {
  components: {
    KanbanContainer,
    NavBar,
    Login,
    Project
  },
  data() {
    return {
      BASEURL: "http://localhost:3000/",
      currentPage: null,
      ProjectId: null,
      tasks: []
    };
  },
  methods: {
    changePage(page) {
      this.currentPage = page;
    },
    checkToken() {
      if (!localStorage.access_token) {
        this.currentPage = "login";
      } else {
        this.currentPage = "project";
      }
    },
    setProjectId(projectId) {
      this.ProjectId = projectId;
    },
    fetchTask() {
      axios({
        method: "post",
        url: this.BASEURL + "task/getTask",
        data: {
          ProjectId: this.ProjectId
        },
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          this.tasks = data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.checkToken();
  },
  watch: {
    ProjectId() {
      this.fetchTask();
    }
  },
  computed: {
    getBacklog() {
      return this.tasks.filter(task => task.Category.name === "backlog");
    },
    getTodo() {
      return this.tasks.filter(task => task.Category.name === "todo");
    },
    getOngoing() {
      return this.tasks.filter(task => task.Category.name === "ongoing");
    },
    getDone() {
      return this.tasks.filter(task => task.Category.name === "done");
    }
  }
};
</script>

<style>
</style>