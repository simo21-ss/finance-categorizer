---
name: spendly-design-system
description: Maintain design consistency when updating the Spendly frontend UI. Use this skill when the user asks to create, modify, or refactor frontend components, pages, or styles. Ensures all components follow the standardized design system with proper CSS classes, BEM naming conventions, and component patterns.
license: Complete terms in LICENSE.txt
---

# Spendly Design System

This skill ensures consistency across the Spendly frontend by enforcing a standardized component library and design patterns.

## When to Use This Skill

Apply this skill when:
- Creating or modifying React components in the frontend
- Refactoring existing UI components
- Updating styles or adding new CSS classes
- Building new pages or sections
- Implementing forms, tables, modals, cards, or any UI elements

## Core Principles

1. **Always use standardized classes** - Don't create custom styles for common components
2. **Use BEM naming convention** - Block__Element--Modifier (e.g., `card__header`)
3. **Compose classes together** - Combine base classes with modifiers (e.g., `btn btn--primary`)
4. **Use CSS variables** - Reference custom properties instead of hardcoding colors/sizes
5. **Maintain consistency** - All pages and components follow the same patterns
6. **Responsive design** - Styles automatically adapt to mobile (< 768px) viewports

## Page Structure

**Always wrap pages in these elements:**

```jsx
<div className="page">
  <header className="page__header">
    <div className="page__header-icon">
      <IconComponent />
    </div>
    <div className="page__header-text">
      <h1 className="page__title">Page Title</h1>
      <p className="page__subtitle">Description</p>
    </div>
  </header>
  
  <section className="section">
    {/* page content */}
  </section>
</div>
```

## Section Components

**Use sections for content grouping:**

```jsx
<section className="section">
  <div className="section__header">
    <h2 className="section__title">Title</h2>
    <div className="section__actions">
      <button className="btn btn--primary">Action</button>
    </div>
  </div>
  {/* section content */}
</section>
```

## Buttons

All button variations - always use `btn` base class with modifiers:

- `btn btn--primary` - Primary action (green background)
- `btn btn--secondary` - Secondary action (white background)
- `btn btn--ghost` - Ghost button (transparent)
- `btn btn--icon` - Icon-only button (small square)

```jsx
<button className="btn btn--primary">
  <Icon size={16} />
  Button Label
</button>
```

## Cards

Use cards for grouped content with header, content, and footer:

```jsx
<div className="card-grid">
  <div className="card">
    <div className="card__header">
      <div className="card__icon card__icon--primary">
        <IconComponent />
      </div>
      <div className="card__content">
        <h3 className="card__title">Card Title</h3>
        <p className="card__description">Description</p>
      </div>
    </div>
    <div className="card__footer">
      <button className="btn btn--secondary">Action</button>
    </div>
  </div>
</div>
```

Card icon colors:
- `card__icon--primary` - Green gradient
- `card__icon--accent` - Cyan gradient
- `card__icon--secondary` - Purple gradient

## Tables

Always use the standard table wrapper and structure:

```jsx
<div className="table-wrapper">
  <table className="table">
    <thead>
      <tr>
        <th>Column</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Data</td>
        <td className="table__actions">
          <button className="btn btn--icon">Edit</button>
          <button className="btn btn--icon">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

## Forms

Use form component structure for all form inputs:

```jsx
<form className="form">
  <div className="form-group">
    <label htmlFor="name" className="required">Name</label>
    <input type="text" id="name" className="form-control" />
    {error && <div className="form-error">{error}</div>}
  </div>
</form>
```

## Modals & Dialogs

Standard modal structure for all dialogs:

```jsx
{isOpen && (
  <div className="modal-overlay" onClick={handleClose}>
    <div className="modal">
      <div className="modal__header">
        <h2>Modal Title</h2>
        <button className="modal__close">×</button>
      </div>
      <div className="modal__body">
        {/* modal content */}
      </div>
      <div className="modal__footer">
        <button className="btn btn--secondary">Cancel</button>
        <button className="btn btn--primary">Confirm</button>
      </div>
    </div>
  </div>
)}
```

## Status Messages & Alerts

Use alert classes for all status messages:

- `alert alert--success` - Success message (green)
- `alert alert--warning` - Warning message (orange)
- `alert alert--error` - Error message (red)
- `alert alert--info` - Info message (blue)

```jsx
<div className="alert alert--error">
  <AlertCircle size={18} />
  <span>Error message content</span>
</div>
```

## Badges

Use badges for labels and status indicators:

- `badge` - Default (primary green)
- `badge badge--outline` - Outlined badge
- `badge badge--success` - Success badge
- `badge badge--warning` - Warning badge
- `badge badge--error` - Error badge

```jsx
<span className="badge badge--success">Active</span>
<span className="badge badge--error">Failed</span>
```

## Lists

Two list patterns available:

**Simple bullet list:**
```jsx
<ul className="bullet-list">
  <li>Item 1</li>
  <li>Item 2</li>
</ul>
```

**Structured list with labels and values:**
```jsx
<ul className="list">
  <li className="list-item">
    <div className="list-item__content">
      <span className="list-item__label">Label</span>
    </div>
    <span className="list-item__value">Value</span>
  </li>
</ul>
```

## Empty States

Use when there's no data to display:

```jsx
<div className="empty-state">
  <IconComponent className="empty-state__icon" />
  <h3 className="empty-state__title">No data found</h3>
  <p className="empty-state__description">Create your first item to get started</p>
  <a href="#" className="empty-state__action btn btn--primary">Get Started</a>
</div>
```

## Loading States

```jsx
<div className="loading">
  <div className="loading-spinner"></div>
  <p>Loading...</p>
