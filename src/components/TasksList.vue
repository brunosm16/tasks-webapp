<template>
  <div class="tasks-list">
    <h2 class="tasks-list__header">
      {{ tasks.length ? "Current" : "No" }} Tasks
    </h2>

    <div class="tasks-list__wrapper">
      <ul class="tasks-list__wrapper__list" v-if="tasks.length">
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
            {{ taskItem.finishedAt }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import updateArrayByIndex from "../utils/update-array-by-index";

export default {
  name: "TasksLists",

  props: {
    tasks: {
      type: Array,
      default: () => [],
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
