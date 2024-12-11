const React = require('react');
const useCounter = require('../../../src/components/use-counter').default;

// Mock React.useState
jest.spyOn(React, 'useState').mockImplementation(initial => {
  let state = initial;
  const setState = jest.fn(newState => {
    if (typeof newState === 'function') {
      state = newState(state);
    } else {
      state = newState;
    }
  });
  return [state, setState];
});

describe('useCounter', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with default values', () => {
    const { count } = useCounter();
    expect(count).toBe(0);
  });

  it('should initialize with custom initial count', () => {
    const { count } = useCounter({ initialCount: 10 });
    expect(count).toBe(10);
  });

  it('should initialize with custom step', () => {
    const { count } = useCounter({ step: 5 });
    expect(count).toBe(0);
  });

  it('should increment the counter', () => {
    const { increment } = useCounter();
    increment();
    expect(React.useState).toHaveBeenCalledWith(1);
  });

  it('should decrement the counter', () => {
    const { decrement } = useCounter();
    decrement();
    expect(React.useState).toHaveBeenCalledWith(-1);
  });

  it('should increment with custom step', () => {
    const { increment } = useCounter({ step: 3 });
    increment();
    expect(React.useState).toHaveBeenCalledWith(3);
  });

  it('should decrement with custom step', () => {
    const { decrement } = useCounter({ step: 3 });
    decrement();
    expect(React.useState).toHaveBeenCalledWith(-3);
  });

  it('should handle multiple increments', () => {
    const { increment } = useCounter();
    increment();
    increment();
    increment();
    expect(React.useState).toHaveBeenCalledWith(3);
  });

  it('should handle multiple decrements', () => {
    const { decrement } = useCounter();
    decrement();
    decrement();
    decrement();
    expect(React.useState).toHaveBeenCalledWith(-3);
  });

  it('should handle increment and decrement operations', () => {
    const { increment, decrement } = useCounter({ initialCount: 5, step: 2 });
    increment();
    increment();
    decrement();
    expect(React.useState).toHaveBeenCalledWith(7);
  });
});