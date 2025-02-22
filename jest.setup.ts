import '@testing-library/jest-dom';

declare global {
  interface Window {
    ResizeObserver: any;
  }
}

window.ResizeObserver = class ResizeObserver {
  observe() { }
  unobserve() { }
  disconnect() { }
};