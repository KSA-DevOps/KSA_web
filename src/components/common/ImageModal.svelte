<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { fade, scale } from 'svelte/transition';
  
  export let isOpen = false;
  export let imageSrc = '';
  export let imageAlt = '';
  
  let modalElement: HTMLDivElement;
  
  // 커스텀 이벤트 리스너
  function handleOpenModal(event: CustomEvent) {
    isOpen = true;
    imageSrc = event.detail.src;
    imageAlt = event.detail.alt;
  }
  
  // ESC 키로 모달 닫기
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      isOpen = false;
    }
  }
  
  // 배경 클릭으로 모달 닫기
  function handleBackgroundClick(event: MouseEvent) {
    if (event.target === modalElement) {
      isOpen = false;
    }
  }
  
  // 모달이 열릴 때 body 스크롤 방지
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
</script>

{#if isOpen}
  <div
    bind:this={modalElement}
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
    on:click={handleBackgroundClick}
    transition:fade={{ duration: 200 }}
  >
    <div class="relative max-h-full max-w-full">
      
      <!-- 이미지 -->
      <img
        src={imageSrc}
        alt={imageAlt}
        class="max-h-[90vh] max-w-full rounded-lg shadow-2xl object-contain"
        transition:scale={{ duration: 200, start: 0.8 }}
      />
    </div>
  </div>
{/if}

<style>
  /* 모달 애니메이션 */
  :global(.fade-enter-active),
  :global(.fade-leave-active) {
    transition: opacity 0.2s ease;
  }
  
  :global(.fade-enter-from),
  :global(.fade-leave-to) {
    opacity: 0;
  }
  
  :global(.scale-enter-active),
  :global(.scale-leave-active) {
    transition: transform 0.2s ease;
  }
  
  :global(.scale-enter-from),
  :global(.scale-leave-to) {
    transform: scale(0.8);
  }
</style> 