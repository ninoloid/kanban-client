<template>
  <div
    class="col s4 m2"
    style="height: 100px; display: flex; align-items: center;"
  >
    <i class="medium material-icons addCategory" @click="addProjectForm()">
      add_circle_outline
    </i>
  </div>
</template>

<script>
import axios from "axios";
import swal from "vue-sweetalert2";

export default {
  data() {
    return {
      // name: ""
    };
  },
  methods: {
    addProjectForm() {
      this.$swal
        .mixin({
          input: "text",
          confirmButtonText: "Add",
          showCancelButton: true
          // progressSteps: ["1", "2", "3", "4"]
        })
        .queue(["Project Name"])
        .then(result => {
          if (!result.value[0]) {
            this.$swal({
              icon: "error",
              title: "Oops...",
              text: "Project name can't be blank"
            });
          } else {
            const data = {
              name: result.value[0]
            };
            // this.$store.dispatch("addCard", data).then(() => {
            //   this.$swal({
            //     icon: "success",
            //     title: "Added to the database",
            //     showConfirmButton: false,
            //     timer: 1500
            //   });
            // });

            this.addToDatabase(data);
          }
        });
    },
    addToDatabase(data) {
      console.log(data);
      axios({
        method: "post",
        url: "http://localhost:3000/project",
        data: {
          name: data.name
        },
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(() => {
          this.$alertify.success("Project added successfully");
        })
        .catch(err => {
          console.log(err.response);
          if (err.response.data.errors) {
            this.$alertify.error(err.response.data.errors[0]);
          } else {
            this.$alertify.error(err.response.data.msg);
          }
        });
    }
  }
};
</script>

<style scoped>
.addCategory {
  color: white;
  transform: rotate3d(0, 0, 1, -180deg);
  transition: 1s;
}

.addCategory:hover {
  color: coral;
  cursor: pointer;
  transform: rotate3d(0, 0, 1, 180deg);
  transition: 1s;
}
</style>