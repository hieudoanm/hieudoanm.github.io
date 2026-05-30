import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageProvider, useLanguage, Language } from '../LanguageContext';

const mockMap = {
  [Language.English]: {
    common: {
      greeting: 'Hello',
      farewell: 'Goodbye',
    },
    nav: {
      home: 'Home',
    },
  },
  [Language.Spanish]: {
    common: {
      greeting: 'Hola',
      farewell: 'Adiós',
    },
    nav: {
      home: 'Inicio',
    },
  },
};

describe('LanguageContext', () => {
  const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
      getItem: jest.fn((key: string) => store[key] ?? null),
      setItem: jest.fn((key: string, value: string) => {
        store[key] = value;
      }),
      clear: jest.fn(() => {
        store = {};
      }),
      removeItem: jest.fn((key: string) => {
        delete store[key];
      }),
    };
  })();

  beforeAll(() => {
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
  });

  beforeEach(() => {
    localStorageMock.clear();
    jest.clearAllMocks();
  });

  afterAll(() => {
    Object.defineProperty(window, 'localStorage', { value: undefined });
  });

  it('renders children', () => {
    render(
      <LanguageProvider languageMap={{}}>
        <div data-testid="child">Hello</div>
      </LanguageProvider>
    );
    expect(screen.getByTestId('child')).toHaveTextContent('Hello');
  });

  it('throws when useLanguage is used outside provider', () => {
    expect(() => render(<ThrowsOnMount />)).toThrow(
      'useLanguage must be used within a LanguageProvider'
    );
  });

  it('defaults to English', () => {
    render(
      <LanguageProvider languageMap={mockMap}>
        <Consumer />
      </LanguageProvider>
    );
    expect(screen.getByTestId('current-lang')).toHaveTextContent('en');
  });

  it('translates a dot-notation key', () => {
    render(
      <LanguageProvider languageMap={mockMap}>
        <Consumer />
      </LanguageProvider>
    );
    expect(screen.getByTestId('greeting')).toHaveTextContent('Hello');
  });

  it('switches language and updates translations', () => {
    render(
      <LanguageProvider languageMap={mockMap}>
        <Consumer />
      </LanguageProvider>
    );
    fireEvent.click(screen.getByTestId('set-es-btn'));
    expect(screen.getByTestId('current-lang')).toHaveTextContent('es');
    expect(screen.getByTestId('greeting')).toHaveTextContent('Hola');
  });

  it('returns fallback when key is missing', () => {
    render(
      <LanguageProvider
        languageMap={mockMap}
        defaultLanguage={Language.English}>
        <Consumer />
      </LanguageProvider>
    );
    expect(screen.getByTestId('missing-key')).toHaveTextContent(
      'fallback-value'
    );
  });

  it('returns the key itself when no fallback is provided', () => {
    render(
      <LanguageProvider languageMap={mockMap}>
        <Consumer />
      </LanguageProvider>
    );
    expect(screen.getByTestId('no-fallback')).toHaveTextContent('key');
  });

  it('persists language selection to localStorage', () => {
    render(
      <LanguageProvider languageMap={mockMap}>
        <Consumer />
      </LanguageProvider>
    );
    fireEvent.click(screen.getByTestId('set-es-btn'));
    expect(localStorageMock.setItem).toHaveBeenCalledWith('app_language', 'es');
  });

  it('attempts to load persisted language from localStorage', () => {
    render(
      <LanguageProvider languageMap={mockMap}>
        <Consumer />
      </LanguageProvider>
    );
    expect(localStorageMock.getItem).toHaveBeenCalledWith('app_language');
  });

  it('does not persist when persist is false', () => {
    render(
      <LanguageProvider languageMap={mockMap} persist={false}>
        <Consumer />
      </LanguageProvider>
    );
    fireEvent.click(screen.getByTestId('set-es-btn'));
    expect(localStorageMock.setItem).not.toHaveBeenCalled();
  });

  it('returns translation using two-argument call', () => {
    render(
      <LanguageProvider languageMap={mockMap}>
        <TwoArgConsumer />
      </LanguageProvider>
    );
    expect(screen.getByTestId('two-arg')).toHaveTextContent('Goodbye');
  });
});

function ThrowsOnMount() {
  useLanguage();
  return null;
}

function Consumer() {
  const { language, setLanguage, t } = useLanguage();
  return (
    <div>
      <span data-testid="current-lang">{language}</span>
      <span data-testid="greeting">{t('common.greeting')}</span>
      <span data-testid="missing-key">
        {t('common.nonexistent', 'fallback-value')}
      </span>
      <span data-testid="no-fallback">{t('nonexistent.key')}</span>
      <button
        data-testid="set-es-btn"
        onClick={() => setLanguage(Language.Spanish)}>
        ES
      </button>
    </div>
  );
}

function TwoArgConsumer() {
  const { t } = useLanguage();
  return <span data-testid="two-arg">{t('common', 'farewell')}</span>;
}
