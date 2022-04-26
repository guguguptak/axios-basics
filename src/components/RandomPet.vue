<template>
  <main>
    <div class="animal">
      <header>
        Random Animal Frontend
      </header>
      <div class="pet-action-box">
        <select v-model="petType" class="pet-select select is-normal" @change="fetchPet">
          <!--      <option disabled value="">Please select one</option>-->
          <option v-for="(_, name, i) in PET_ENDPOINTS" :key="i" :value="i">
            {{ name }}
          </option>
        </select>
        <button class="pet-button button is-primary" @click="fetchPet">Another pet</button>
      </div>
      <div style=" width: 600px; height: 600px">
        <PetContainer :pet="pet1" />
        <PetContainer :pet="pet2" />
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import axios from 'axios';
import PetContainer from "@/components/PetContainer.vue";
import {Pet, PetResponse} from "@/entities";


const PET_ENDPOINTS = {
  'fox': `https://some-random-api.ml/animal/fox`,
  'racoon': `https://some-random-api.ml/animal/raccoon`,
  'cat': `https://some-random-api.ml/animal/cat`
}

export default {
  components: {PetContainer},
  name: "RandomPetGenerator",
  async created() {
    this.pet1 = new Pet(null, "", false);
    this.pet2 = new Pet(null, "", false);
    this.fetchPet();
  },
  data() {
    return {
      pet1: Pet,
      pet2: Pet,
      currPetIndex: 2,
      petType: 0,
    };
  },
  computed: {
    PET_ENDPOINTS: () => PET_ENDPOINTS,
  },
  methods: {
    async fetchPet() {
      try {
        const currImageUrl = (this.currPetIndex == 1) ? this.pet1.response?.image : this.pet2.response?.image;
        let resp;
        const [petName, petUrl] = Object.entries(PET_ENDPOINTS)[this.petType]
        do {
          resp = await axios.get<PetResponse>(petUrl);
        } while (resp.data.image == currImageUrl);
        const newPet = new Pet(resp.data, petName, true);
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

.pet-action-box {
  display: flex;
  justify-content: space-between;
}

.pet-button, .pet-select {
  font-size: var(--default-font-size);
}

</style>