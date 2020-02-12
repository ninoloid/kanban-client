<template>
  <div>
    <div class="card" style="background: url('../assets/img/Blackboard.jpg')">
      <div class="card-content">
        <span class="card-title activator white-text text-darken-4">
          {{ task.title }}<i class="material-icons right">more_vert</i>
        </span>
      </div>
      <div
        class="card-reveal"
        style="background: url('../assets/img/Darkblue.jpg')"
      >
        <span class="card-title white-text text-darken-4">
          {{ task.title }}<i class="material-icons right">close</i>
        </span>
        <p class="white-text">
          {{ task.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    task: Object
  }
};
</script>

<style scoped>
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