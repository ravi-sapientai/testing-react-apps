// Mock the entire 'react' module
jest.mock('react', () => {
  const originalModule = jest.requireActual('react');
  return {
    ...originalModule,
    createContext: jest.fn(() => ({
      Provider: jest.fn(({ children }) => children)
    })),
    useContext: jest.fn(),
    useState: jest.fn()
  };
});

const React = require('react');
const { useTheme, ThemeProvider } = require('../../../src/components/theme');

describe('Theme Context', () => {
  let mockSetState;

  beforeEach(() => {
    jest.clearAllMocks();
    mockSetState = jest.fn();
    React.useState.mockReturnValue(['light', mockSetState]);
  });

  describe('useTheme', () => {
    it('should throw an error when used outside of ThemeProvider', () => {
      React.useContext.mockReturnValue(undefined);
      expect(() => useTheme()).toThrow('useTheme should be used within a ThemeProvider');
    });

    it('should return the context value when used within ThemeProvider', () => {
      const mockThemeValue = ['dark', jest.fn()];
      React.useContext.mockReturnValue(mockThemeValue);
      const result = useTheme();
      expect(result).toEqual(mockThemeValue);
    });
  });

  describe('ThemeProvider', () => {
    it('should render with default theme', () => {
      ThemeProvider({ children: 'Test' });
      expect(React.useState).toHaveBeenCalledWith('light');
      expect(React.createContext().Provider).toHaveBeenCalledWith(
        expect.objectContaining({
          value: ['light', expect.any(Function)],
          children: 'Test'
        }),
        {}
      );
    });

    it('should render with custom initial theme', () => {
      React.useState.mockReturnValueOnce(['dark', mockSetState]);
      ThemeProvider({ initialTheme: 'dark', children: 'Test' });
      expect(React.useState).toHaveBeenCalledWith('dark');
      expect(React.createContext().Provider).toHaveBeenCalledWith(
        expect.objectContaining({
          value: ['dark', expect.any(Function)],
          children: 'Test'
        }),
        {}
      );
    });

    it('should pass additional props to the Provider', () => {
      ThemeProvider({ initialTheme: 'light', children: 'Test', customProp: 'value' });
      expect(React.createContext().Provider).toHaveBeenCalledWith(
        expect.objectContaining({
          value: ['light', expect.any(Function)],
          children: 'Test',
          customProp: 'value'
        }),
        {}
      );
    });
  });
});