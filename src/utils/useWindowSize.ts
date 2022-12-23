import { useState, useEffect } from 'react';

export function useScreenWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isDesktop = width >= 1220
  const isTablet = width >= 690 && width < 1220
  const isMobile = width < 690

  return {
    isDesktop,
    isTablet,
    isMobile
  }


}