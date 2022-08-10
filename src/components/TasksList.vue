<template>
  <div class="tasks-list">
    <h2 class="tasks-list__header">
      {{ listMessage }}
    </h2>

    <div class="tasks-list__wrapper">
      <ul class="tasks-list__wrapper__list" v-if="tasksExists">
        <li
          class="tasks-list__wrapper__list--item"
          v-for="(taskItem, index) in sortedTasks"
          :key="`${index}-${Math.random()}`"
        >
          <input
            class="tasks-list__wrapper__list--item__checkbox"
            type="checkbox"
            :checked="!!taskItem.finishedAt"
            @input="toggleStatus(taskItem.position)"
          />

          <span class="tasks-list__wrapper__list--item__label">
            # {{ taskItem.position }} {{ taskItem.task }}
          </span>

          <span
            class="tasks-list__wrapper__list--item__label"
            v-if="taskItem.finishedAt"
          >
            | Done at : {{ formatDate(taskItem.finishedAt) }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import intlDateTime from "../utils/intl-date-time.js";

export default {
  name: "TasksLists",

  props: {
    tasks: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    tasksExists() {
      return !!this.tasks.length;
    },

    listMessage() {
      return `${this.tasksExists ? "Current" : "No"} Tasks`;
    },

    tasksByPosition() {
      const mapByIndex = (tasks) =>
        tasks.map((task, index) => ({ ...task, position: index + 1 }));

      return this.modifyArrayBy(this.tasks, mapByIndex);
    },

    unfinishedTasks() {
      const filterByNotFinished = (tasks) =>
        tasks.filter((task) => !task.finishedAt);

      return this.modifyArrayBy(this.tasksByPosition, filterByNotFinished);
    },

    finishedTasks() {
      const filterByFinished = (tasks) =>
        tasks.filter((task) => task.finishedAt);

      return this.modifyArrayBy(this.tasksByPosition, filterByFinished);
    },

    sortedTasks() {
      const sortByPosition = (tasks) =>
        tasks.sort((taskA, taskB) => taskA.position - taskB.position);

      return this.modifyArrayBy(this.tasksByPosition, sortByPosition);
    },
  },

  methods: {
    toggleStatus(index) {
      const realIndex = index - 1;
      const taskToUpdate = index >= 0 && this.tasks[realIndex];

      if (taskToUpdate.finishedAt) {
        taskToUpdate.finishedAt = undefined;
      } else {
        const temp = this.tasks;

        const updatedTask = this.tasks[realIndex];
        taskToUpdate.finishedAt = Date.now();

        temp[realIndex] = updatedTask;

        this.$emit("update:tasks", temp);
      }
    },

    modifyArrayBy(arr, modify) {
      return arr?.length ? modify(arr) : [];
    },

    formatDate(date) {
      if (!date) return "";
      if (typeof date !== "number") return date;

      return intlDateTime(date);
    },
  },
};
</script>

<style lang="scss" scoped>
.tasks-list {
  width: 90%;
  background: #2b2d42;
  color: #ffffff;
  border-radius: 40px;
  padding: 8px;

  &__header {
    text-align: center;
  }

  &__wrapper {
    font-size: 20px;

    &__list {
      list-style: none;

      &--item {
        margin-bottom: 8px;
      }
    }
  }
}
</style>