</div>
```

## Utility Classes

### Text Utilities
- `text-muted` - Muted text color
- `text-secondary` - Secondary text color
- `text-center` - Center text align
- `text-right` - Right text align

### Layout Utilities
- `flex-between` - Flex with space-between
- `flex-center` - Flex with center alignment

### Spacing Utilities
- `mt-0`, `mt-1`, `mt-2`, `mt-3`, `mt-4` - Margin top (0/4/8/12/16px)
- `mb-0`, `mb-1`, `mb-2`, `mb-3`, `mb-4` - Margin bottom (0/4/8/12/16px)
- `gap-1`, `gap-2`, `gap-3`, `gap-4` - Gap spacing (4/8/12/16px)

## CSS Custom Properties

All components use these CSS variables from `index.css`:

### Colors
```css
--primary: #059669              /* Primary green */
--primary-light: #10b981        /* Light green */
--primary-dark: #047857         /* Dark green */
--accent: #0891b2               /* Cyan */
--accent-light: #22d3ee         /* Light cyan */
--text: #0f1f1a                 /* Main text */
--text-secondary: #4a635b       /* Secondary text */
--text-muted: #8a9f97           /* Muted text */
```

### Surfaces
```css
--surface-50: #f8faf9           /* Lightest background */
--surface-100: #f1f5f3          /* Light background */
--surface-200: #e2e8e5          /* Medium background */
--surface-card: #ffffff         /* Card background */
```

### Sizing
```css
--radius: 14px                  /* Default border radius */
--radius-sm: 10px               /* Small border radius */
--radius-lg: 20px               /* Large border radius */
```

### Shadows
```css
--shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)
--shadow: 0 4px 16px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.04)
--shadow-lg: 0 12px 40px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.04)
```

## Common Refactoring Patterns

When updating existing code, convert these patterns:

### ❌ Old → ✅ New: Headers
```jsx
// OLD
<header className="pageHeader">
  <div className="pageHeader__icon"><Icon /></div>
  <h1 className="pageTitle">Title</h1>
</header>

// NEW
<header className="page__header">
  <div className="page__header-icon"><Icon /></div>
  <h1 className="page__title">Title</h1>
</header>
```

### ❌ Old → ✅ New: Panels/Sections
```jsx
// OLD
<div className="panel">
  <h2 className="panel__title">Title</h2>
  {/* content */}
</div>

// NEW
<section className="section">
  <div className="section__header">
    <h2 className="section__title">Title</h2>
  </div>
  {/* content */}
</section>
```

### ❌ Old → ✅ New: Grid Layouts
```jsx
// OLD
<div className="grid3">
  {items.map(item => (
    <div className="card">
      <div className="card__icon card__icon--emerald"><Icon /></div>
      <h2 className="card__title">{item.title}</h2>
    </div>
  ))}
</div>

// NEW
<div className="card-grid">
  {items.map(item => (
    <div className="card">
      <div className="card__header">
        <div className="card__icon card__icon--primary"><Icon /></div>
        <h3 className="card__title">{item.title}</h3>
      </div>
    </div>
  ))}
</div>
```

### ❌ Old → ✅ New: Tables
```jsx
// OLD
<div className="transactions-table-wrapper">
  <table className="transactions-table">
    {/* ... */}
  </table>
</div>

// NEW
<div className="table-wrapper">
  <table className="table">
    {/* ... */}
  </table>
</div>
```

### ❌ Old → ✅ New: Modals
```jsx
// OLD
<div className="ruleFormOverlay" onClick={handleClose} />
<div className="ruleFormModal">
  <div className="ruleForm__header"><h2>Title</h2></div>
  <div className="ruleForm">{/* ... */}</div>
  <div className="ruleForm__actions">
    <button className="btn">Cancel</button>
  </div>
</div>

// NEW
<div className="modal-overlay" onClick={handleClose}>
  <div className="modal">
    <div className="modal__header"><h2>Title</h2></div>
    <div className="modal__body">{/* ... */}</div>
    <div className="modal__footer">
      <button className="btn btn--secondary">Cancel</button>
    </div>
  </div>
</div>
```

### ❌ Old → ✅ New: Buttons
```jsx
// OLD
<button className="btn-icon">Icon</button>

// NEW
<button className="btn btn--icon">Icon</button>
```

### ❌ Old → ✅ New: Error Messages
```jsx
// OLD
<div className="error-message">
  <XCircle size={20} />
  <span>Error</span>
</div>

// NEW
<div className="alert alert--error">
  <AlertCircle size={18} />
  <span>Error</span>
</div>
```

### ❌ Old → ✅ New: Badges
```jsx
// OLD
<span className="pill">System</span>

// NEW
<span className="badge">System</span>
<span className="badge badge--success">Active</span>
```

## Responsive Breakpoints

All styles automatically adapt for:
- **Tablet**: max-width 768px
- **Mobile**: max-width 640px

Tables convert to card layout on mobile automatically.

## Quick Checklist

When updating frontend components:
- [ ] Use `.page` container for pages
- [ ] Use `.page__header` with correct nested elements
- [ ] Wrap content in `.section` with headers
- [ ] All buttons use `btn` base class
- [ ] Card grids use `card-grid` wrapper
- [ ] Tables use `table-wrapper` and `table`
- [ ] Modals use `modal-overlay` and `modal` classes
- [ ] Alerts use `alert` with variant (success/warning/error/info)
- [ ] Badges use `badge` with optional variant
- [ ] All CSS uses `--custom-properties` for colors/sizes
- [ ] BEM naming consistently applied
- [ ] No custom class names for standard components
