import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {NavigationContainer, useTheme} from '@react-navigation/native';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Ant from 'react-native-animatable';
const App = () => {
  const Tab = createBottomTabNavigator();
  const theme = useTheme();
  return (
    <NavigationContainer
      theme={{
        colors: {
          ...theme.colors,
          background: 'transparent',
        },
      }}>
      <Tab.Navigator
        tabBar={props => <MyTabBar {...props} />}
        screenOptions={{
          headerShown: false,

          tabBarStyle: {
            position: 'absolute',
            left: 0,
            elevation: 0,
            borderTopWidth: 0,
          },
        }}>
        <Tab.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Trang chủ',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="FaceScreen"
          component={SettingsScreen}
          options={{
            tabBarLabel: 'Đăng ký',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons
                name="face-recognition"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="DataScreen"
          component={SettingsScreen}
          options={{
            tabBarLabel: 'Dữ liệu',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons
                name="database"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="AccountScreen"
          component={SettingsScreen}
          options={{
            tabBarLabel: 'Tài khoản',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons
                name="account"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="SettingsScreen"
          component={SettingsScreen}
          options={{
            tabBarLabel: 'Cài đặt',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons name="cog" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;

function MyTabBar(props: BottomTabBarProps) {
  const {state, descriptors, navigation} = props;
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          marginBottom: 40,
          marginHorizontal: 10,
          borderRadius: 20,
          justifyContent: 'space-between',
          backgroundColor: '#f0f0f0',
        }}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;
          const icon = options.tabBarIcon?.({
            focused: isFocused,
            color: isFocused ? '#673ab7' : '#ccc',
            size: 24,
          });
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({name: route.name, merge: true});
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <Ant.View
              key={index.toString()}
              animation={isFocused ? 'pulse' : ''}
              duration={500}
              style={{
                backgroundColor: isFocused ? 'white' : '#f0f0f0',
                borderRadius: 20,
                borderWidth: 1,
                borderColor: isFocused ? '#f0f0f0' : '#f0f0f0',
                flex: isFocused ? 1 : 0,
                zIndex: isFocused ? 50 : 40,
              }}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: 5,
                  paddingVertical: 10,
                }}
                accessibilityRole="button"
                accessibilityState={isFocused ? {selected: true} : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}>
                <View
                  style={{
                    marginHorizontal: 10,
                  }}>
                  {icon}
                </View>
                {isFocused ? (
                  <Text
                    style={{
                      color: isFocused ? '#673ab7' : '#222',
                      fontSize: 12,
                    }}>
                    {label}
                  </Text>
                ) : (
                  <></>
                )}
              </TouchableOpacity>
            </Ant.View>
          );
        })}
      </View>
    </View>
  );
}

const HomeScreen = () => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      }}>
      <Text>HomeScreen</Text>
    </View>
  );
};

const SettingsScreen = () => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      }}>
      <Text>SettingsScreen</Text>
    </View>
  );
};
