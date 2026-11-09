import '@testing-library/jest-dom';

beforeEach(() => {
  window.history.replaceState(null, '', '/');
  localStorage.clear();
});
