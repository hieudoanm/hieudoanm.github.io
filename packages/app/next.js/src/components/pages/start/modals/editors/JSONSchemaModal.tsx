/* eslint-disable @typescript-eslint/no-explicit-any */
import { java as javaLang } from '@codemirror/lang-java';
import { javascript } from '@codemirror/lang-javascript';
import { json as jsonLang } from '@codemirror/lang-json';
import { python as pythonLang } from '@codemirror/lang-python';
import { rust as rustLang } from '@codemirror/lang-rust';
import { xml as xmlLang } from '@codemirror/lang-xml';
import { yaml as yamlLang } from '@codemirror/lang-yaml';
import { EditorState, Extension } from '@codemirror/state';
import { oneDark } from '@codemirror/theme-one-dark';
import { EditorView } from '@codemirror/view';
import { ModalWrapper } from '@hieudoanm/components/atoms/ModalWrapper';
import { json, jsonParse } from '@hieudoanm/utils/json/json';
import jsonSchemaGenerator from 'json-schema-generator';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { parse as parseYaml, stringify as stringifyYaml } from 'yaml';

/* ------------------------------------------------------------------ */
/* Constants                                                            */
/* ------------------------------------------------------------------ */

const INITIAL_JSON = {
  id: 1,
  name: 'John Doe',
  active: true,
  age: 30,
  balance: 1234.56,
  tags: ['dev', 'typescript', 'json'],
  address: { street: '123 Main St', city: 'HCM', zip: '700000' },
  createdAt: '2024-01-01T12:00:00Z',
  nullable: null,
  nested: [
    { id: 1, value: 'A' },
    { id: 2, value: 'B' },
  ],
};

type InputMode = 'json' | 'yaml';
type LanguageExt = 'java' | 'py' | 'rs' | 'ts';
type DataFormatExt = 'json' | 'xml' | 'yaml';
type TabExt = LanguageExt | DataFormatExt;
type PanelTab = 'input' | 'schema' | 'convert';

const LANGUAGE_TABS: LanguageExt[] = ['java', 'py', 'rs', 'ts'];
const DATA_FORMAT_TABS: DataFormatExt[] = ['json', 'xml', 'yaml'];
const TAB_LABELS: Record<TabExt, string> = {
  java: 'Java',
  py: 'Python',
  rs: 'Rust',
  ts: 'TypeScript',
  json: 'JSON',
  xml: 'XML',
  yaml: 'YAML',
};

/* ------------------------------------------------------------------ */
/* CodeMirror hook                                                      */
/* ------------------------------------------------------------------ */

const useCodeMirror = ({
  value,
  onChange,
  editable = true,
  extensions = [],
}: {
  value: string;
  onChange?: (v: string) => void;
  editable?: boolean;
  extensions?: Extension[];
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const viewRef = useRef<EditorView | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    viewRef.current?.destroy();
    const state = EditorState.create({
      doc: value,
      extensions: [
        oneDark,
        EditorView.lineWrapping,
        EditorView.editable.of(editable),
        EditorView.theme({
          '&': { height: '100%' },
          '.cm-editor': { height: '100%' },
          '.cm-scroller': { overflow: 'auto', fontFamily: 'monospace' },
        }),
        ...extensions,
        EditorView.updateListener.of((update) => {
          if (update.docChanged && onChange)
            onChange(update.state.doc.toString());
        }),
      ],
    });
    viewRef.current = new EditorView({ state, parent: ref.current });
    return () => viewRef.current?.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [extensions]);

  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    const current = view.state.doc.toString();
    if (current !== value)
      view.dispatch({
        changes: { from: 0, to: current.length, insert: value },
      });
  }, [value]);

  return { ref, viewRef };
};

/* ------------------------------------------------------------------ */
/* Modal                                                                */
/* ------------------------------------------------------------------ */

