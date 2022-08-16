<template>
  <div class="tasks-list">
    <h2 class="tasks-list__header">
      {{ listMessage }}
    </h2>

    <div class="tasks-list__wrapper" v-if="tasksExists">
      <div class="tasks-list__wrapper__inputs">
        <div class="tasks-list__wrapper__inputs--input">
          <input
            v-model="filterByFinished"
            type="checkbox"
            name="filterByFinished"
            id="filterByFinished"
          />
          <label for="filterByFinished">Filter By Finished</label>
        </div>

        <div class="tasks-list__wrapper__inputs--input">
          <input
            v-model="filterByUnfinished"
            type="checkbox"
            name="filterByUnfinished"
            id="filterByUnfinished"
          />
          <label for="filterByUnfinished">Filter By Unfinished</label>
        </div>

        <div class="tasks-list__wrapper__inputs--input">
          <input
            v-model="sortByFinishTime"
            type="checkbox"
            name="sortByFinishTime"
            id="sortByFinishTime"
          />
          <label for="sortByFinishTime">Sort By Finish Time</label>
        </div>

        <div class="tasks-list__wrapper__inputs--input">
          <input
            v-model="reverseOrder"
            type="checkbox"
            name="reverseOrder"
            id="sortByFinishTime"
          />
          <label for="reverseOrder">Reverse Order</label>
        </div>
      </div>

      <ul class="tasks-list__wrapper__list">
        <li
          class="tasks-list__wrapper__list--item"
          :class="taskItem.finishedAt ? 'task-done' : ''"
          v-for="(taskItem, index) in displayTasks"
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

  data: () => ({
    filterByFinished: false,
    filterByUnfinished: false,
    sortByFinishTime: false,
    reverseOrder: false,
  }),

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

    displayTasks() {
      let tasks = this.sortedTasksByPosition(this.tasks);

      if (this.reverseOrder) {
        tasks = tasks.reverse();
      }

      if (this.filterByFinished || this.filterByUnfinished) {
        tasks = this.getFilteredTasksByStatus(tasks);
      }

      if (this.sortByFinishTime) {
        tasks = this.getSortedByFinishTime(tasks);
      }

      return tasks;
    },
  },

  methods: {
    toggleStatus(index) {
      if (index <= 0) return;

      const realIndex = index - 1;
      const taskToUpdate = this.tasks[realIndex];

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

    sortedTasksByPosition(tasksArr) {
      return this.modifyArrayBy(
        this.tasksWithPosition(tasksArr),
        this.sortByPosition
      );
    },

    tasksWithPosition(tasksArr) {
      return this.modifyArrayBy(tasksArr, this.mapByIndex);
    },

    getFilteredTasksByStatus(tasksArr) {
      const hasBothFilter = this.filterByFinished && this.filterByUnfinished;

      return hasBothFilter
        ? tasksArr
        : this.modifyArrayBy(
            tasksArr,
            this.filterByType.bind(null, this.filterByFinished)
          );
    },

    getSortedByFinishTime(tasksArr) {
      return this.modifyArrayBy(tasksArr, this.tasksByFinishTime);
    },

    modifyArrayBy(arr, modify) {
      return arr?.length ? modify(arr) : [];
    },

    mapByIndex: (tasks) =>
      tasks.map((task, index) => ({ ...task, position: index + 1 })),

    filterByType: (filterByFinished, tasks) =>
      tasks.filter((task) =>
        filterByFinished ? task.finishedAt : !task.finishedAt
      ),

    tasksByFinishTime: (tasks) =>
      tasks.sort(
        (taskA, taskB) => (taskB.finishedAt || 0) - (taskA.finishedAt || 0)
      ),

    sortByPosition: (tasks) =>
      tasks.sort((taskA, taskB) => taskA.position - taskB.position),

    formatDate(date) {
      if (!date) return "";
      if (typeof date !== "number") return date;

      return intlDateTime(date);
    },
  },
};
</script>

<style lang="scss" scoped>
@keyframes backgroundColorChange {
  from {
    background-color: inherit;
  }

  to {
    background-color: #e63946;
  }
}

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
        padding: 5px;
        margin: 8px 15px;

        &:nth-child(even) {
          background-color: #457b9d;
        }
      }

      &--item.task-done {
        animation: backgroundColorChange 1s ease;
        background-color: #e63946;
      }
    }

    &__inputs {
      display: flex;
      gap: 30px;
      align-items: center;
      margin: 8px;
    }
  }
}
</style>
