import { ref, unref } from 'vue';

export function useCountdown(count: number) {
  const isStart = ref(false);

  const currentCount = ref(count);

  let timeoutId: ReturnType<typeof setInterval> | null;

  const handleStart = () => {
    isStart.value = true;
    timeoutId = setInterval(() => {
      if (unref(currentCount) === 1) {
        stop();
      } else {
        currentCount.value--;
      }
    }, 1000);
  };

  function stop() {
    currentCount.value = count;
    clear();
    isStart.value = false;
  }

  function clear() {
    timeoutId && window.clearInterval(timeoutId);
  }
  return {
    currentCount,
    isStart,
    handleStart,
    clearInterval,
  };
}
