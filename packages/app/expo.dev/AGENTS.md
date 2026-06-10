# Expo HAS CHANGED

Read the exact versioned docs at https://docs.expo.dev/versions/v56.0.0/ before writing any code.

# React Native Color Notes

React Native does NOT support modern CSS color functions like `oklch()`, `lab()`, `lch()`, or `color()`. Only hex, rgb/rgba, hsl/hsla, and named CSS colors are supported. Always use hex or rgba values in StyleSheet and component `style` props. Use `culori` to convert oklch theme values from DaisyUI to hex.
