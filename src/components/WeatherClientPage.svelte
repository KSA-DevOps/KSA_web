<script lang="ts">
  import { onMount } from 'svelte';
  import type { HongKongWeatherData } from '../types/hongkong-weather';
  import { 
    getAllWeatherData, 
    getMainTemperature, 
    getMainHumidity, 
    formatUpdateTime, 
    getWeatherIcon, 
    getActiveWarnings, 
    getWarningDisplayInfoWithSignal, 
    getWarningSeverityStyles,
    translateDayName,
    formatForecastDate
  } from '../utils/hongkong-weather';

  export let lang: 'ko' | 'en' = 'ko';

  let weatherData: HongKongWeatherData | null = null;
  let loading = true;
  let error = '';
  let showAllStations = false;

  onMount(async () => {
    try {
      weatherData = await getAllWeatherData();
      loading = false;
    } catch (err) {
      console.error('Failed to load weather data:', err);
      error = lang === 'ko' ? '날씨 정보를 불러오는데 실패했습니다.' : 'Failed to load weather information.';
      loading = false;
    }
  });

  $: mainTemp = weatherData ? getMainTemperature(weatherData.currentWeather) : null;
  $: mainHumidity = weatherData ? getMainHumidity(weatherData.currentWeather) : null;
  $: activeWarnings = weatherData ? getActiveWarnings(weatherData.warningInfo) : [];
</script>

