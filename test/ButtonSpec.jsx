import Button from '../transpiled/Button';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

describe('Button', () => {
  let button, clickCalled;

  const clickFunction = () => clickCalled = true;

  beforeEach(() => {
    clickCalled = false;

    button = TestUtils.renderIntoDocument(
      <Button id='button-id' className='test-button-class' onClick={clickFunction}>Button Text</Button>
    );
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(button).parentNode);
  });

  it('is enabled by default', () => {
    expect(button.props.enabled).toBe(true);
    expect(ReactDOM.findDOMNode(button)).not.toHaveClass('disabled');
  });

  it('renders a button', () => {
    expect(TestUtils.findRenderedDOMComponentWithTag(button, 'button')).not.toBeNull();
  });

  it('keeps the passed in classes', () => {
    expect(ReactDOM.findDOMNode(button)).toHaveClass('test-button-class');
  });

  it('keeps all passed in properties', () => {
    expect(ReactDOM.findDOMNode(button).id).toBe('button-id');
  });

  it('renders the text of the button', () => {
    expect(ReactDOM.findDOMNode(button).textContent).toBe('Button Text');
  });

  it('executes the click function when clicked', () => {
    TestUtils.Simulate.click(ReactDOM.findDOMNode(button));

    expect(clickCalled).toBe(true);
  });

  it('is not hidden when hidden is false', () => {
    expect(ReactDOM.findDOMNode(button)).not.toHaveClass('rs-hidden');
  });

  it('is hidden when hidden is true', () => {
    button = TestUtils.renderIntoDocument(
      <Button hidden={true}>Button Text</Button>
    );

    expect(ReactDOM.findDOMNode(button)).toHaveClass('rs-hidden');
  });

  describe('button canonStyles', () => {
    const renderButton = (canonStyle) => {
      button = TestUtils.renderIntoDocument(
        <Button canonStyle={canonStyle}>Button Text</Button>
      );
    };

    it('action', () => {
      renderButton('action');

      expect(ReactDOM.findDOMNode(button)).toHaveClass('rs-btn');
      expect(ReactDOM.findDOMNode(button)).toHaveClass('rs-btn-action');
      // The spaces before and after are present on an action button because the cog and caret item surround the text
      expect(ReactDOM.findDOMNode(button).textContent).toBe(' Button Text ');
      expect(TestUtils.findRenderedDOMComponentWithClass(button, 'rs-cog')).not.toBeNull();
      expect(TestUtils.findRenderedDOMComponentWithClass(button, 'rs-caret')).not.toBeNull();
    });

    it('primary', () => {
      renderButton('primary');

      expect(ReactDOM.findDOMNode(button)).toHaveClass('rs-btn');
      expect(ReactDOM.findDOMNode(button)).toHaveClass('rs-btn-primary');
    });

    it('secondary', () => {
      renderButton('secondary');

      expect(ReactDOM.findDOMNode(button)).toHaveClass('rs-btn');
    });

    it('link', () => {
      renderButton('link');

      expect(ReactDOM.findDOMNode(button)).toHaveClass('rs-btn');
      expect(ReactDOM.findDOMNode(button)).toHaveClass('rs-btn-link');
    });

    it('login', () => {
      renderButton('login');

      expect(ReactDOM.findDOMNode(button)).toHaveClass('rs-btn');
      expect(ReactDOM.findDOMNode(button)).toHaveClass('rs-btn-login');
    });

    it('cog', () => {
      renderButton('cog');

      expect(ReactDOM.findDOMNode(button)).toHaveClass('rs-cog');
    });

    it('delete', () => {
      renderButton('delete');

      expect(ReactDOM.findDOMNode(button)).toHaveClass('rs-delete');
    });

    it('edit', () => {
      renderButton('edit');

      expect(ReactDOM.findDOMNode(button)).toHaveClass('rs-edit');
    });

    it('plus', () => {
      renderButton('plus');

      expect(ReactDOM.findDOMNode(button)).toHaveClass('rs-plus');
    });
  });

  describe('when disabled', () => {
    beforeEach(() => {
      button = TestUtils.renderIntoDocument(
        <Button enabled={false} onClick={clickFunction}>Button text</Button>
      );
    });

    it('adds a disabled class to the button', () => {
      expect(ReactDOM.findDOMNode(button)).toHaveClass('disabled');
    });

    it('does not execute the click function when clicked', () => {
      TestUtils.Simulate.click(ReactDOM.findDOMNode(button));

      expect(clickCalled).toBe(false);
    });
  });
});
