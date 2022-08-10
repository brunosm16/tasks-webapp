<template>
  <div class="to-do">
    <CurrentTime />
    <TaskInput @add-task="pushTask" />
    <TasksList v-model:tasks="tasks" />
  </div>
</template>

<script>
import CurrentTime from "./CurrentTime.vue";
import TaskInput from "./TaskInput.vue";
import TasksList from "./TasksList.vue";

export default {
  name: "ToDo",

  components: {
    CurrentTime,
    TaskInput,
    TasksList,
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
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 30px;
  gap: 15px;
}
</style>
