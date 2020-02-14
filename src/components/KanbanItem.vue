<template>
  <div>
    <div class="card" style="background: url('../assets/img/Blackboard.jpg')">
      <div class="card-content">
        <span
          class="card-title activator white-text text-darken-4"
          style="font-weight: bold; margin-bottom: 1rem"
        >
          {{ task.title }}<i class="material-icons right">more_vert</i>
        </span>
        <div
          style="position: absolute; bottom: 0; left: 0; width: 100%; display: flex; justify-content: space-between"
        >
          <button
            class="changeCategory waves-effect waves-light btn-small blue"
            @click.prevent="changeCategory('prev')"
            v-if="task.CategoryId > 1"
          >
            <i class="material-icons">arrow_back</i>
          </button>
          <button
            class="changeCategory waves-effect waves-light btn-small yellow"
            @click.prevent="setTaskId(task.id)"
          >
            <i class="material-icons">edit</i>
          </button>
          <button
            class="changeCategory waves-effect waves-light btn-small red"
            @click.prevent="deleteTask"
          >
            <i class="material-icons">delete_sweep</i>
          </button>
          <button
            class="changeCategory waves-effect waves-light btn-small green"
            @click.prevent="changeCategory('next')"
            v-if="task.CategoryId < 4"
          >
            <i class="material-icons">arrow_forward</i>
          </button>
        </div>
      </div>
      <div
        class="card-reveal"
        style="background: url('../assets/img/Darkblue.jpg')"
      >
        <span
          class="card-title white-text text-darken-4"
          style="font-size: 1.3rem; font-weight: bold;"
        >
          Description<i class="material-icons right">close</i>
        </span>
        <p class="white-text">
          {{ task.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    task: Object,
    BASEURL: String
  },
  methods: {
    changeCategory(type) {
      let CategoryId = this.task.CategoryId;
      const id = this.task.id;
      if (CategoryId >= 2 && type === "prev") {
        CategoryId--;
      } else if (CategoryId <= 3 && type === "next") {
        CategoryId++;
      } else {
        this.$alertify.error("Cannot change category");
      }
      axios({
        method: "patch",
        url: this.BASEURL + "task/" + id,
        data: {
          CategoryId
        },
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          this.$alertify.success(data.msg);
          this.$emit("fetchTask");
        })
        .catch(err => {
          this.$alertify.error(err.response.data.msg);
        });
    },
    deleteTask() {
      const id = this.task.id;
      axios({
        method: "delete",
        url: this.BASEURL + "task/" + id,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          this.$alertify.success(data.msg);
          this.$emit("fetchTask");
        })
        .catch(err => {
          this.$alertify.error(err.response.data.msg);
        });
    },
    setTaskId(taskId) {
      this.$emit("setTaskId", taskId);
    }
  }
};
</script>

<style scoped>
.card .card-reveal {
  padding: 0.5rem 1rem;
}

.card .card-content .card-title {
  margin-bottom: 0;
}

.changeCategory {
  color: black;
  font-weight: bold;
  height: 1.5rem;
  line-height: 1.5rem;
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
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgb(250, 106, 53);
}
</style>