<template>
  <div
    class="col s6 m4 l3 xl2"
    style="padding: 0 0.3rem"
    @click="sendProjectId()"
  >
    <div class="card" style="background:url('../assets/img/White.jpg')">
      <div class="card-content">
        <span class="card-title" style="font-size: 1.2rem; font-weight:bold">
          {{ project.name }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    project: Object,
    BASEURL: String
  },
  methods: {
    sendProjectId() {
      this.$emit("set-projectId2", this.project.id);
      this.$emit("to-kanban", "kanban");
    }
  }
};
</script>

<style>
</style>