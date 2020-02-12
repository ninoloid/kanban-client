<template>
  <div class="col s12 m6 xl3 kanbanContainer">
    <div class=" card" style="background: url('../assets/img/Orange.jpg');">
      <div class="card-content kanbanItem">
        <span class="card-title" style="font-weight: bold;">{{ title }}</span>

        <!-- CARDS -->
        <KanbanItem v-for="task in tasks" :key="task.id" :task="task">
        </KanbanItem>

        <a class="btn-floating halfway-fab waves-effect waves-light red"
          ><i class="material-icons">add</i></a
        >
      </div>
    </div>
  </div>
</template>

<script>
import KanbanItem from "./KanbanItem";

export default {
  props: {
    title: String,
    tasks: Array
  },
  components: {
    KanbanItem
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