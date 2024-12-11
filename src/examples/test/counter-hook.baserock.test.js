const React = require('react');
const { render, fireEvent } = require('@testing-library/react');
const Counter = require('../../../src/examples/counter-hook').default;

// Mock the useCounter hook
jest.mock('../../../src/components/use-counter', () => {
  return jest.fn(() => ({
    count: 0,
    increment: jest.fn(),
    decrement: jest.fn(),
  }));
});

const useCounter = require('../../../src/components/use-counter');

describe('Counter Component', () => {
  beforeEach(() => {
    // Reset the mock before each test
    useCounter.mockClear();
  });

  it('renders initial count', () => {
    const { getByText } = render(<Counter />);
    expect(getByText('Current count: 0')).toBeTruthy();
  });

  it('calls increment when Increment button is clicked', () => {
    const mockIncrement = jest.fn();
    useCounter.mockImplementation(() => ({
      count: 0,
      increment: mockIncrement,
      decrement: jest.fn(),
    }));

    const { getByText } = render(<Counter />);
    fireEvent.click(getByText('Increment'));
    expect(mockIncrement).toHaveBeenCalledTimes(1);
  });

  it('calls decrement when Decrement button is clicked', () => {
    const mockDecrement = jest.fn();
    useCounter.mockImplementation(() => ({
      count: 0,
      increment: jest.fn(),
      decrement: mockDecrement,
    }));

    const { getByText } = render(<Counter />);
    fireEvent.click(getByText('Decrement'));
    expect(mockDecrement).toHaveBeenCalledTimes(1);
  });

  it('updates count when increment is called', () => {
    let count = 0;
    const mockIncrement = jest.fn(() => {
      count += 1;
    });
    useCounter.mockImplementation(() => ({
      count,
      increment: mockIncrement,
      decrement: jest.fn(),
    }));

    const { getByText, rerender } = render(<Counter />);
    fireEvent.click(getByText('Increment'));
    
    // Update the mock to reflect the new count
    useCounter.mockImplementation(() => ({
      count,
      increment: mockIncrement,
      decrement: jest.fn(),
    }));

    rerender(<Counter />);
    expect(getByText('Current count: 1')).toBeTruthy();
  });

  it('updates count when decrement is called', () => {
    let count = 0;
    const mockDecrement = jest.fn(() => {
      count -= 1;
    });
    useCounter.mockImplementation(() => ({
      count,
      increment: jest.fn(),
      decrement: mockDecrement,
    }));

    const { getByText, rerender } = render(<Counter />);
    fireEvent.click(getByText('Decrement'));
    
    // Update the mock to reflect the new count
    useCounter.mockImplementation(() => ({
      count,
      increment: jest.fn(),
      decrement: mockDecrement,
    }));

    rerender(<Counter />);
    expect(getByText('Current count: -1')).toBeTruthy();
  });
});