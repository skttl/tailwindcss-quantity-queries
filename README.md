# tailwindcss-quantity-queries

> Variants for using quantity queries with Tailwind CSS

## What on earth is a quantity query?
Quantity Queries are a powerful concept in CSS that enable developers to apply styles based on the number of child elements within a parent element. Unlike traditional media queries, which react to viewport size or other environmental conditions, quantity queries focus on the content structure, allowing for more context-aware styling.

With quantity queries, you can create dynamic layouts that adapt to the number of child elements. For example, you might want to change the background color of a container based on whether it has fewer than three children or more than five. This approach is particularly useful for responsive design, as it allows developers to build more flexible and maintainable UI components that react not just to screen size, but also to the content they contain.

### Related links

- [Quantity Queries for CSS](https://alistapart.com/article/quantity-queries-for-css/) by [Heydon Pickering](https://heydonworks.com/)
- [Quantity Queries Builder](https://quantityqueries.com/) by [Drew Minns](https://drewminns.com/)

## Getting Started

### Installation

Install the plugin from npm:

```sh
npm install -D tailwindcss-quantity-queries
```

Then add the plugin to your `tailwind.config.js` file:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    // ...
  },
  plugins: [
    require('tailwindcss-quantity-queries'),
    // ...
  ],
};
```

### Usage

You can now use the plugin's variants in your HTML classes. The plugin supports the following syntax for selecting elements based on their child count:

- Less Than: `children-[<3]` — Applies styles if the parent has more than 2 children.
- Greater Than: `children-[>5]` — Applies styles if the parent has less than 6 children.
- Exact Count: `children-[3]` — Applies styles if the parent has exactly 3 children.
- Range: `children-[2-5]` — Applies styles if the parent has between 2 and 5 children.

**Example:**

```html
<div class="children-[<3]:bg-red-500 children-[>5]:bg-blue-500 children-[2-5]:bg-green-500">
  <div>Child 1</div>
  <div>Child 2</div>
  <div>Child 3</div>
</div>
```

#### Group Variants
The plugin also supports group variants, allowing you to apply styles based on the count of child elements in a group. Use the following syntax:

- Group Less Than: `group-children-[<3]`
- Group Greater Than: `group-children-[>5]`
- Group Range: `group-children-[2-5]`

**Example:**

```html
<div class="group">
  <div class="group-children-[<3]:bg-red-500">Child 1</div>
  <div class="group-children-[>5]:bg-blue-500">Child 2</div>
  <div class="group-children-[2-5]:bg-green-500">Child 3</div>
</div>
```
