<template>
  <div id="app">
    <transition name="slide-fade">
      <LabSwitcher v-show="showMenu" v-model="currentLab" :data="labs" />
    </transition>
    <template v-if="currentLab">
      <div :style="{ margin: '15px 0', padding: '15px' }">{{ currentLabName }}</div>
      <div :style="{ fontSize: '14px', textAlign: 'left' }">
        <component v-bind:is="currentLab"></component>
      </div>
    </template>
  </div>
</template>

<script>
import Vue from 'vue';
import throttle from 'lodash.throttle'

import LabSwitcher from './LabSwitcher.vue';

import One from './Logic/1One'
import Two from './Logic/2Two'
import Three from './Logic/3Three'
import Four from './Logic/4Four'
import Five from './Logic/5Five'
import Sex from './Logic/6Six'

export default Vue.extend({
  name: 'app',
  components: {
    LabSwitcher,

    one: One,
    two: Two,
    three: Three,
    four: Four,
    five: Five,
    six: Sex
  },
  data () {
    return {
      showMenu: false,
      labs: [
        { key: 'one', title: 'Классификация с помощью перцептрона' },
        { key: 'two', title: 'Аппроксимация функции' },
        { key: 'three', title: 'Классификация с помощью слоя Кохонена' },
        { key: 'four', title: 'Прогнозирование временных рядов с использованием нейронных сетей' },
        { key: 'five', title: 'Pattern recognition' }
      ],
      currentLab: ''
    }
  },
  mounted () {
    window.addEventListener('keydown', (e) => {
      const key = e.keyCode || e.which
      if (key !== 9) return
      this.showMenu = !this.showMenu
      e.preventDefault()
    })

    const fn = (e) => {
      this.showMenu = e.clientY < 85
    }

    const handler = throttle(fn, 250)

    window.addEventListener('mousemove', handler)
  },
  computed: {
    currentLabName () {
      return this.currentLab ? this.labs.filter(lab => lab.key === this.currentLab)[0].title : ''
    }
  }
});
</script>

<style>
  .fixed {
    position: fixed;
    bottom: 0;
    right: 100px;
  }

  a {
    color: var(--primary-color);
  }

.text-cutter {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.top-right-legend {
  fill: var(--main-color);
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active до версии 2.1.8 */ {
  transform: translateY(-10px);
  opacity: 0;
}

button {
  user-select: none;
  height: 28px;
  border-radius: 4px;

  font-size: 14px;
  font-weight: 500;

  border: none;

  cursor: pointer;
}

button.disabled {
  background-color: #c8cad6 !important;
  color: #878a9c;
  cursor: default;
}

button:focus {
  outline: none;
}

button.default {
  color: #878a9c;
  border: 1px solid #b9bbc6;
  background-color: #ffffff;
}

button.default:hover {
  background-color: #eaebf0;
}

button.default:active {
  background-color: #c8cad6;
  outline: none;
}

button.primary {
  color: #fff;
  background-color: var(--primary-color);
}

button.primary:hover {
  background-color: #ff7979;
}

button.primary:active {
  background-color: #ff4757;
  outline: none;
}

body {
  margin: 0;
}

#app {
  font-family: 'Monospace', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--main-color);
  margin-top: 20px;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.block-color {
  background-color: var(--main-color);
  color: var(--text-color);
}

.little-round {
  border-radius: 5px;
}

.act {
  cursor: pointer;
  transition: transform 0.1s ease-out;
}

.il {
  display: inline-block;
  color: #b1b1b1;
}

.act:hover {
  transform: scale(1.1);
}

.padr {
  padding-right: 10px;
}

.block-color-active {
  background-color: var(--primary-color);
  color: var(--text-color);
  /* #ff4757 #ff6b81 */
}

.test {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAH0lEQVQYV2NkQAL/GRj+M8L4UA4jWADGAbEZkTkgAQAQeggD7cDcSwAAAABJRU5ErkJggg==);
}

.flex-row-center,
.flex-column-center {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.flex-column-center {
  flex-direction: column;
}

.flex-start {
  align-items: flex-start !important;
}

.flex-end {
  align-items: flex-end !important; 
}

.flex-no-shrink {
  flex-shrink: 0;
}

.flex-no-grow {
  flex-grow: 0;
}

.flex-content-start {
  justify-content: flex-start;
}

.flex-content-end {
  justify-content: flex-end;
}
</style>