export const JSONSchemaModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [inputMode, setInputMode] = useState<InputMode>('json');
  const [jsonText, setJsonText] = useState(
    JSON.stringify(INITIAL_JSON, null, 2)
  );
  const [yamlText, setYamlText] = useState(stringifyYaml(INITIAL_JSON));
  const [data, setData] = useState<any>(INITIAL_JSON);
  const [panelTab, setPanelTab] = useState<PanelTab>('input');
  const [convertTab, setConvertTab] = useState<TabExt>('java');

  /* Parse JSON → sync YAML */
  useEffect(() => {
    if (inputMode !== 'json') return;
    try {
      const parsed = jsonParse(jsonText, {});
      setData(parsed);
      setYamlText(stringifyYaml(parsed));
    } catch {}
  }, [jsonText, inputMode]);

  /* Parse YAML → sync JSON */
  useEffect(() => {
    if (inputMode !== 'yaml') return;
    try {
      const parsed = parseYaml(yamlText);
      setData(parsed);
      setJsonText(JSON.stringify(parsed, null, 2));
    } catch {}
  }, [yamlText, inputMode]);

  /* Derived outputs */
  const others = useMemo(() => {
    const safe = (fmt: TabExt) => {
      try {
        return fmt === 'json'
          ? JSON.stringify(data, null, 2)
          : json(data).convert(fmt);
      } catch {
        return 'Invalid input';
      }
    };
    return Object.fromEntries(
      ([...LANGUAGE_TABS, ...DATA_FORMAT_TABS] as TabExt[]).map((t) => [
        t,
        safe(t),
      ])
    ) as Record<TabExt, string>;
  }, [data]);

  const schema = useMemo(() => {
    try {
      return JSON.stringify(jsonSchemaGenerator(data), null, 2);
    } catch {
      return 'Invalid input';
    }
  }, [data]);

  const getLangExt = (lang: TabExt): Extension[] => {
    switch (lang) {
      case 'java':
        return [javaLang()];
      case 'py':
        return [pythonLang()];
      case 'rs':
        return [rustLang()];
      case 'ts':
        return [javascript({ typescript: true })];
      case 'json':
        return [jsonLang()];
      case 'xml':
        return [xmlLang()];
      case 'yaml':
        return [yamlLang()];
    }
  };

  /* Editors */
  const inputEditor = useCodeMirror({
    value: inputMode === 'json' ? jsonText : yamlText,
    onChange: inputMode === 'json' ? setJsonText : setYamlText,
    extensions: inputMode === 'json' ? [jsonLang()] : [yamlLang()],
  });

  const schemaEditor = useCodeMirror({
    value: schema,
    editable: false,
    extensions: [jsonLang()],
  });

  const convertEditor = useCodeMirror({
    value: others[convertTab],
    editable: false,
    extensions: getLangExt(convertTab),
  });

  /* Keep convert editor in sync */
  useEffect(() => {
    const view = convertEditor.viewRef.current;
    if (!view) return;
    const val = others[convertTab];
    const cur = view.state.doc.toString();
    if (cur !== val)
      view.dispatch({ changes: { from: 0, to: cur.length, insert: val } });
  }, [convertTab, others, convertEditor.viewRef]);

  /* Actions */
  const beautify = () => {
    if (inputMode === 'json') setJsonText(JSON.stringify(data, null, 2));
    else setYamlText(stringifyYaml(data));
  };

  const minify = () => {
    if (inputMode === 'json') setJsonText(JSON.stringify(data));
  };

  const sort = () => {
    if (typeof data !== 'object' || Array.isArray(data)) return;
    const sorted = Object.keys(data)
      .sort()
      .reduce((acc: any, k) => ({ ...acc, [k]: data[k] }), {});
    if (inputMode === 'json') setJsonText(JSON.stringify(sorted, null, 2));
    else setYamlText(stringifyYaml(sorted));
  };

  const copyActive = async () => {
    const text =
      panelTab === 'input'
        ? inputMode === 'json'
          ? jsonText
          : yamlText
        : panelTab === 'schema'
          ? schema
          : others[convertTab];
    await navigator.clipboard.writeText(text);
  };

  return (
    <ModalWrapper
      onClose={onClose}
      title="JSON Schema"
      size="max-w-5xl"
      fullHeight>
      {/* Input mode and actions */}
      <div className="border-base-300 flex flex-wrap items-center justify-between gap-2 border-b px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="tabs tabs-boxed tabs-sm">
            {(['json', 'yaml'] as InputMode[]).map((m) => (
              <a
                key={m}
                role="tab"
                className={`tab ${inputMode === m ? 'tab-active' : ''}`}
                onClick={() => setInputMode(m)}>
                {m.toUpperCase()}
              </a>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="btn btn-xs btn-ghost" onClick={beautify}>
            Beautify
          </button>
          <button
            className="btn btn-xs btn-ghost"
            onClick={minify}
            disabled={inputMode === 'yaml'}>
            Minify
          </button>
          <button className="btn btn-xs btn-ghost" onClick={sort}>
            Sort
          </button>
          <button className="btn btn-xs btn-ghost" onClick={copyActive}>
            📋
          </button>
        </div>
      </div>

      {/* ── Panel tabs ── */}
      <div className="border-base-300 border-b px-4">
        <div role="tablist" className="tabs tabs-bordered tabs-sm">
          {(
            [
              { id: 'input', label: '✏️ Input' },
              { id: 'schema', label: '📐 Schema' },
              { id: 'convert', label: '🔀 Convert' },
            ] as { id: PanelTab; label: string }[]
          ).map((t) => (
            <a
              key={t.id}
              role="tab"
              className={`tab ${panelTab === t.id ? 'tab-active' : ''}`}
              onClick={() => setPanelTab(t.id)}>
              {t.label}
            </a>
          ))}
        </div>
      </div>

      {/* ── Convert sub-tabs (only when convert tab is active) ── */}
      {panelTab === 'convert' && (
        <div className="border-base-300 flex flex-wrap items-center gap-3 border-b px-4 py-2">
          <div className="flex items-center gap-2">
            <span className="text-base-content/40 text-[10px] tracking-widest uppercase">
              Lang
            </span>
            <div className="tabs tabs-boxed tabs-sm">
              {LANGUAGE_TABS.map((t) => (
                <a
                  key={t}
                  role="tab"
                  className={`tab ${convertTab === t ? 'tab-active' : ''}`}
                  onClick={() => setConvertTab(t)}>
                  {TAB_LABELS[t]}
                </a>
              ))}
            </div>
          </div>
          <div className="bg-base-300 h-4 w-px" />
          <div className="flex items-center gap-2">
            <span className="text-base-content/40 text-[10px] tracking-widest uppercase">
              Format
            </span>
            <div className="tabs tabs-boxed tabs-sm">
              {DATA_FORMAT_TABS.map((t) => (
                <a
                  key={t}
                  role="tab"
                  className={`tab ${convertTab === t ? 'tab-active' : ''}`}
                  onClick={() => setConvertTab(t)}>
                  {TAB_LABELS[t]}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Editor body ── */}
      <div className="min-h-0 flex-1 overflow-hidden">
        {panelTab === 'input' && (
          <div ref={inputEditor.ref} className="h-full w-full" />
        )}
        {panelTab === 'schema' && (
          <div ref={schemaEditor.ref} className="h-full w-full" />
        )}
        {panelTab === 'convert' && (
          <div ref={convertEditor.ref} className="h-full w-full" />
        )}
      </div>
    </ModalWrapper>
  );
};
