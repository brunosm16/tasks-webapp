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

    [class*="col-"] {
      display: inline-block;
    }

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

    @media only screen and (max-width: 600px) {
      [class*="col-"] {
        width: 100%;
      }
    }

    @media only screen and (min-width: 600px) {
      .col-1 {
        width: 8.33%;
      }
      .col-2 {
        width: 16.66%;
      }
      .col-3 {
        width: 25%;
      }
      .col-4 {
        width: 33.33%;
      }
      .col-5 {
        width: 41.66%;
      }
      .col-6 {
        width: 50%;
      }
      .col-7 {
        width: 58.33%;
      }
      .col-8 {
        width: 66.66%;
      }
      .col-9 {
        width: 75%;
      }
      .col-10 {
        width: 83.33%;
      }
      .col-11 {
        width: 91.66%;
      }
      .col-12 {
        width: 100%;
      }
    }

    @media only screen and (min-width: 768px) {
      .col-1 {
        width: 8.33%;
      }
      .col-2 {
        width: 16.66%;
      }
      .col-3 {
        width: 25%;
      }
      .col-4 {
        width: 33.33%;
      }
      .col-5 {
        width: 41.66%;
      }
      .col-6 {
        width: 50%;
      }
      .col-7 {
        width: 58.33%;
      }
      .col-8 {
        width: 66.66%;
      }
      .col-9 {
        width: 75%;
      }
      .col-10 {
        width: 83.33%;
      }
      .col-11 {
        width: 91.66%;
      }
      .col-12 {
        width: 100%;
      }
    }

    @media only screen and (min-width: 992px) {
      .col-1 {
        width: 8.33%;
      }
      .col-2 {
        width: 16.66%;
      }
      .col-3 {
        width: 25%;
      }
      .col-4 {
        width: 33.33%;
      }
      .col-5 {
        width: 41.66%;
      }
      .col-6 {
        width: 50%;
      }
      .col-7 {
        width: 58.33%;
      }
      .col-8 {
        width: 66.66%;
      }
      .col-9 {
        width: 75%;
      }
      .col-10 {
        width: 83.33%;
      }

      .col-11 {
        width: 91.66%;
      }
      .col-12 {
        width: 100%;
      }
    }

    @media only screen and (min-width: 1200px) {
      .col-1 {
        width: 8.33%;
      }
      .col-2 {
        width: 16.66%;
      }
      .col-3 {
        width: 25%;
      }
      .col-4 {
        width: 33.33%;
      }
      .col-5 {
        width: 41.66%;
      }
      .col-6 {
        width: 50%;
      }
      .col-7 {
        width: 58.33%;
      }
      .col-8 {
        width: 66.66%;
      }
      .col-9 {
        width: 75%;
      }
      .col-10 {
        width: 83.33%;
      }
      .col-11 {
        width: 91.66%;
      }
      .col-12 {
        width: 100%;
      }
    }
  }
}
</style>
