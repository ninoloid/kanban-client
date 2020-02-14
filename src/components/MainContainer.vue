<template>
  <div>
    <NavBar
      :currentPage="currentPage"
      @changePage="changePage"
      :currentActiveUser="currentActiveUser"
    ></NavBar>

    <Login
      v-if="currentPage === 'login'"
      @changePage="changePage"
      @setCurrentActiveUser="setCurrentActiveUser"
      :BASEURL="BASEURL"
    ></Login>

    <div
      class="row"
      v-else-if="currentPage === 'kanban' || currentPage === 'editTask'"
    >
      <KanbanContainer
        title="Backlog"
        :tasks="getBacklog"
        :BASEURL="BASEURL"
        :ProjectId="ProjectId"
        @fetchTask="fetchTask"
        @setTaskId="showEditTask"
      ></KanbanContainer>
      <KanbanContainer
        title="Todo"
        :tasks="getTodo"
        :BASEURL="BASEURL"
        :ProjectId="ProjectId"
        @fetchTask="fetchTask"
        @setTaskId="showEditTask"
      ></KanbanContainer>
      <KanbanContainer
        title="Ongoing"
        :tasks="getOngoing"
        :BASEURL="BASEURL"
        :ProjectId="ProjectId"
        @fetchTask="fetchTask"
        @setTaskId="showEditTask"
      ></KanbanContainer>
      <KanbanContainer
        title="Done"
        :tasks="getDone"
        :BASEURL="BASEURL"
        :ProjectId="ProjectId"
        @fetchTask="fetchTask"
        @setTaskId="showEditTask"
      ></KanbanContainer>

      <div class="backButtonContainer">
        <a @click="changePage('project')"
          ><i class="medium material-icons backButton">fast_rewind</i></a
        >
      </div>
    </div>

    <Project
      v-if="currentPage === 'project'"
      :BASEURL="BASEURL"
      @setProjectId="setProjectId"
      @changePage="changePage"
    ></Project>

    <AddCollaborator
      v-if="currentPage === 'addCollaborator'"
      :ProjectId="ProjectId"
      :BASEURL="BASEURL"
      @changePage="changePage"
    ></AddCollaborator>

    <EditTask
      v-if="currentPage === 'editTask'"
      :TaskId="TaskId"
      :BASEURL="BASEURL"
      @changePage="changePage"
    ></EditTask>
  </div>
</template>

<script>
import KanbanContainer from "./KanbanContainer";
import NavBar from "./Navbar";
import Login from "./Login";
import Project from "./Project";
import AddCollaborator from "./Collaborator";
import EditTask from "./EditTask";
import axios from "axios";

export default {
  components: {
    KanbanContainer,
    NavBar,
    Login,
    Project,
    AddCollaborator,
    EditTask
  },
  data() {
    return {
      BASEURL: "https://sleepy-lowlands-09717.herokuapp.com/",
      currentPage: null,
      ProjectId: null,
      tasks: [],
      currentActiveUser: null,
      TaskId: null
    };
  },
  methods: {
    changePage(page) {
      this.currentPage = page;
    },
    setCurrentActiveUser(user) {
      this.currentActiveUser = user;
    },
    checkToken() {
      if (!localStorage.access_token) {
        this.currentPage = "login";
      } else {
        this.currentPage = "project";
        this.currentActiveUser = localStorage.username;
      }
    },
    setProjectId(projectId) {
      this.ProjectId = projectId;
    },
    showEditTask(taskId) {
      this.TaskId = taskId;
      this.currentPage = "editTask";
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
          this.$alertify.error(err.response.data.msg);
        });
    }
  },
  created() {
    this.checkToken();
  },
  watch: {
    ProjectId() {
      if (localStorage.access_token) {
        this.fetchTask();
      }
    },
    currentPage() {
      if (localStorage.access_token) {
        this.fetchTask();
      }
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

<style scoped>
.backButtonContainer {
  position: fixed;
  bottom: -0.5rem;
  left: 0.5rem;
}
.backButton {
  cursor: pointer;
  color: red;
  transition: 1s;
}

.backButton:hover {
  cursor: pointer;
  color: blue;
  transition: 1s;
}
</style>