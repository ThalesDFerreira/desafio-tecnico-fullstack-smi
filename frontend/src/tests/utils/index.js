import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

// setup function
function customRender(component, historyEntries = '/') {
  const history = createMemoryHistory({ initialEntries: [historyEntries] });
  return {
    user: userEvent.setup(),
    // Import `render` from the framework library of your choice.
    // See https://testing-library.com/docs/dom-testing-library/install#wrappers

    ...render(<BrowserRouter history={history}>{component}</BrowserRouter>),
    history,
  };
}

export default customRender;
