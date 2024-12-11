const React = require('react');
const { render, screen, fireEvent, act, waitFor } = require('@testing-library/react');
const LoginSubmission = require('../../../src/components/login-submission').default;

// Mock the fetch function
global.fetch = jest.fn();

// Mock child components
jest.mock('../../../src/components/login', () => ({ onSubmit }) => (
  <button onClick={() => onSubmit({ username: 'testuser', password: 'password' })}>
    Login
  </button>
));
jest.mock('../../../src/components/spinner', () => () => <div>Loading...</div>);

describe('LoginSubmission', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('renders login form initially', () => {
    render(<LoginSubmission />);
    expect(screen.getByText('Login')).toBeTruthy();
  });

  it('shows spinner when submitting', async () => {
    fetch.mockImplementationOnce(() => new Promise(() => {}));
    
    render(<LoginSubmission />);
    
    await act(async () => {
      fireEvent.click(screen.getByText('Login'));
    });

    expect(screen.getByText('Loading...')).toBeTruthy();
  });

  it('displays welcome message on successful login', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ username: 'testuser' }),
      })
    );

    render(<LoginSubmission />);

    await act(async () => {
      fireEvent.click(screen.getByText('Login'));
    });

    await waitFor(() => {
      expect(screen.getByText((content, element) => {
        return element.tagName.toLowerCase() === 'div' && content.startsWith('Welcome');
      })).toBeTruthy();
    });
  });

  it('displays error message on login failure', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: 'Invalid credentials' }),
      })
    );

    render(<LoginSubmission />);

    await act(async () => {
      fireEvent.click(screen.getByText('Login'));
    });

    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeTruthy();
    });
  });
});

describe('useFormSubmission behavior', () => {
  it('handles empty form data', async () => {
    render(<LoginSubmission />);
    expect(screen.queryByText('Loading...')).toBeNull();
    expect(screen.queryByText(/error/i)).toBeNull();
  });

  it('handles network error', async () => {
    fetch.mockImplementationOnce(() => Promise.reject(new Error('Network error')));

    render(<LoginSubmission />);

    await act(async () => {
      fireEvent.click(screen.getByText('Login'));
    });

    await waitFor(() => {
      expect(screen.getByText('Network error')).toBeTruthy();
    });
  });
});