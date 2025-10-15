import '@testing-library/jest-dom'

// Mock fetch globally for tests
global.fetch = jest.fn()

// Mock AbortSignal.timeout for older Node versions
if (!global.AbortSignal.timeout) {
  global.AbortSignal.timeout = (delay) => {
    const controller = new AbortController()
    setTimeout(() => controller.abort(), delay)
    return controller.signal
  }
}

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  warn: jest.fn(),
  error: jest.fn(),
}