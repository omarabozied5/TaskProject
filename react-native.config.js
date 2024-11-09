// react-native.config.js
module.exports = {
  assets: ['./assets/fonts/'], // Link custom fonts
  dependencies: {
    // Custom configurations for specific libraries can go here
    'react-native-vector-icons': {
      platforms: {
        ios: null, // Skip linking on iOS if you’re using autolinking or Cocoapods
      },
    },
  },
};
