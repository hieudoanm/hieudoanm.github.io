# Ionic Framework Best Practices: Starter Template

A reusable starting point derived from the **5. State Management** section of [Ionic Framework Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

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

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
