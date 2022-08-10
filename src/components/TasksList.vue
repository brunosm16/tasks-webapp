<template>
  <div class="tasks-list">
    <h2 class="tasks-list__header">
      {{ listMessage }}
    </h2>

    <div class="tasks-list__wrapper">
      <ul class="tasks-list__wrapper__list" v-if="tasksExists">
        <li
          class="tasks-list__wrapper__list--item"
          v-for="(taskItem, index) in tasks"
          :key="`${index}-${Math.random()}`"
        >
          <input
            class="tasks-list__wrapper__list--item__checkbox"
            type="checkbox"
            :checked="!!taskItem.finishedAt"
            @input="toggleStatus(index)"
          />

          <span class="tasks-list__wrapper__list--item__label">{{
            taskItem.task
          }}</span>

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
import updateArrayByIndex from "../utils/update-array-by-index";
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
  },

  methods: {
    toggleStatus(index) {
      const taskToUpdate = index >= 0 && this.tasks[index];

      if (taskToUpdate?.finishedAt) {
        taskToUpdate.finishedAt = undefined;
      } else {
        const arrayUpdated = updateArrayByIndex(
          this.tasks,
          index,
          "finishedAt",
          Date.now()
        );

        this.emit("update:tasks", arrayUpdated);
      }
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
    }
  }
}
</style>
