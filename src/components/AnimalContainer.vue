<template>
  <div :class="animal.isCurrent ? 'view-curr' : ''" class="animal">
    <div class="img-container">
      <img :alt="animal.name" :src="animal.response?.image" class="animal-img" />
    </div>
    <p class="info-box">
      {{ animal.response?.fact }}
    </p>
  </div>
</template>

<script>

import { Animal } from '@/entities';

export default {
  name: 'AnimalContainer',
  props: {
    animal: Animal,
  }
};

</script>

<style scoped>
.img-container {
  width: 100%;
  height: 480px;
}

.info-box {
  width: 100%;
  height: 4rem;
  padding-top: 1rem;
}

.animal-img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.animal {
  position: absolute;
  transition: opacity 2s;
  opacity: 0;
  width: 100%;
}

.view-curr {
  opacity: 100%;
}
</style>