{#if loading}
  <div class="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 pt-header">
    <div class="absolute inset-0 bg-black/10"></div>
    <div class="relative z-10 text-center px-4 max-w-4xl mx-auto">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p class="text-gray-600">
        {lang === 'ko' ? '날씨 정보를 불러오는 중...' : 'Loading weather information...'}
      </p>
    </div>
  </div>
{:else if error}
  <div class="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 pt-header">
    <div class="absolute inset-0 bg-black/10"></div>
    <div class="relative z-10 text-center px-4 max-w-4xl mx-auto">
      <div class="text-red-600 mb-4 text-6xl">⚠️</div>
      <p class="text-red-600 text-xl">{error}</p>
    </div>
  </div>
{:else if weatherData}
  <!-- Hero Section -->
  <section class="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 pt-header">
    <div class="absolute inset-0 bg-black/10"></div>
    <div class="relative z-10 text-center px-4 max-w-4xl mx-auto">
      <h1 class="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
        {lang === 'ko' ? '홍콩 날씨 정보' : 'Hong Kong Weather'}
      </h1>
      <p class="text-lg md:text-xl text-gray-600 mb-6">
        {lang === 'ko' 
          ? '홍콩 거주 한국 학생들을 위한 실시간 날씨 정보' 
          : 'Real-time weather information for Korean students in Hong Kong'}
      </p>
      
      {#if weatherData.currentWeather}
        <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg inline-block">
          <div class="flex items-center justify-center gap-4">
            <span class="text-3xl">{getWeatherIcon(weatherData.currentWeather.icon?.[0] || 50)}</span>
            {#if mainTemp}
              <div class="text-center">
                <div class="text-3xl font-bold text-gray-800">{mainTemp}°C</div>
                <div class="text-sm text-gray-600">
                  {lang === 'ko' ? '학교 지역 기온' : 'School Area Temperature'}
                </div>
              </div>
            {/if}
            {#if mainHumidity}
              <div class="text-center">
                <div class="text-3xl font-bold text-blue-600">{mainHumidity}%</div>
                <div class="text-sm text-gray-600">
                  {lang === 'ko' ? '습도' : 'Humidity'}
                </div>
              </div>
            {/if}
          </div>
        </div>
      {/if}
    </div>
  </section>

  <!-- Weather Warnings Section -->
  {#if activeWarnings.length > 0}
    <section class="py-8 bg-gradient-to-r from-red-50 to-orange-50">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-2xl font-bold text-center mb-6 text-red-800">
            {lang === 'ko' ? '⚠️ 기상 경보' : '⚠️ Weather Warnings'}
          </h2>
          
          <div class="space-y-4">
            {#each activeWarnings as warning}
              {@const displayInfo = getWarningDisplayInfoWithSignal(warning.key, warning.warning.code, lang)}
              {@const severityStyles = getWarningSeverityStyles(warning.warning.code)}
              
              <div class="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-{severityStyles.split(' ')[1]}">
                <div class="flex items-center mb-4">
                  <span class="text-2xl mr-3">{displayInfo?.emoji || '⚠️'}</span>
                  <div>
                    <h3 class="text-lg font-bold {severityStyles}">
                      {displayInfo?.name || warning.warning.name}
                    </h3>
                    <p class="text-sm text-gray-600">
                      {#if warning.warning.issueTime}
                        {lang === 'ko' ? '발효:' : 'Issued:'} {formatUpdateTime(warning.warning.issueTime, lang)}
                      {:else}
                        {lang === 'ko' ? '발효 시간 정보 없음' : 'Issue time not available'}
                      {/if}
                    </p>
                  </div>
                </div>
                
                {#if warning.warning.contents && warning.warning.contents.length > 0}
                  <div class="space-y-2">
                    {#each warning.warning.contents as content}
                      <p class="text-gray-700 leading-relaxed">{content.text}</p>
                    {/each}
                  </div>
                {/if}
              </div>
            {/each}
          </div>
        </div>
      </div>
    </section>
  {/if}

  <!-- Today's Weather Description -->
  {#if weatherData.localForecast}
    <section class="py-8 bg-gradient-to-r from-blue-50 to-sky-50">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-2xl font-bold text-center mb-6 text-gray-800">
            {lang === 'ko' ? '오늘의 날씨' : 'Today\'s Weather'}
          </h2>
          
          <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <!-- Today's Forecast -->
            {#if weatherData.localForecast.forecastDesc}
              <div class="mb-4">
                <h3 class="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                  <span class="mr-2">📋</span>
                  {lang === 'ko' ? '오늘의 예보' : 'Today\'s Forecast'}
                </h3>
                <p class="text-gray-700 leading-relaxed bg-sky-50 rounded-lg p-4">
                  {weatherData.localForecast.forecastDesc}
                </p>
              </div>
            {/if}
            
            <!-- Fire Danger Warning Info -->
            {#if weatherData.localForecast.fireDangerWarning}
              <div class="mb-4">
                <h3 class="text-lg font-semibold text-orange-800 mb-2 flex items-center">
                  <span class="mr-2">🔥</span>
                  {lang === 'ko' ? '화재 위험 정보' : 'Fire Danger Information'}
                </h3>
                <p class="text-orange-800 leading-relaxed bg-orange-50 rounded-lg p-4 border border-orange-200">
                  {weatherData.localForecast.fireDangerWarning}
                </p>
              </div>
            {/if}
            
            <!-- Tropical Cyclone Info -->
            {#if weatherData.localForecast.tcInfo}
              <div class="mb-4">
                <h3 class="text-lg font-semibold text-red-800 mb-2 flex items-center">
                  <span class="mr-2">🌪️</span>
                  {lang === 'ko' ? '태풍 정보' : 'Tropical Cyclone Information'}
                </h3>
                <p class="text-red-800 leading-relaxed bg-red-50 rounded-lg p-4 border border-red-200">
                  {weatherData.localForecast.tcInfo}
                </p>
              </div>
            {/if}
            
            {#if weatherData.localForecast.updateTime}
              <div class="text-center text-sm text-gray-500 mt-4">
                {lang === 'ko' ? '최종 업데이트:' : 'Last updated:'} {formatUpdateTime(weatherData.localForecast.updateTime, lang)}
              </div>
            {/if}
          </div>
        </div>
      </div>
    </section>
  {/if}

  <!-- 9-Day Forecast -->
  {#if weatherData.nineDayForecast && weatherData.nineDayForecast.weatherForecast}
    <section class="py-8 bg-gradient-to-r from-green-50 to-emerald-50">
      <div class="container mx-auto px-4">
        <div class="max-w-6xl mx-auto">
          <h2 class="text-2xl font-bold text-center mb-8 text-gray-800">
            {lang === 'ko' ? '9일 일기 예보' : '9-Day Weather Forecast'}
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each weatherData.nineDayForecast.weatherForecast as forecast}
              <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <div class="text-center">
                  <h3 class="font-semibold text-gray-800 mb-2">
                    {translateDayName(forecast.week, lang)} ({formatForecastDate(forecast.forecastDate, lang)})
                  </h3>
                  
                  <div class="flex justify-center mb-4">
                    <span class="text-4xl">{getWeatherIcon(forecast.ForecastIcon)}</span>
                  </div>
                  
                  <div class="space-y-2">
                    <div class="flex justify-between items-center">
                      <span class="text-sm text-gray-600">
                        {lang === 'ko' ? '최고' : 'High'}
                      </span>
                      <span class="font-bold text-red-600">{forecast.forecastMaxtemp?.value}°C</span>
                    </div>
                    
                    <div class="flex justify-between items-center">
                      <span class="text-sm text-gray-600">
                        {lang === 'ko' ? '최저' : 'Low'}
                      </span>
                      <span class="font-bold text-blue-600">{forecast.forecastMintemp?.value}°C</span>
                    </div>
                    
                    <div class="flex justify-between items-center">
                      <span class="text-sm text-gray-600">
                        {lang === 'ko' ? '습도' : 'Humidity'}
                      </span>
                      <span class="text-gray-800">{forecast.forecastMaxrh?.value}%</span>
                    </div>
                  </div>
                  
                  <p class="text-sm text-gray-700 mt-3 leading-relaxed">
                    {forecast.forecastWeather}
                  </p>
                </div>
              </div>
            {/each}
          </div>
          
          {#if weatherData.nineDayForecast.updateTime}
            <div class="text-center text-sm text-gray-500 mt-6">
              {lang === 'ko' ? '최종 업데이트:' : 'Last updated:'} {formatUpdateTime(weatherData.nineDayForecast.updateTime, lang)}
            </div>
          {/if}
        </div>
      </div>
    </section>
  {/if}

  <!-- Special Weather Tips -->
  {#if weatherData.specialTips?.swt && weatherData.specialTips.swt.length > 0}
    <section class="py-8 bg-gradient-to-r from-yellow-50 to-amber-50">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-2xl font-bold text-center mb-6 text-gray-800">
            {lang === 'ko' ? '💡 날씨 팁' : '💡 Weather Tips'}
          </h2>
          
          <div class="space-y-4">
            {#each weatherData.specialTips.swt as tip}
              <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <p class="text-gray-700 leading-relaxed">{tip.desc}</p>
                <div class="text-right text-xs text-gray-500 mt-2">
                  {formatUpdateTime(tip.updateTime, lang)}
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </section>
  {/if}

  <!-- Current Weather Details -->
  {#if weatherData.currentWeather}
    <section class="py-8 bg-white">
      <div class="container mx-auto px-4">
        <div class="max-w-6xl mx-auto">
          <h2 class="text-2xl font-bold text-center mb-8 text-gray-800">
            {lang === 'ko' ? '현재 날씨 상세 정보' : 'Current Weather Details'}
          </h2>
          
          <!-- Compact Temperature Display -->
          {#if weatherData.currentWeather.temperature?.data}
            {@const mainStations = weatherData.currentWeather.temperature.data.slice(0, 6)}
            {@const remainingStations = weatherData.currentWeather.temperature.data.slice(6)}
            
            <!-- Main Stations (Always Visible) -->
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-4">
              {#each mainStations as station}
                <div class="bg-gradient-to-br from-blue-50 to-sky-100 rounded-xl p-4 shadow-md text-center">
                  <h3 class="font-medium text-gray-800 text-sm mb-1">{station.place}</h3>
                  <div class="text-xl font-bold text-blue-600">{station.value}°C</div>
                </div>
              {/each}
            </div>
            
            <!-- Show More/Less Toggle -->
            {#if remainingStations.length > 0}
              <div class="text-center mb-6">
                <button
                  on:click={() => showAllStations = !showAllStations}
                  class="inline-flex items-center px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors duration-200 text-sm font-medium"
                >
                  {showAllStations 
                    ? (lang === 'ko' ? '간단히 보기' : 'Show Less')
                    : (lang === 'ko' ? `더 보기 (+${remainingStations.length}개 지역)` : `Show More (+${remainingStations.length} stations)`)
                  }
                  <span class="ml-1 transform transition-transform duration-200 {showAllStations ? 'rotate-180' : ''}">
                    ⌄
                  </span>
                </button>
              </div>
              
              <!-- Additional Stations (Collapsible) -->
              {#if showAllStations}
                <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-6">
                  {#each remainingStations as station}
                    <div class="bg-gradient-to-br from-gray-50 to-slate-100 rounded-lg p-3 shadow-sm text-center">
                      <h3 class="font-medium text-gray-700 text-xs mb-1">{station.place}</h3>
                      <div class="text-lg font-bold text-gray-600">{station.value}°C</div>
                    </div>
                  {/each}
                </div>
              {/if}
            {/if}
          {/if}
          
          <!-- Rainfall Information -->
          {#if weatherData.currentWeather.rainfall.data.some(r => r.max > 0)}
            {@const rainfallData = weatherData.currentWeather.rainfall.data.filter(r => r.max > 0)}
            <div class="mt-6">
              <h3 class="text-lg font-bold text-center mb-4 text-gray-800">
                {lang === 'ko' ? '💧 강수량 정보' : '💧 Rainfall Information'}
              </h3>
              
              <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {#each rainfallData as rainfall}
                  <div class="bg-gradient-to-br from-sky-50 to-blue-100 rounded-lg p-3 shadow-sm text-center">
                    <h4 class="font-medium text-gray-800 text-xs mb-1">{rainfall.place}</h4>
                    <div class="text-lg font-bold text-sky-600">{rainfall.max}mm</div>
                  </div>
                {/each}
              </div>
              
              <div class="text-center text-xs text-gray-500 mt-3">
                {formatUpdateTime(weatherData.currentWeather.rainfall.startTime, lang)} - 
                {formatUpdateTime(weatherData.currentWeather.rainfall.endTime, lang)}
              </div>
            </div>
          {/if}
          
          {#if weatherData.currentWeather.updateTime}
            <div class="text-center text-sm text-gray-500 mt-6">
              {lang === 'ko' ? '최종 업데이트:' : 'Last updated:'} {formatUpdateTime(weatherData.currentWeather.updateTime, lang)}
            </div>
          {/if}
        </div>
      </div>
    </section>
  {/if}

  <!-- Data Source Footer -->
  <section class="py-8 bg-gray-50">
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto text-center">
        <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">
            {lang === 'ko' ? '📡 데이터 출처' : '📡 Data Source'}
          </h3>
          <p class="text-gray-700 mb-4">
            {lang === 'ko' 
              ? '모든 날씨 정보는 홍콩 천문대에서 제공됩니다.' 
              : 'All weather information is provided by the Hong Kong Observatory.'}
          </p>
          <a 
            href="https://www.hko.gov.hk" 
            target="_blank" 
            rel="noopener noreferrer"
            class="inline-flex items-center px-6 py-3 rounded-lg transition-colors duration-200 font-medium shadow-lg border-2"
            style="color: #000000 !important; background-color: #fbbf24 !important; border-color: #f59e0b !important;"
          >
            <span class="mr-2">🌐</span>
            {lang === 'ko' ? '홍콩 천문대 공식 웹사이트' : 'Hong Kong Observatory Official Website'}
          </a>
        </div>
      </div>
    </div>
  </section>
{/if}