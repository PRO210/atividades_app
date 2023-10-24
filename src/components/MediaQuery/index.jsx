import { useDebugValue, useEffect, useState } from 'react';

const useMediaQuery = (queryValue, initialValue = false) => {
  const [match, setMatch] = useState(initialValue);

  useDebugValue(`${queryValue}`);

  useEffect(() => {
    let isMounted = true;
    const matchMedia = window.matchMedia(queryValue);

    const handleChange = () => {
      if (!isMounted) return;
      setMatch(!!matchMedia.matches);
    };

    matchMedia.addEventListener('change', handleChange);
    setMatch(!!matchMedia.matches);

    return () => {
      isMounted = false;
      matchMedia.removeEventListener('change', handleChange);
    };
  }, [queryValue]);

  return match;
};

export const MediaQuery = ({ childMediaQuery }) => {
  const huge = useMediaQuery('(min-width: 1280px)');
  const big = useMediaQuery('(max-width: 1279px) and (min-width: 1024px)');
  const mediumBig = useMediaQuery('(max-width: 1023px) and (min-width: 768px)');
  const medium = useMediaQuery('(max-width: 767px) and (min-width: 640px)');
  const small = useMediaQuery('(max-width: 639px) and (min-width: 320px)');

  // const background = huge ? 'green' : big ? 'orange' : mediumBig ? 'red' : medium ? 'yellow' : small ? 'blue' : null;
  // huge  ? 'huge' : big ? 'big' : mediumBig ? 'mediumBig': medium ? 'medium' : small ? childMediaQuery('small') : null;
  // return <div style={{ fontSize: '60px', background }}> {huge ? 'huge' : big ? 'big' : mediumBig? 'mediumBig': medium ? 'medium' : small ? 'small' : null} </div>;

  return huge
    ? childMediaQuery('huge')
    : big
    ? childMediaQuery('big')
    : mediumBig
    ? childMediaQuery('mediumBig')
    : medium
    ? childMediaQuery('medium')
    : small
    ? childMediaQuery('small')
    : '';
};

export default MediaQuery;
