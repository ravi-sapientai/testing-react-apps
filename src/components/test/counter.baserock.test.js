const React = require('react');
const { render, fireEvent, act } = require('@testing-library/react');
const Counter = require('../../../src/components/counter').default;

describe('Counter Component', () => {
  it('renders initial count of 0', () => {
    let component;
    act(() => {
      component = render(<Counter />);
    });
    const { getByText } = component;
    expect(getByText('Current count: 0')).toBeTruthy();
  });

  it('increments count when Increment button is clicked', () => {
    let component;
    act(() => {
      component = render(<Counter />);
    });
    const { getByText } = component;
    const incrementButton = getByText('Increment');
    
    act(() => {
      fireEvent.click(incrementButton);
    });
    expect(getByText('Current count: 1')).toBeTruthy();
    
    act(() => {
      fireEvent.click(incrementButton);
    });
    expect(getByText('Current count: 2')).toBeTruthy();
  });

  it('decrements count when Decrement button is clicked', () => {
    let component;
    act(() => {
      component = render(<Counter />);
    });
    const { getByText } = component;
    const decrementButton = getByText('Decrement');
    
    act(() => {
      fireEvent.click(decrementButton);
    });
    expect(getByText('Current count: -1')).toBeTruthy();
    
    act(() => {
      fireEvent.click(decrementButton);
    });
    expect(getByText('Current count: -2')).toBeTruthy();
  });

  it('allows incrementing and decrementing in sequence', () => {
    let component;
    act(() => {
      component = render(<Counter />);
    });
    const { getByText } = component;
    const incrementButton = getByText('Increment');
    const decrementButton = getByText('Decrement');
    
    act(() => {
      fireEvent.click(incrementButton);
      fireEvent.click(incrementButton);
    });
    expect(getByText('Current count: 2')).toBeTruthy();
    
    act(() => {
      fireEvent.click(decrementButton);
    });
    expect(getByText('Current count: 1')).toBeTruthy();
    
    act(() => {
      fireEvent.click(decrementButton);
      fireEvent.click(decrementButton);
    });
    expect(getByText('Current count: -1')).toBeTruthy();
  });

  it('renders buttons with correct text', () => {
    let component;
    act(() => {
      component = render(<Counter />);
    });
    const { getByText } = component;
    expect(getByText('Increment')).toBeTruthy();
    expect(getByText('Decrement')).toBeTruthy();
  });

  it('updates count correctly when setCount is called directly', () => {
    let component;
    act(() => {
      component = render(<Counter />);
    });
    const { getByText } = component;
    const incrementButton = getByText('Increment');
    
    act(() => {
      for (let i = 0; i < 5; i++) {
        fireEvent.click(incrementButton);
      }
    });
    
    expect(getByText('Current count: 5')).toBeTruthy();
  });
});