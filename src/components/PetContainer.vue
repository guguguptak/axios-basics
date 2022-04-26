<template>
  <div :class="pet.isCurrent ? 'pet-curr' : ''" class="pet">
    <div class="pet-img-container">
      <img :alt="pet.name" :src="pet.response?.image" class="pet-img" />
    </div>
    <p class="pet-info-box">
      {{ pet.response?.fact }}
    </p>
  </div>
</template>

<script>

import { Pet } from '@/entities';

export default {
  name: 'PetContainer',
  props: {
    pet: Pet,
  }
};

</script>

<style scoped>
.pet-img-container {
  width: 100%;
  height: 480px;
}

.pet-info-box {
  width: 100%;
  height: 4rem;
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
  width: 100%;
}

.pet-curr {
  opacity: 100%;
}
</style>