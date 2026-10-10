# Implementation notes

Focused reference for **ionic-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Platform detection** — detect platform for platform-specific behavior:

```typescript
import { Platform } from '@ionic/react'

if (Platform.isIOS) {
  // iOS-specific code
}
```

- **Native plugins** — use Capacitor plugins for native features

---

## 7. Performance

- **Virtual scrolling** — use virtual scroll for long lists:

```typescript
<IonVirtualScroll items={items}>
  {(item) => (
    <IonItem>
      <IonLabel>{item.name}</IonLabel>
    </IonItem>
  )}
</IonVirtualScroll>
```

- **Lazy loading** — lazy load routes:

```typescript
const LazyPage = React.lazy(() => import('./LazyPage'))

<IonReactRouter>
  <Suspense fallback={<IonSpinner />}>
    <Route path="/lazy" component={LazyPage} />
  </Suspense>
</IonReactRouter>
```

- **Optimize images** — optimize images for mobile

---

## 8. Styling

- **Ionic theming** — use Ionic's theming system:

```scss
// theme/variables.scss
:root {
  --ion-color-primary: #3880ff;
  --ion-color-primary-rgb: 56, 128, 255;
  --ion-color-primary-contrast: #ffffff;
}
```

- **CSS variables** — use CSS variables for dynamic styling
- **Platform-specific styles** — use platform-specific styles:

```scss
.ios .my-component {
  /* iOS-specific styles */
}

.md .my-component {
  /* Material Design styles */
}
```

---

## 9. Storage
