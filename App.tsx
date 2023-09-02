import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './navigator/StackNavigator';
import { Provider } from 'react-redux';
import { store } from './store';

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <StackNavigator />
      </Provider>
    </NavigationContainer>
  );
}
