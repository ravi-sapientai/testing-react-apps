const React = require('react');
const { render } = require('@testing-library/react');
const { act } = require('react-dom/test-utils');
const EasyButton = require('../../../src/components/easy-button').default;

// Mock the useTheme hook
jest.mock('../../../src/components/theme', () => ({
  useTheme: jest.fn()
}));

describe('EasyButton', () => {
  it('renders with dark theme', async () => {
    jest.requireMock('../../../src/components/theme').useTheme.mockReturnValue(['dark']);
    let container;
    await act(async () => {
      const renderResult = render(<EasyButton>Click me</EasyButton>);
      container = renderResult.container;
    });
    const button = container.firstChild;
    
    expect(button).toHaveStyle({
      backgroundColor: 'black',
      color: 'white'
    });
    expect(button).toHaveTextContent('Click me');
  });

  it('renders with light theme', async () => {
    jest.requireMock('../../../src/components/theme').useTheme.mockReturnValue(['light']);
    let container;
    await act(async () => {
      const renderResult = render(<EasyButton>Click me</EasyButton>);
      container = renderResult.container;
    });
    const button = container.firstChild;
    
    expect(button).toHaveStyle({
      backgroundColor: 'white',
      color: 'black'
    });
    expect(button).toHaveTextContent('Click me');
  });

  it('passes additional props to the button', async () => {
    jest.requireMock('../../../src/components/theme').useTheme.mockReturnValue(['light']);
    let container;
    await act(async () => {
      const renderResult = render(<EasyButton disabled>Click me</EasyButton>);
      container = renderResult.container;
    });
    const button = container.firstChild;
    
    expect(button).toBeDisabled();
  });

  it('renders with different button text', async () => {
    jest.requireMock('../../../src/components/theme').useTheme.mockReturnValue(['dark']);
    let container;
    await act(async () => {
      const renderResult = render(<EasyButton>Submit</EasyButton>);
      container = renderResult.container;
    });
    const button = container.firstChild;
    
    expect(button).toHaveTextContent('Submit');
  });

  it('applies correct styles based on theme', async () => {
    const mockUseTheme = jest.requireMock('../../../src/components/theme').useTheme;
    mockUseTheme.mockReturnValue(['light']);
    let container;
    await act(async () => {
      const renderResult = render(<EasyButton>Test</EasyButton>);
      container = renderResult.container;
    });
    let button = container.firstChild;
    
    expect(button).toHaveStyle({
      backgroundColor: 'white',
      color: 'black'
    });

    mockUseTheme.mockReturnValue(['dark']);
    await act(async () => {
      render(<EasyButton>Test</EasyButton>, { container });
    });
    button = container.firstChild;

    expect(button).toHaveStyle({
      backgroundColor: 'black',
      color: 'white'
    });
  });
});