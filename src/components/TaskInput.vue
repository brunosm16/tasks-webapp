<template>
  <div class="task-input">
    <div class="task-input__wrapper">
      <h2 class="task-input__wrapper__header">New Task</h2>
      <input class="task-input__wrapper__input" type="text" v-model="task" />
    </div>
    <button class="task-input__add-button" @click="addTask">Add Task</button>
  </div>
</template>

<script>
export default {
  name: "TaskInput",

  data: () => ({
    task: "",
  }),

  methods: {
    addTask() {
      this.$emit("add-task", this.task);
      this.task = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.task-input {
  &__wrapper {
    display: flex;
    margin-bottom: 15px;

    &__header {
      color: #1d3557;
    }

    &__input {
      border: 0;
      border-bottom: 3px #1d3557 solid;
      outline: none;
      margin: 15px;
    }
  }

  &__add-button {
    width: 120px;
    padding: 8px 0;
    background: #1d3557;
    transition: all 0.3s linear;
    color: #fff;
    border-radius: 8px;
    outline: none;
    border: none;
    cursor: pointer;

    &:hover {
      background: #3a86ff;
    }
  }
}
</style>
