<template>
  <RandomAnimal :endpoints="endpoints" />
  <!--  <RouterView />-->
</template>

<script>
import RandomAnimal from './components/RandomAnimal.vue';
import { ANIMAL_ENDPOINTS } from '@/endpoints';

export default {
  components: { RandomAnimal },
  computed: {
    endpoints: () => ANIMAL_ENDPOINTS,
  },
};
</script>

<style>
@import "@/assets/base.css";

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 1rem;
  font-weight: normal;
}

header {
  line-height: 1.5;
  max-height: 100vh;
  font-size: 2rem;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  body {
    display: flex;
  }

  header {
    display: flex;
    justify-content: center;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}

</style>
