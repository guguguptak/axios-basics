<template>
  <main>
    <div class="animal">
      <header>
        Random Animal Frontend
      </header>
      <div class="action-box">
        <select v-model="animalType" class="select select is-normal" @change="fetchAnimal">
          <!--      <option disabled value="">Please select one</option>-->
          <option v-for="(_, name, i) in endpoints" :key="i" :value="i">
            {{ name }}
          </option>
        </select>
        <button class="animal-button button is-primary is-light" @click="fetchAnimal">Another animal</button>
      </div>
      <div style=" width: 600px; height: 600px">
        <AnimalContainer :animal="animal1" />
        <AnimalContainer :animal="animal2" />
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import axios from 'axios';
import AnimalContainer from "@/components/AnimalContainer.vue";
import {Animal, AnimalResponse} from "@/entities";


export default {
  components: {AnimalContainer},
  name: "RandomAnimalGenerator",
  props: {
    endpoints: Object,
  },
  async created() {
    this.animal1 = new Animal(null, "", false);
    this.animal2 = new Animal(null, "", false);
    this.fetchAnimal();
  },
  data() {
    return {
      animal1: Animal,
      animal2: Animal,
      currAnimalIndex: 2,
      animalType: 0,
    };
  },
  methods: {
    async fetchAnimal() {
      try {
        const currImageUrl = (this.currAnimalIndex == 1) ? this.animal1.response?.image : this.animal2.response?.image;
        let resp;
        const [AnimalName, AnimalUrl] = Object.entries(this.endpoints)[this.animalType]
        do {
          resp = await axios.get<AnimalResponse>(AnimalUrl);
        } while (resp.data.image == currImageUrl);
        const newAnimal = new Animal(resp.data, AnimalName, true);
        if (this.currAnimalIndex == 1) {
          this.currAnimalIndex = 2;
          this.animal2 = newAnimal;
          this.animal1.isCurrent = false;
        } else {
          this.currAnimalIndex = 1;
          this.animal1 = newAnimal;
          this.animal2.isCurrent = false;
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style scoped>

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

.action-box {
  padding-bottom: 1.2rem;
  padding-top: 1.2rem;
  width: 98%;
  display: flex;
  justify-content: space-between;
}

.animal-button, .select {
  font-size: var(--default-font-size);
  text-align: center;
  border-radius: 3px;
}

.select {
  padding-right: 0.5rem;
  padding-left: 0.5rem;
}

</style>