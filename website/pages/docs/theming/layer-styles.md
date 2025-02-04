---
title: Layer Styles
description: Layer styles provide a way to create consistent and visually appealing elements. By defining a set of properties and effects, you can easily apply them to various design elements, ensuring visual coherence throughout your design system.
---

# Layer Styles

Layer styles provide a way to create consistent and visually appealing elements. By defining a set of properties and effects, you can easily apply them to various design elements, ensuring visual coherence throughout your design system.

- Color or text color
- Background color
- Border width and border color
- Box shadow
- Opacity

Layer styles are defined in the `layerStyles` property of the tokens.

Here's an example of a text style:

```js
const tokens = {
  layerStyles: {
    container: {
      description: 'container styles',
      value: {
        bg: 'gray.50',
        border: '2px solid',
        borderColor: 'gray.500'
      }
    }
  }
}
```

> **Good to know:** The `value` property maps to style objects that will be applied to the element.

## Usage

Now we can use `layerStyle` property in our components.

```jsx
function App() {
  return (
    <div className={css({ layerStyle: 'container' })}>
      <div />
    </div>
  )
}
```
