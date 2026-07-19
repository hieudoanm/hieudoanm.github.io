---
name: ionic-best-practices
description: Best practices for building cross-platform mobile applications with Ionic Framework. Use when creating, structuring, or reviewing Ionic applications — covers components, navigation, state management, platform integration, and performance.
---

# Ionic Framework Best Practices

Ionic Framework is a cross-platform mobile development framework based on web technologies. Best practice is to leverage Ionic's component library, follow platform conventions, optimize performance, and use proper state management patterns.

---

## 1. Core Stack

- Ionic **latest stable**
- Angular/React/Vue (choose one)
- Capacitor for native functionality
- TypeScript **strict mode**
- Ionic CLI for tooling

```bash
ionic start my-app tabs --type=react
# or
ionic start my-app tabs --type=angular
# or
ionic start my-app tabs --type=vue
```

---

## 2. Project Structure

```text
src/
├── components/           # Custom components
│   └── CustomComponent.tsx
├── pages/                # Page components
│   ├── Home.tsx
│   └── Profile.tsx
├── services/             # Services
│   └── api.ts
├── store/                # State management
│   └── index.ts
├── theme/                # Theming
│   └── variables.scss
└── assets/               # Images, fonts
```

- **Page-based organization** — organize by pages/routes
- **Reusable components** — separate custom components
- **Services for logic** — keep business logic in services
- **Theming** — use Ionic's theming system

---

## 3. Ionic Components

- **Use Ionic components** — leverage Ionic's pre-built components:

```typescript
<IonPage>
  <IonHeader>
    <IonToolbar>
      <IonTitle>Home</IonTitle>
    </IonToolbar>
  </IonHeader>
  <IonContent fullscreen>
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Card Title</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        Card content
      </IonCardContent>
    </IonCard>
  </IonContent>
</IonPage>
```

- **Platform-specific styling** — use platform-specific styles:

```typescript
<IonButton mode="ios">iOS Button</IonButton>
<IonButton mode="md">Material Button</IonButton>
```

- **Custom components** — create custom Ionic components:

```typescript
const CustomCard: React.FC = () => {
  return (
    <IonCard className="custom-card">
      {/* Content */}
    </IonCard>
  )
}
```

---

## 4. Navigation

- **Ionic Router** — use Ionic's router for navigation:

```typescript
import { IonRouterOutlet, IonTabs, IonTabBar, IonTabButton } from '@ionic/react'

<IonTabs>
  <IonRouterOutlet>
    <Route path="/tab1" component={Tab1} exact />
    <Route path="/tab2" component={Tab2} exact />
  </IonRouterOutlet>
  <IonTabBar slot="bottom">
    <IonTabButton tab="tab1" href="/tab1">
      <IonIcon icon={home} />
    </IonTabButton>
  </IonTabBar>
</IonTabs>
```

- **Programmatic navigation** — use history for navigation:

```typescript
import { useHistory } from 'react-router-dom'

const history = useHistory()
history.push('/profile')
```

- **Deep linking** — configure deep linking for your app

---

## 5. State Management

- **Context API** — use Context for simple state:

```typescript
const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}
```

- **Redux** — use Redux for complex state:

```typescript
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    user: userReducer
  }
})
```

- **Zustand** — use Zustand for lightweight state management

---

## 6. Platform Integration

- **Capacitor plugins** — use Capacitor for native functionality:

```typescript
import { Camera, CameraResultType } from '@capacitor/camera'

const takePicture = async () => {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: false,
    resultType: CameraResultType.Uri
  })
  return image.webPath
}
```

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

- **Ionic Storage** — use Ionic Storage for local data:

```typescript
import { Storage } from '@ionic/storage'

const storage = new Storage()
await storage.create()

await storage.set('name', 'John')
const name = await storage.get('name')
```

- **Secure storage** — use secure storage for sensitive data:

```typescript
import { SecureStorage } from '@ionic-native/secure-storage'

const secureStorage = new SecureStorage()
await secureStorage.set('token', 'my-token')
```

---

## 10. Testing

- **Ionic Testing** — test Ionic components:

```typescript
import { render, screen } from '@testing-library/react'
import App from './App'

test('renders home page', () => {
  render(<App />)
  expect(screen.getByText('Home')).toBeInTheDocument()
})
```

- **E2E testing** — use Detox or Appium for E2E testing
- **Unit testing** — test services and business logic

---

## 11. General Rules of Thumb

- **Ionic components** — use Ionic's pre-built components
- **Platform conventions** — follow iOS and Material Design guidelines
- **Capacitor for native** — use Capacitor for native functionality
- **State management** — choose appropriate state management solution
- **Performance** — optimize for mobile performance
- **Theming** — use Ionic's theming system

---

## Quick-Start Checklist

- [ ] Ionic CLI with TypeScript
- [ ] Ionic components used consistently
- [ ] Ionic Router for navigation
- [ ] Capacitor for native functionality
- [ ] State management solution chosen
- [ ] Platform-specific handling
- [ ] Performance optimization techniques
- [ ] Ionic theming configured
- [ ] Storage solution implemented
- [ ] Testing setup configured
