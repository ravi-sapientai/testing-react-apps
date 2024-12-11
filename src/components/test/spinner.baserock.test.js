const React = require('react');
const { render, screen } = require('@testing-library/react');
const { act } = require('react-dom/test-utils');
const Spinner = require('../../../src/components/spinner').default;

describe('Spinner component', () => {
  it('renders without crashing', () => {
    act(() => {
      render(<Spinner />);
    });
    const spinnerElement = screen.getByLabelText('loading...');
    expect(spinnerElement).toBeInTheDocument();
  });

  it('has the correct CSS class', () => {
    act(() => {
      render(<Spinner />);
    });
    const spinnerElement = screen.getByLabelText('loading...');
    expect(spinnerElement).toHaveClass('lds-ripple');
  });

  it('contains two child div elements', () => {
    act(() => {
      render(<Spinner />);
    });
    const spinnerElement = screen.getByLabelText('loading...');
    const childDivs = spinnerElement.querySelectorAll('div');
    expect(childDivs).toHaveLength(2);
    childDivs.forEach(div => {
      expect(div.tagName).toBe('DIV');
    });
  });

  it('has the correct aria-label', () => {
    act(() => {
      render(<Spinner />);
    });
    const spinnerElement = screen.getByLabelText('loading...');
    expect(spinnerElement).toHaveAttribute('aria-label', 'loading...');
  });

  it('renders with correct structure', () => {
    let container;
    act(() => {
      ({ container } = render(<Spinner />));
    });
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        aria-label="loading..."
        class="lds-ripple"
      >
        <div />
        <div />
      </div>
    `);
  });
});