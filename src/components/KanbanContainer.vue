<template>
  <div class="col s12 m6 xl3 kanbanContainer">
    <div class=" card" style="background: url('../assets/img/Orange.jpg');">
      <div class="card-content kanbanItem">
        <span class="card-title" style="font-weight: bold;">{{ title }}</span>

        <!-- CARDS -->
        <KanbanItem v-for="task in tasks" :key="task.id" :task="task">
        </KanbanItem>

        <AddTaskForm @addTask="addTask"></AddTaskForm>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import KanbanItem from "./KanbanItem";
import AddTaskForm from "./addTaskForm";

export default {
  props: {
    title: String,
    tasks: Array,
    BASEURL: String,
    ProjectId: Number
  },
  components: {
    KanbanItem,
    AddTaskForm
  },
  computed: {
    getCategoryId() {
      let CategoryId;
      if (this.title === "Backlog") {
        CategoryId = 1;
      } else if (this.title === "Todo") {
        CategoryId = 2;
      } else if (this.title === "Ongoing") {
        CategoryId = 3;
      } else {
        CategoryId = 4;
      }
      return CategoryId;
    }
  },
  methods: {
    addTask(payload) {
      axios({
        method: "post",
        url: this.BASEURL + "task",
        data: {
          title: payload.title,
          description: payload.description,
          CategoryId: this.getCategoryId,
          ProjectId: this.ProjectId
        },
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(() => {
          this.$alertify.success(`Task added successfully`);
          this.$emit("fetchTask");
        })
        .catch(err => {
          this.$alertify.error(err.response.data.msg);
        });
    }
  }
};
</script>

<style scoped>
.card .kanbanItem {
  padding: 1.5rem 0.5rem 0.5rem 0.5rem;
  overflow: auto;
}

.row .kanbanContainer {
  padding: 0.2rem 0.2rem;
}

@media (min-width: 992px) {
  .card .kanbanItem {
    max-height: 83vh;
  }
}

::-webkit-scrollbar {
  width: 0.5rem;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px black;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: coral;
  border-radius: 0 5px 5px 0;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgb(250, 106, 53);
}
</style>