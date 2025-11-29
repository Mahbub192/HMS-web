# Styles Directory

This directory contains organized CSS files for the Hospital Management System.

## File Structure

```
styles/
├── colors.css        # Color variables and theme colors
├── typography.css    # Text styles, headings, sub-headings
├── components.css    # Reusable component styles
└── spacing.css      # Spacing utilities
```

## Usage

All styles are imported in `app/globals.css`. You can use:

### Colors
Use CSS variables defined in `colors.css`:
```css
.my-element {
  background-color: var(--color-primary);
  color: var(--color-text-primary);
}
```

### Typography
Use predefined classes from `typography.css`:
```html
<h1 class="h1">Main Heading</h1>
<h2 class="h2">Sub Heading</h2>
<p class="text-body">Body text</p>
<p class="sub-heading">Sub heading text</p>
```

### Components
Use component classes from `components.css`:
```html
<button class="btn btn-primary">Click Me</button>
<div class="card">
  <div class="card-header">
    <h3 class="card-title">Card Title</h3>
  </div>
</div>
<span class="badge badge-success">Success</span>
```

### Spacing
Use spacing utilities from `spacing.css`:
```html
<div class="p-lg m-md gap-sm">Content</div>
```

## Adding New Styles

1. **Colors**: Add new color variables to `colors.css`
2. **Typography**: Add new text styles to `typography.css`
3. **Components**: Add reusable component styles to `components.css`
4. **Spacing**: Add spacing utilities to `spacing.css`

## CSS Variables

All colors are defined as CSS variables, making it easy to:
- Switch between light/dark themes
- Customize colors globally
- Maintain consistency across the application

## Best Practices

- Use CSS variables for colors instead of hardcoded values
- Follow the existing naming conventions
- Keep styles modular and reusable
- Use Tailwind classes when possible, custom CSS for complex components

