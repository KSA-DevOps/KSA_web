<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { fade, scale, fly } from 'svelte/transition';

  
  export let isOpen = false;
  // images: Array of {src: string, alt: string}
  export let images: Array<{src: string, alt: string}> = [];
  export let currentIndex = 0;
  
  // Backwards compatibility for single image props (though we'll move to use full array)
  export let imageSrc = '';
  export let imageAlt = '';
  
  let modalElement: HTMLDivElement;
  let direction = 1; // 1 for next, -1 for prev

  
  // Custom event listener
  function handleOpenModal(event: CustomEvent) {
    isOpen = true;
    
    // Check if event details provide an array of images
    if (event.detail.images && Array.isArray(event.detail.images) && event.detail.images.length > 0) {
      images = event.detail.images;
      currentIndex = event.detail.index || 0;
    } else {
      // Fallback for single image dispatched
      images = [{ src: event.detail.src, alt: event.detail.alt || '' }];
      currentIndex = 0;
    }
  }
  
  function close() {
    isOpen = false;
  }

  function nextImage() {
    if (images.length > 1) {
      direction = 1;
      currentIndex = (currentIndex + 1) % images.length;
    }
  }

  function prevImage() {
    if (images.length > 1) {
      direction = -1;
      currentIndex = (currentIndex - 1 + images.length) % images.length;
    }
  }

  
  function handleKeydown(event: KeyboardEvent) {
    if (!isOpen) return;
    
    if (event.key === 'Escape') {
      close();
    } else if (event.key === 'ArrowRight') {
      nextImage();
    } else if (event.key === 'ArrowLeft') {
      prevImage();
    }
  }
  
  function handleBackgroundClick(event: MouseEvent) {
    if (event.target === modalElement) {
      close();
    }
  }
  
  function preventBodyScroll() {
    if (typeof document !== 'undefined') {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    }
  }
  
  onMount(() => {
    if (typeof document !== 'undefined') {
      document.addEventListener('keydown', handleKeydown);
      document.addEventListener('openImageModal', handleOpenModal as EventListener);
    }
  });
  
  onDestroy(() => {
    if (typeof document !== 'undefined') {
      document.removeEventListener('keydown', handleKeydown);
      document.removeEventListener('openImageModal', handleOpenModal as EventListener);
      document.body.style.overflow = 'auto';
    }
  });
  
  $: if (isOpen !== undefined && typeof document !== 'undefined') {
    preventBodyScroll();
  }

  // Reactive variables for currently displayed image
  $: currentSrc = images.length > 0 ? images[currentIndex].src : imageSrc;
  $: currentAlt = images.length > 0 ? images[currentIndex].alt : imageAlt;
</script>

{#if isOpen}
  <!-- svelte-ignore a11y-click-events-have-key-events hover-interactions role-has-required-aria-props -->
  <div
    bind:this={modalElement}
    class="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-90 p-4"
    on:click={handleBackgroundClick}
    role="dialog"
    aria-modal="true"
    transition:fade={{ duration: 200 }}
  >
    <!-- Close button -->
    <button 
      class="absolute top-4 right-4 text-white hover:text-gray-300 p-2 z-[110]"
      on:click={close}
      aria-label="Close modal"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    <div class="relative flex items-center justify-center w-full h-full max-w-7xl mx-auto">
      
      <!-- Prev Button -->
      {#if images.length > 1}
        <button 
          class="absolute left-2 md:left-8 text-white hover:text-gray-300 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full p-2 z-[110] transition-all"
          on:click|stopPropagation={prevImage}
          aria-label="Previous image"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 md:h-12 md:w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      {/if}

      <!-- Image container -->
      <div class="relative max-h-full max-w-full flex items-center justify-center px-12 md:px-24">
        {#key currentSrc}
          <div
            in:fly={{ x: direction * 50, duration: 300, delay: 50, opacity: 0 }}
            out:fade={{ duration: 200 }}
            class="flex items-center justify-center w-full h-full"
          >
            <img
              src={currentSrc}
              alt={currentAlt}
              class="max-h-[85vh] max-w-full rounded shadow-2xl object-contain"
            />
          </div>
        {/key}

        
        <!-- Image counter -->
        {#if images.length > 1}
          <div class="absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 text-white text-sm bg-black bg-opacity-50 px-3 py-1 rounded-full">
            {currentIndex + 1} / {images.length}
          </div>
        {/if}
      </div>

      <!-- Next Button -->
      {#if images.length > 1}
        <button 
          class="absolute right-2 md:right-8 text-white hover:text-gray-300 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full p-2 z-[110] transition-all"
          on:click|stopPropagation={nextImage}
          aria-label="Next image"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 md:h-12 md:w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      {/if}

    </div>
  </div>
{/if}

<style>
  :global(.fade-enter-active),
  :global(.fade-leave-active) {
    transition: opacity 0.2s ease;
  }
  
  :global(.fade-enter-from),
  :global(.fade-leave-to) {
    opacity: 0;
  }
</style> 