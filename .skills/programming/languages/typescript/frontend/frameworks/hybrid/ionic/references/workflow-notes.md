# Workflow notes

Focused reference for **ionic-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
