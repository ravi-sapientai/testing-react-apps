const React = require('react');
const { render, screen, fireEvent } = require('@testing-library/react');
const App = require('../../../src/examples/easy-button').default;

// Mock the components and hooks
jest.mock('../../../src/components/easy-button', () => {
  return function MockEasyButton({ children, onClick }) {
    return <button onClick={onClick}>{children}</button>;
  };
});

const mockSetTheme = jest.fn();
let mockTheme = 'light';
jest.mock('../../../src/components/theme', () => ({
  ThemeProvider: ({ children }) => <div>{children}</div>,
  useTheme: () => [mockTheme, mockSetTheme],
}));

// Mock the alert function
global.alert = jest.fn();

describe('App Component', () => {
  beforeEach(() => {
    mockTheme = 'light';
    mockSetTheme.mockImplementation((callback) => {
      mockTheme = callback(mockTheme);
    });
  });

  it('renders the main heading', () => {
    render(<App />);
    expect(screen.getByText('Hit the easy button!')).toBeTruthy();
  });

  it('renders the EasyButton with correct text', () => {
    render(<App />);
    expect(screen.getByText('Easy!')).toBeTruthy();
  });

  it('calls alert when EasyButton is clicked', () => {
    render(<App />);
    const easyButton = screen.getByText('Easy!');
    fireEvent.click(easyButton);
    expect(global.alert).toHaveBeenCalledWith('that was easy');
  });

  it('renders the ThemeToggler with initial theme', () => {
    render(<App />);
    expect(screen.getByText('Toggle theme: light')).toBeTruthy();
  });

  it('toggles theme when ThemeToggler is clicked', () => {
    render(<App />);
    const themeToggler = screen.getByText(/Toggle theme:/);
    expect(themeToggler).toHaveTextContent('Toggle theme: light');
    fireEvent.click(themeToggler);
    expect(themeToggler).toHaveTextContent('Toggle theme: dark');
    fireEvent.click(themeToggler);
    expect(themeToggler).toHaveTextContent('Toggle theme: light');
  });
});