## [Refactor Z-Index System & Improve Navigation UX]

### 1. Summary

- Refactors z-index values across components to use a consistent, logical hierarchy
- Improves navigation dropdown behavior with proper overlay management and animations
- Standardizes import statements by removing unnecessary `.jsx` extensions
- Enhances mobile navigation with better touch interactions and visual feedback
- Optimizes topic selection with alphabetical sorting for better UX

---

### 2. Changes Made

#### Z-Index System Refactor

- **HorizontalTopics**: Removed excessive z-index values (100, 10001) for cleaner stacking
- **HorizontalTopicsCard**: Reduced z-index from 10001 to 999 for better performance
- **MobileHeader**:
  - Reduced z-index from 100000000 to 2001 for mobile header
  - Added proper z-index hierarchy (2000-2002) for avatar and dropdown elements
- **NavigationBar**:
  - Adjusted z-index values to logical hierarchy (1000-1002)
  - Improved dropdown positioning and overlay management

#### Navigation UX Improvements

- **Enhanced Dropdown Behavior**:

  - Added portal-based overlay rendering for better DOM management
  - Implemented proper fade-in/fade-out animations with timing controls
  - Added click-outside functionality to close dropdowns
  - Improved mobile touch interactions with proper z-index layering

- **Visual Enhancements**:
  - Updated dropdown background color to use CSS variable `var(--color-accent)`
  - Added smooth transitions and animations for better user feedback
  - Improved overlay opacity and interaction states

#### Code Quality Improvements

- **Import Statement Standardization**:

  - Removed unnecessary `.jsx` extensions from component imports
  - Maintained `.js` extensions for utility files where appropriate
  - Applied consistent import formatting across all pages

- **Topic Selection Enhancement**:
  - Added alphabetical sorting to topic dropdown in PostArticlePage
  - Improved user experience when selecting article topics

#### Mobile Responsiveness

- **Touch Interaction Improvements**:
  - Added proper z-index layering for mobile navigation elements
  - Implemented fadeSlideInFromRight animation for mobile dropdowns
  - Enhanced overlay behavior for better mobile UX

---

### 3. Reason for Changes

- **Performance**: Excessive z-index values (100000000) were causing unnecessary rendering overhead
- **Maintainability**: Consistent z-index hierarchy makes future development easier
- **User Experience**: Better dropdown animations and interactions provide smoother navigation
- **Code Quality**: Standardized imports improve code consistency and reduce confusion
- **Accessibility**: Proper overlay management ensures better screen reader compatibility

---

### 4. Affected Files

#### Navigation Components

- `src/components/NavigationBar/NavigationBar.jsx` - Enhanced dropdown with portal overlay
- `src/components/NavigationBar/NavigationBar.css` - Z-index refactor and animation improvements
- `src/components/MobileHeader/MobileHeader.css` - Mobile z-index optimization and animations

#### Topic Components

- `src/components/HorizontalTopics/HorizontalTopics.css` - Z-index cleanup and padding adjustments
- `src/components/HorizontalTopicsCard/HorizontalTopicsCard.css` - Z-index optimization

#### Page Components

- `src/pages/AllArticlesPage/AllArticlesPage.jsx` - Import standardization
- `src/pages/SingleArticlePage/SingleArticlePage.jsx` - Import standardization
- `src/pages/UserProfilePage/UserProfilePage.jsx` - Import standardization
- `src/pages/PostArticlePage/PostArticlePage.jsx` - Topic sorting and import fixes
- `src/pages/TestPage.jsx` - Fixed broken import statement

#### Styling Files

- `src/styles/components/Header.css` - Font size variable conversion
- `src/styles/components/Toastify.css` - Font size variable conversion
- `src/styles/global.css` - Removed duplicate font-size-base definition
- `src/styles/utils/animations.css` - Comment formatting standardization

---

### 5. Technical Details

#### Z-Index Hierarchy

```css
/* New logical z-index system */
--z-dropdown-overlay: 1000;
--z-dropdown-content: 1001;
--z-avatar-button: 1002;
--z-mobile-overlay: 2000;
--z-mobile-header: 2001;
--z-mobile-avatar: 2002;
--z-topic-cards: 999;
```

#### Portal Implementation

```jsx
// Enhanced dropdown with portal overlay
{
  showOverlay &&
    createPortal(
      <div
        className={`nav-avatar-overlay${dropdownOpen ? " visible" : ""}`}
        onClick={() => setDropdownOpen(false)}
      />,
      document.body
    );
}
```

#### Topic Sorting

```jsx
// Alphabetical topic sorting
{
  topicsData?.topics
    ?.sort((a, b) => a.slug.localeCompare(b.slug))
    ?.map((topic) => (
      <option key={topic.slug} value={topic.slug}>
        {capitaliseFirstLetter(topic.slug)}
      </option>
    ));
}
```

---

### 6. Testing

- ✅ Navigation dropdowns work correctly on desktop and mobile
- ✅ Z-index layering prevents visual conflicts between components
- ✅ Portal overlays render properly and handle click events
- ✅ Topic dropdown shows alphabetically sorted options
- ✅ Import statements resolve correctly without build errors
- ✅ Mobile navigation maintains proper touch interactions
- ✅ Animations and transitions work smoothly across devices

---

### 7. Performance Impact

- **Positive**: Reduced z-index values improve rendering performance
- **Positive**: Portal-based overlays reduce DOM complexity
- **Positive**: Standardized imports improve build consistency
- **Neutral**: Animation additions have minimal performance impact

---

### 8. Future Benefits

- **Easier Maintenance**: Logical z-index hierarchy simplifies future development
- **Better UX**: Smooth animations and interactions enhance user satisfaction
- **Code Quality**: Standardized patterns improve team development experience
- **Scalability**: Portal implementation supports future modal/dropdown features
