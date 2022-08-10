<template>
  <div class="to-do">
    <CurrentTime class="col-3" />
    <TaskInput class="col-6" @add-task="pushTask" />
  </div>
</template>

<script>
import CurrentTime from "./CurrentTime.vue";
import TaskInput from "./TaskInput.vue";

export default {
  name: "ToDo",

  components: {
    CurrentTime,
    TaskInput,
  },

  data: () => ({
    tasks: [],
  }),

  methods: {
    pushTask(task) {
      this.tasks.push({
        task,
        createdAt: Date.now(),
        updatedAt: undefined,
        finishedAt: undefined,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.to-do {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 30px;
  gap: 50px;
}
</style>
