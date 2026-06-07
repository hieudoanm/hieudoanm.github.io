/* eslint-disable @typescript-eslint/no-explicit-any */
import { java as javaLang } from '@codemirror/lang-java';
import { javascript } from '@codemirror/lang-javascript';
import { json as jsonLang } from '@codemirror/lang-json';
import { python as pythonLang } from '@codemirror/lang-python';
import { rust as rustLang } from '@codemirror/lang-rust';
import { xml as xmlLang } from '@codemirror/lang-xml';
import { yaml as yamlLang } from '@codemirror/lang-yaml';
import { Extension } from '@codemirror/state';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { json, parseJson } from '@lodashx/ts';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { parse as parseYaml, stringify as stringifyYaml } from 'yaml';

import {
  INITIAL_JSON,
  LANGUAGE_TABS,
  DATA_FORMAT_TABS,
  TAB_LABELS,
} from './constants';
import { useCodeMirror } from './hooks/useCodeMirror';
import { InputMode, PanelTab, TabExt } from './types';

export const JSONSchemaModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [inputMode, setInputMode] = useState<InputMode>('json');
  const [jsonText, setJsonText] = useState(
    JSON.stringify(INITIAL_JSON, null, 2)
  );
  const [yamlText, setYamlText] = useState(stringifyYaml(INITIAL_JSON));
  const [data, setData] = useState<any>(INITIAL_JSON);
  const [panelTab, setPanelTab] = useState<PanelTab>('input');
  const [convertTab, setConvertTab] = useState<TabExt>('java');

  useEffect(() => {
    if (inputMode !== 'json') return;
    try {
      const parsed = parseJson(jsonText, {});
      setData(parsed);
      setYamlText(stringifyYaml(parsed));
    } catch (e: unknown) {
      console.error('JSON parse error:', e);
    }
  }, [jsonText, inputMode]);

  useEffect(() => {
    if (inputMode !== 'yaml') return;
    try {
      const parsed = parseYaml(yamlText);
      setData(parsed);
      setJsonText(JSON.stringify(parsed, null, 2));
    } catch (e: unknown) {
      console.error('YAML parse error:', e);
    }
  }, [yamlText, inputMode]);

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
      return json(data).convert('schema');
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
      default:
        const _exhaustive: never = lang;
        return [];
    }
  };

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

  useEffect(() => {
    const view = convertEditor.viewRef.current;
    if (!view) return;
    const val = others[convertTab];
    const cur = view.state.doc.toString();
    if (cur !== val)
      view.dispatch({ changes: { from: 0, to: cur.length, insert: val } });
  }, [convertTab, others, convertEditor.viewRef]);

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
      <div className="border-base-300 border-b px-4">
        <div role="tablist" className="tabs tabs-bordered tabs-sm">
          {[
            { id: 'input' as PanelTab, label: '✏️ Input' },
            { id: 'schema' as PanelTab, label: '📐 Schema' },
            { id: 'convert' as PanelTab, label: '🔀 Convert' },
          ].map((t) => (
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
