// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppRoutes } from './AppRoutes';
import { store } from './store/store';

import './index.scss';
import '@styles/main.scss';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

export const Root = () => (
  // <StrictMode>
  <Provider store={store}>
    <Router>
      <AppRoutes />
    </Router>
  </Provider>
  // </StrictMode>
);

root.render(<Root />);
