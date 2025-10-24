import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // This will scroll the window to the top on every route change
    window.scrollTo(0, 0);
  }, [pathname]); // The effect runs every time the 'pathname' (URL) changes

  return null; // This component doesn't render any HTML
}

export default ScrollToTop;