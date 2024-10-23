import { Provider } from 'react-redux';
import Navigation from './router/Navigation';
import store from './store/store';
import AppTheme from './theme/AppTheme';
import { Box } from '@mui/material';

const App = () => {
  return (
    <Box>
      <Provider store={store}>
        <AppTheme>
          <Navigation />
        </AppTheme>
      </Provider>
    </Box>
  );
};

export default App;
