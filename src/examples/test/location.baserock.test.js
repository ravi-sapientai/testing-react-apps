const React = require('react');
const { render, screen } = require('@testing-library/react');
const Location = require('../../../src/examples/location').default;

jest.mock('react-use-geolocation', () => ({
  useCurrentPosition: jest.fn()
}));

const { useCurrentPosition } = require('react-use-geolocation');

describe('Location Component', () => {
  it('renders loading state when position is not available', () => {
    useCurrentPosition.mockReturnValue([null, null]);
    render(<Location />);
    expect(screen.queryByText(/Latitude:/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Longitude:/)).not.toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('renders error message when there is an error', () => {
    const errorMessage = 'Geolocation error';
    useCurrentPosition.mockReturnValue([null, { message: errorMessage }]);
    render(<Location />);
    const errorElement = screen.getByRole('alert');
    expect(errorElement).toHaveTextContent(errorMessage);
    expect(errorElement).toHaveStyle({ color: 'red' });
  });

  it('renders latitude and longitude when position is available', () => {
    const mockPosition = {
      coords: {
        latitude: 51.5074,
        longitude: -0.1278
      }
    };
    useCurrentPosition.mockReturnValue([mockPosition, null]);
    render(<Location />);
    expect(screen.getByText(/Latitude:/)).toHaveTextContent('Latitude: 51.5074');
    expect(screen.getByText(/Longitude:/)).toHaveTextContent('Longitude: -0.1278');
  });
});