<template>
    <section id="sct_loop">
        <div class="logos">
          <div class="logos_slide" ref="logos_slide">
            <vemConstruir/>
            <vemConstruir/>
            <vemConstruir/>
            <vemConstruir/>
            <vemConstruir/>
            <vemConstruir/>
          </div>
          <div class="logos_slide" ref="logos_slide">
                <vemConstruir/>
                <vemConstruir/>
                <vemConstruir/>
                <vemConstruir/>
                <vemConstruir/>
                <vemConstruir/>
              </div>
              <div class="logos_slide" ref="logos_slide">
                <vemConstruir/>
                <vemConstruir/>
                <vemConstruir/>
                <vemConstruir/>
                <vemConstruir/>
                <vemConstruir/>
              </div>
              <div class="logos_slide" ref="logos_slide">
                <vemConstruir/>
                <vemConstruir/>
                <vemConstruir/>
                <vemConstruir/>
                <vemConstruir/>
                <vemConstruir/>
              </div>
              <div class="logos_slide" ref="logos_slide">
                <vemConstruir/>
                <vemConstruir/>
                <vemConstruir/>
                <vemConstruir/>
                <vemConstruir/>
                <vemConstruir/>
              </div>
              <div class="logos_slide" ref="logos_slide">
                <vemConstruir/>
                <vemConstruir/>
                <vemConstruir/>
                <vemConstruir/>
                <vemConstruir/>
                <vemConstruir/>
              </div>
              <div class="logos_slide" ref="logos_slide">
                <vemConstruir/>
                <vemConstruir/>
                <vemConstruir/>
                <vemConstruir/>
                <vemConstruir/>
                <vemConstruir/>
              </div>
              <div class="logos_slide" ref="logos_slide">
                <vemConstruir/>
                <vemConstruir/>
                <vemConstruir/>
                <vemConstruir/>
                <vemConstruir/>
                <vemConstruir/>
              </div>
        </div>
      </section>
</template>

<script>
import { ref, onMounted } from "vue";
import vemConstruir from "./VemConstruir.vue";

export default {
    components:{
        vemConstruir
    },
    setup() {
        const logos_slide = ref(null);

        onMounted(() => {
            
            logos_slide.value.cloneNode(true);
            
        });
        return {
            logos_slide
        }
    }
}
</script>

<style scoped>
#sct_loop{  
    background: var(--Color-primary, rgba(76, 76, 76, 1));
    width: 100%;
    padding-top: 12px;
    padding-bottom: 12px;

}


@keyframes slide {
    0% {
        transform: translateX(0);
    }

    100% {
        transform: translateX(-100%);
    }
}

.logos {
    overflow: hidden;
    white-space: nowrap;
    position: relative;
}

.logos:before,


.logos:hover .logos-slide {
    animation-play-state: paused;
}

.logos_slide {
    display: inline-block;
    animation: 100s slide infinite linear;
}

.logos_slide img {
    height: 50px;
    margin: 0 40px;
}
</style>