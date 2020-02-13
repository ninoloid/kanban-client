<template>
  <!-- <b-button size="sm" class="my-2 my-sm-0" v-on:click="showAddTaskForm"
    >New Task</b-button
  > -->
  <a
    class="btn-floating halfway-fab waves-effect waves-light red"
    @click="showAddTaskForm"
    ><i class="material-icons">add</i></a
  >
</template>

<script>
export default {
  name: "addTask",
  data() {
    return {
      title: "",
      description: ""
    };
  },
  methods: {
    showAddTaskForm() {
      this.$swal
        .mixin({
          input: "text",
          confirmButtonText: "Next &rarr;",
          showCancelButton: true,
          progressSteps: ["1", "2"]
        })
        .queue(["Title", "Description"])
        .then(result => {
          if (!result.value[0]) {
            this.$swal({
              icon: "error",
              title: "Oops...",
              text: "Title can't be blank"
            });
          } else if (!result.value[1]) {
            this.$swal({
              icon: "error",
              title: "Oops...",
              text: "Description can't be blank"
            });
          } else {
            const data = {
              title: result.value[0],
              description: result.value[1]
            };
            this.$emit("addTask", data);
          }
        });
    }
  }
};
</script>