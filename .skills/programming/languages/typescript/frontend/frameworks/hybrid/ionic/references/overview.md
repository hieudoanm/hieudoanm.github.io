# Overview

Focused reference for **ionic-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
