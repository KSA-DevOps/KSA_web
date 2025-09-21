<script lang="ts">
  import { onMount } from 'svelte';
  import {
    getAllWeatherData,
    getMainTemperature,
    getWeatherIcon,
    getTyphoonWarningSignal,
    getActiveWarnings,
    getWarningDisplayInfoWithSignal,
  } from '../utils/hongkong-weather';
  import type { HongKongWeatherData } from '../types/hongkong-weather';

  export let lang: 'ko' | 'en' = 'ko';

  let currentTemp: number | null = null;
  let weatherIconCode: number = 50;
  let typhoonWarning: { signal: string | null; color: string } = { signal: null, color: '' };
  let hasHighPriorityWarning = false;
  let loading = true;

  onMount(async () => {
    try {
      const weatherData: HongKongWeatherData = await getAllWeatherData();
      
      // Extract temperature
      currentTemp = getMainTemperature(weatherData.currentWeather);
      weatherIconCode = weatherData.currentWeather?.icon?.[0] || 50;

      // Get typhoon warning signal if active
      typhoonWarning = getTyphoonWarningSignal(weatherData.warningInfo);

      // Check for high-priority warnings (danger/extreme)
      const activeWarnings = getActiveWarnings(weatherData.warningInfo);
      hasHighPriorityWarning = activeWarnings.some(({ key, warning }) => {
        const info = getWarningDisplayInfoWithSignal(
          key,
          warning.code || key,
          lang,
        );
        return info && ["extreme", "danger"].includes(info.severity);
      });

      loading = false;
    } catch (error) {
      console.error('Failed to load weather data for navbar:', error);
      loading = false;
    }
  });
</script>

{#if loading}
  <!-- Loading state -->
  <div class="flex items-center gap-2 text-gray-400">
    <span class="animate-pulse">🌤️</span>
    <span class="text-sm">...</span>
  </div>
{:else}
  <!-- Weather display -->
  <div class="flex items-center gap-2">
    <span>{getWeatherIcon(weatherIconCode)}</span>
    {#if currentTemp}
      <span class="font-semibold">{currentTemp}°C</span>
    {/if}
    
    {#if typhoonWarning.signal}
      <span class="text-xs px-2 py-1 rounded-full bg-red-100 text-red-800">
        {typhoonWarning.signal}
      </span>
    {/if}
    
    {#if hasHighPriorityWarning}
      <span class="text-red-500 animate-pulse">⚠️</span>
    {/if}
  </div>
{/if}