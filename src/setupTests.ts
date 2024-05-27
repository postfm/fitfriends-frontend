import '@testing-library/jest-dom';

global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {
        // empty
      },
      removeListener: function () {
        // empty
      },
    };
  };

process.env.VITE_API_PREFIX = 'foo';
process.env.VITE_API_BASE_URL = 'bar';
