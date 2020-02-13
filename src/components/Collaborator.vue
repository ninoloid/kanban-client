<template>
  <div
    style="width: 100vw; height: 90vh; display:  flex; justify-content: center; align-items: center;"
  >
    <div class="row collaboratorContainer" style="background: white;">
      <div class="col s12 m6" style="margin-top: 1rem;">
        <form @submit.prevent="addCollaborator">
          <div class="input-field">
            <i class="material-icons prefix">account_circle</i>
            <input
              id="identification"
              type="text"
              class="validate"
              v-model="identification"
            />
            <label for="identification">Username or Email</label>
          </div>
          <div
            class="input-field"
            style="display: flex; justify-content: flex-end"
          >
            <button
              class="btn waves-effect waves-light red"
              style="margin-right: 1rem;"
              @click.prevent="backToProject"
            >
              Back
              <i class="material-icons right">fast_rewind</i>
            </button>
            <button class="btn waves-effect waves-light" type="submit">
              Add
              <i class="material-icons right">send</i>
            </button>
          </div>
        </form>
      </div>
      <div class="col s12 m6">
        <h5 class="collTitle" style="text-align: center;">
          List of Members
        </h5>
        <table>
          <tr>
            <th>User Email</th>
            <th></th>
          </tr>
          <tr v-for="member in filteredMembers" :key="member.id">
            <td>{{ member.email }}</td>
            <td>
              <i
                class="material-icons deleteMember"
                @click="deleteCollaborator(member.id)"
                >delete_sweep</i
              >
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      identification: "",
      projectMembers: []
    };
  },
  props: {
    ProjectId: Number,
    BASEURL: String
  },
  methods: {
    addCollaborator() {
      axios({
        method: "post",
        url: this.BASEURL + "project/addPerson",
        data: {
          identification: this.identification,
          ProjectId: this.ProjectId
        },
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          console.log(data);
          this.$alertify.success(
            `User '${this.identification}' added to project successfully`
          );
          this.fetchProjectMember();
        })
        .catch(err => {
          this.$alertify.error(err.response.data.msg);
        });
    },
    fetchProjectMember() {
      axios({
        method: "get",
        url: this.BASEURL + "project/" + this.ProjectId,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          this.projectMembers = data.Users;
        })
        .catch(err => {
          this.$alertify.error(err.response.data.msg);
        });
    },
    deleteCollaborator(id) {
      axios({
        method: "delete",
        url: this.BASEURL + "project/deletePerson/" + this.ProjectId,
        data: {
          UserId: id
        },
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          this.$alertify.success(data.msg);
          this.fetchProjectMember();
        })
        .catch(err => {
          if (err.response.statusText === "Forbidden") {
            this.$alertify.error(err.response.data.msg);
          }
        });
    },
    backToProject() {
      this.$emit("changePage", "project");
    }
  },
  created() {
    this.fetchProjectMember();
  },
  computed: {
    filteredMembers() {
      return this.projectMembers.filter(
        member => member.username !== localStorage.username
      );
    }
  }
};
</script>

<style>
.collaboratorContainer {
  width: 50vw;
}

.deleteMember:hover {
  color: coral;
  cursor: pointer;
  transition: 0.5s;
}
@media (max-width: 1200px) {
  .collaboratorContainer {
    width: 70vw;
  }
}

@media (max-width: 900px) {
  .collaboratorContainer {
    width: 80vw;
  }
}

@media (max-width: 600px) {
  .collaboratorContainer {
    width: 90vw;
  }

  .collTitle {
    border-top: 1px solid black;
    border-bottom: 1px solid black;
  }
}
</style>