<template>
  <div class="current-time">
    <div class="current-time__card">
      <h1 class="current-time__card-header">Today :</h1>
      <h2 class="current-time__card-label">{{ getNowDate }}</h2>
    </div>
  </div>
</template>

<script>
import intlDateTime from "../utils/intl-date-time.js";

export default {
  name: "CurrentTime",

  computed: {
    getNowDate() {
      return intlDateTime();
    },
  },
};
</script>

<style lang="scss" scoped>
.current-time {
  &__card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: all 0.3s linear;
    width: 320px;
    height: 320px;
    margin: 50px auto;
    padding: 14px;
    background: #3a86ff;
    color: #fff;
    border-radius: 25%;
    box-shadow: 3px 5px 10px 5px rgba(0, 0, 0, 0.1);

    &:hover {
      box-shadow: 4px 6px 13px 4px rgba(0, 0, 0, 0.1);
    }

    &-header {
      text-align: center;
    }

    &-label {
      color: #e5e5e5;
      font-style: italic;
    }
  }
}
</style>
