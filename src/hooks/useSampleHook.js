import { useEffect } from 'react';

const useSampleHook = (ref, handler) => {
  if (!ref) {
    return;
  }
  useEffect(() => {
    handler();
  });
};

export default useSampleHook;

