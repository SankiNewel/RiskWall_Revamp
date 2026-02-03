# Nuvama Design System Guidelines

## Overview
This design system is based on the Nuvama Client 360 Figma design. It provides a consistent visual language across the RiskWall application.

## Typography

### Font Family
- **Primary Font**: DM Sans (Google Fonts)
- **Weights Available**: 300 (Light), 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)

### Font Sizes & Usage
- **H3 (18px / 120%)**: Page titles, major section headers
- **H4 (16px / 120%)**: Subsection headers, data values
- **H5 (14px / 120%)**: Input labels, small headers
- **Body 2 (14px / 140%)**: Default body text, form inputs
- **Body 3 Light (12px / 140%)**: Supporting text, captions

### Font Weight Guidelines
- **Medium (500)**: Headings, labels, buttons, data values
- **Regular (400)**: Body text, input values
- **Light (300)**: Supporting text, descriptions

## Color Palette

### Primary Colors
- **Primary Blue**: `#6374D4` - Main brand color, links, selected states, CTAs
- **Primary Light**: `#E1E0F8` - Selected backgrounds (radio buttons, active states)
- **Primary Border**: `#D1D1F7` - Radio button borders

### Destructive/Accent
- **Destructive Red**: `#F04E45` - Primary CTA buttons, error states, alerts

### Text Colors
- **Primary**: `#292663` - Headings, important data
- **Secondary**: `#696682` - Labels, secondary information
- **Tertiary**: `#828096` - Placeholder text, disabled states
- **Dark**: `#444444` - Input labels
- **Darkest**: `#03002F` - Input values

### Background Colors
- **White**: `#FFFFFF` - Main background, cards, modals
- **Secondary**: `#F2F2F5` - Modal headers, secondary panels
- **Tertiary**: `#F5F7FF` - Section headers, highlighted areas
- **Muted**: `#E5E5EB` - Tags, subtle backgrounds

### Border Colors
- **Default**: `#CCCCD6` - Input borders, dividers
- **Light**: `#E7E7E7` - Modal header borders
- **Lighter**: `#E3E3E3` - Divider lines
- **Muted**: `#E5E5EB` - Card borders
- **Focus**: `#6374D4` - Active/focused element borders

## Spacing System

Use the spacing scale for consistent layouts:
- **xs**: 2px - Tight gaps between related elements
- **sm**: 4px - Small gaps, label-to-input spacing
- **md**: 8px - Medium gaps between elements
- **lg**: 16px - Large gaps, section spacing
- **xl**: 24px - Extra large gaps between major sections
- **2xl**: 32px - Container padding

## Border Radius

- **sm**: 4px - Small elements
- **md**: 6px - Inputs, buttons, cards (default)
- **lg**: 14px - Modals, large containers
- **xl**: 100px - Pill-shaped buttons

## Component Guidelines

### Buttons

#### Primary Button (Destructive/CTA)
- Background: `#F04E45`
- Text: `#FFFFFF`
- Font: 16px Medium
- Padding: 4px 40px
- Border Radius: 100px (pill)
- Usage: Main action, form submission

#### Secondary Button (Text Only)
- Background: Transparent
- Text: `#6374D4`
- Font: 16px Medium
- Border Radius: 100px
- Usage: Secondary actions, cancel

#### Tertiary Button
- Background: `#F2F2F5` or similar
- Text: `#292663`
- Padding: 10px 12px
- Border: 1px solid `#CCCCD6`
- Border Radius: 6px
- Usage: Less important actions

### Inputs

#### Text Input
- Border: 1px solid `#CCCCD6`
- Border Radius: 6px
- Padding: 12px 16px
- Font: 14px Regular
- Text Color: `#03002F`
- Placeholder Color: `#828096`
- Focus Border: `#6374D4`

#### Label
- Font: 14px Medium
- Color: `#444444`
- Margin Bottom: 4px

### Radio Buttons

#### Default State
- Border: 1px solid `#CCCCD6`
- Background: `#FFFFFF`
- Inner Circle Border: 1.25px solid `#D1D1F7`
- Border Radius: 6px (container)
- Padding: 10px 12px

#### Selected State
- Border: 1px solid `#6374D4`
- Background: `#E1E0F8`
- Inner Circle: Filled with `#6374D4`

### Modals/Popups

#### Container
- Background: `#FFFFFF`
- Border Radius: 14px
- Max Width: 620px (or as needed)

#### Header
- Background: `#F2F2F5`
- Border: 1px solid `#E7E7E7`
- Border Radius: 14px 14px 0 0
- Padding: 16px 32px

#### Content
- Padding: 32px
- Gap: 14px (between sections)

#### Footer
- Background: `#FFFFFF`
- Padding: 16px 32px
- Gap: 16px (between buttons)

### Cards/Info Containers

- Background: `#FFFFFF`
- Border: 1px solid `#E5E5EB`
- Border Radius: 14px

#### Section Header
- Background: `#F5F7FF`
- Padding: 14px 16px
- Font: 16px Medium
- Color: `#292663`

### Dividers
- Border: 1px solid `#E3E3E3`
- Use between major sections

## Best Practices

1. **Consistency**: Always use design tokens from `theme.css` instead of hardcoded values
2. **Accessibility**: Ensure sufficient color contrast (WCAG AA minimum)
3. **Spacing**: Use the spacing scale for consistent layouts
4. **Typography**: Follow the hierarchy - don't skip heading levels
5. **Colors**: Use semantic color names (primary, destructive, etc.) rather than color values
6. **Border Radius**: Stick to the defined radius values for visual consistency
7. **Buttons**: Use appropriate button variants based on action importance
8. **Forms**: Always pair labels with inputs, use proper focus states

## Tailwind CSS Usage

Access design tokens in Tailwind classes:
- Colors: `bg-primary`, `text-primary`, `border-border`
- Spacing: `gap-lg`, `p-xl`, `m-md`
- Radius: `rounded-md`, `rounded-lg`, `rounded-xl`
- Typography: Use default heading tags (h1-h5) for automatic styling

## Examples

### Modal Header
```tsx
<div className="bg-background-secondary border border-border-light rounded-t-lg px-2xl py-lg">
  <h3 className="text-primary">Create Lead</h3>
</div>
```

### Primary CTA Button
```tsx
<button className="bg-destructive text-destructive-foreground px-[40px] py-sm rounded-xl font-medium">
  Submit
</button>
```

### Text Input with Label
```tsx
<div className="flex flex-col gap-sm">
  <label className="text-dark">Client Name</label>
  <input 
    type="text"
    className="border border-border rounded-md px-lg py-[12px] text-text-darkest placeholder:text-text-tertiary focus:border-border-focus"
    placeholder="Enter name"
  />
</div>
```
