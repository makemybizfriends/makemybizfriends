
# Make Biz Friends - Design Guidelines

This document outlines the design system and guidelines for the Make Biz Friends platform. All new pages and components should follow these guidelines for consistency.

## Brand Identity

- **Brand Name**: Make Biz Friends
- **Primary Color**: Blue (`hsl(231, 98%, 65%)`)
- **Secondary Color**: Purple (`hsl(280, 100%, 70%)`)
- **Accent Color**: Pink (`hsl(330, 81%, 60%)`)

## Usage

Import the design guidelines in your components:

```typescript
import { DESIGN_GUIDELINES, getBrandText } from '@/styles/designGuidelines';
```

## Layout Patterns

### Page Structure
```typescript
<div className={DESIGN_GUIDELINES.layout.pageWrapper}>
  <div className={DESIGN_GUIDELINES.layout.container}>
    <div className={DESIGN_GUIDELINES.layout.pageHeader.wrapper}>
      <h1 className={DESIGN_GUIDELINES.layout.pageHeader.title}>Page Title</h1>
      <p className={DESIGN_GUIDELINES.layout.pageHeader.subtitle}>Page description</p>
    </div>
    {/* Page content */}
  </div>
</div>
```

### Cards
```typescript
<Card className={DESIGN_GUIDELINES.layout.card.primary}>
  <CardHeader className={DESIGN_GUIDELINES.layout.card.header}>
    {/* Header content */}
  </CardHeader>
  <CardContent className={DESIGN_GUIDELINES.layout.card.content}>
    {/* Card content */}
  </CardContent>
</Card>
```

## Component Styles

### Buttons
- Primary: `className="gradient-primary text-white hover:opacity-90"`
- Secondary: `variant="secondary"`
- Ghost: `variant="ghost"`
- Outline: `variant="outline"`

### Forms
- Input: Use `DESIGN_GUIDELINES.components.form.input`
- Label: Use `DESIGN_GUIDELINES.components.form.label`
- Wrapper: Use `DESIGN_GUIDELINES.components.form.wrapper`

### Typography
- Heading 1: `DESIGN_GUIDELINES.components.typography.heading1`
- Heading 2: `DESIGN_GUIDELINES.components.typography.heading2`
- Body: `DESIGN_GUIDELINES.components.typography.body`
- Caption: `DESIGN_GUIDELINES.components.typography.caption`

### Avatars
- Default styling: `DESIGN_GUIDELINES.components.avatar.default`
- Sizes: `DESIGN_GUIDELINES.components.avatar.sizes.md`

## Brand Text

Use `getBrandText()` function for brand-specific text:

```typescript
getBrandText('report-suspicious') // Returns "Report suspicious users to Make Biz Friends"
```

## Animation and Interactions

- Use `DESIGN_GUIDELINES.animation.transition` for smooth transitions
- Apply `DESIGN_GUIDELINES.components.interactive.hover` for hover effects
- Use `DESIGN_GUIDELINES.components.interactive.focus` for focus states

## Spacing

- Section spacing: `DESIGN_GUIDELINES.spacing.section`
- Card spacing: `DESIGN_GUIDELINES.spacing.card`
- Form spacing: `DESIGN_GUIDELINES.spacing.form`

## Modal and Dialog Styles

For consistent modal appearance, use:

```typescript
<DialogContent className={DESIGN_GUIDELINES.modal.content}>
  <DialogHeader className={DESIGN_GUIDELINES.modal.header}>
    <DialogTitle className={DESIGN_GUIDELINES.modal.title}>Title</DialogTitle>
    <DialogDescription className={DESIGN_GUIDELINES.modal.description}>Description</DialogDescription>
  </DialogHeader>
</DialogContent>
```

## Guidelines for New Components

1. Always import and use `DESIGN_GUIDELINES` constants
2. Use the brand color palette consistently
3. Follow the established spacing patterns
4. Apply consistent hover and focus states
5. Use the gradient primary for primary actions
6. Maintain the established card and layout patterns
7. Use `getBrandText()` for any brand-specific text content

## File Structure

- Design guidelines: `/src/styles/designGuidelines.ts`
- Modal components: `/src/components/modals/`
- Reusable components: `/src/components/ui/`
- Page components: `/src/pages/`

This system ensures all new features maintain visual consistency with the existing Make Biz Friends brand and design language.
