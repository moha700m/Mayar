import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

type NetworkInfo = {
  online: boolean;
};

function readWebOnline() {
  if (Platform.OS !== 'web' || typeof navigator === 'undefined') return true;
  return navigator.onLine;
}

export function useConnectivity(): NetworkInfo {
  const [online, setOnline] = useState(readWebOnline);

  useEffect(() => {
    if (Platform.OS !== 'web' || typeof window === 'undefined') return undefined;

    const sync = () => setOnline(navigator.onLine);
    window.addEventListener('online', sync);
    window.addEventListener('offline', sync);
    sync();

    return () => {
      window.removeEventListener('online', sync);
      window.removeEventListener('offline', sync);
    };
  }, []);

  return { online };
}
