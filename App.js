import { View, Text } from 'react-native'
import React from 'react'
import HomeScreen from './components/HomeScreen'
// import Packaging from './components/Packaging'
import TableOrder from './components/TableOrder'
import OnlineOrder from './components/OnlineOrder'
import OrderTrack from './components/OrderTrack'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Menu from './components/Menu'
import Stock from './components/Stock'

// redux
import { Provider } from 'react-redux'
import store from './components/redux/store'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer >
        <Stack.Navigator >
          {/* <Stack.Screen name="BottomTab" component={BottomTab} options={{ headerShown: false }} /> */}
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          {/* <Stack.Screen name="Packaging" component={Packaging} options={{ headerShown: false }} /> */}
          <Stack.Screen name="Online" component={OnlineOrder} options={{ headerShown: false }} />
          <Stack.Screen name="Table" component={TableOrder} options={{ headerShown: false }} />
          <Stack.Screen name="Track" component={OrderTrack} options={{ headerShown: false }} />
          <Stack.Screen name="Menu" component={Menu} options={{ headerShown: false }} />
          <Stack.Screen name="Stock" component={Stock} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
