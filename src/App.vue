<template>
  <main>
    <div class="animal">
      <header>
        Random Animal Frontend
      </header>
      <div class="img-container">
        <img :alt="pet1?.name" :class="pet1?.isCurrent ? 'pet-curr' : ''" :src="pet1?.response?.image"
             class="pet pet-img" />
        <img :alt="pet2?.name" :class="pet2?.isCurrent ? 'pet-curr' : ''" :src="pet2?.response?.image"
             class="pet pet-img" />
      </div>
      <p class="pet-info-box">
        <span>{{ pet1?.response?.fact }}</span>
        <span>{{ pet2?.response?.fact }}</span>
      </p>
      <div class="pet-action-box">
        <select v-model="petType" class="pet-select select is-normal" @change="fetchPet">
          <!--      <option disabled value="">Please select one</option>-->
          <option v-for="(_, name, i) in PET_ENDPOINTS" :key="i" :value="i">
            {{ name }}
          </option>
        </select>
        <button class="pet-button button is-primary" @click="fetchPet">Another pet</button>
      </div>
    </div>
  </main>
  <!--  <RouterView />-->
</template>

<script lang="ts">
import axios from 'axios';

class PetResponse {
  constructor(
      readonly image: string,
      readonly fact: string,
  ) {
  }
}

class Pet {
  constructor(
      readonly response: PetResponse,
      readonly name: string,
      public isCurrent: boolean,
  ) {
  }
}

const PET_ENDPOINTS = {
  'fox': `https://some-random-api.ml/animal/fox`,
  'racoon': `https://some-random-api.ml/animal/raccoon`,
  'cat': `https://some-random-api.ml/animal/cat`
}

export default {
  name: 'App',
  async created() {
    this.fetchPet();
  },
  data() {
    return {
      pet1: Pet,
      pet2: Pet,
      currPetIndex: 1,
      petType: 0,
    };
  },
  computed: {
    PET_ENDPOINTS: () => PET_ENDPOINTS,
    currentPetName(): string {
      return Object.keys(PET_ENDPOINTS)[this.petType];
    },
  },
  methods: {
    async fetchPet() {
      try {
        const currImageUrl = (this.currPetIndex == 1) ? this.pet1?.response?.image : this.pet2?.response?.image;
        var resp;
        do {
          resp = await axios.get<PetResponse>(Object.values(PET_ENDPOINTS)[this.petType]);
        } while (resp.data.image == currImageUrl);
        const newPet = new Pet(resp.data, this.currentPetName, true);
        if (this.currPetIndex == 1) {
          this.currPetIndex = 2;
          this.pet2 = newPet;
          this.pet1.isCurrent = false;
        } else {
          this.currPetIndex = 1;
          this.pet1 = newPet;
          this.pet2.isCurrent = false;
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style>
@import "@/assets/base.css";

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
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

  #app {
    /*grid-template-columns: 1fr 1fr;*/
    /*padding: 0 2rem;*/
  }

  header {
    display: flex;
    justify-content: center;
  }

  /*header .wrapper {*/
  /*  display: flex;*/
  /*  place-items: flex-start;*/
  /*  flex-wrap: wrap;*/
  /*}*/
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


main {
  width: 100%;
  height: 100%;
  display: flex;
  --default-font-size: 1.2rem;
  font-size: var(--default-font-size);
  text-align: center;
  max-width: 720px;
}

.animal {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.img-container {
  width: 600px;
  height: 480px;
  display: flex;
  justify-content: center;
}

.pet-img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.pet {
  position: absolute;
  transition: opacity 2s;
  opacity: 0;
}

.pet-curr {
  opacity: 100%;
}

.pet-action-box {
  display: flex;
  justify-content: space-between;
}

.pet-button, .pet-select {
  font-size: var(--default-font-size);
}

</style>
