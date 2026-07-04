import type { FC } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { parse, parseAllDocuments, stringify } from 'yaml';
import html2canvas from 'html2canvas-pro';

import { download } from '@hieudoanm.github.io/utils/canvas';

import { TEMPLATES, DEFAULT_CONTENT_MAP } from './data/content';
import { TEMPLATE_MAP } from './components/templates';
import { PreviewPane } from './components/preview/PreviewPane';
import { Toolbar } from './components/toolbar/Toolbar';
import { TemplateSidebar } from './components/sidebar/TemplateSidebar';
import { EditorSidebar } from './components/editor/EditorSidebar';
import { TemplateDocModal } from './components/modal/TemplateDocModal';
import type { PostItem } from './types';

const MAX_POSTS = 20;

const LS_KEY_POSTS = 'instagram-posts';
const LS_KEY_ACTIVE = 'instagram-active';
const LS_KEY_FONT = 'instagram-font-family';
const LS_KEY_INSTAGRAM = 'instagram-username';

const LS_KEY_RAW_OLD = 'instagram-yaml-raw';
const LS_KEY_ID_OLD = 'instagram-active-id';

let _idCounter = 0;
const genId = () => `post-${Date.now()}-${++_idCounter}`;

const loadFromStorage = <T,>(key: string, fallback: () => T): T => {
  try {
    const v = localStorage.getItem(key);
    if (v !== null) {
      return JSON.parse(v) as T;
    }
  } catch {}
  return fallback();
};

const loadRawFromStorage = (key: string): string | null => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

const migrateOldStorage = (): PostItem[] | null => {
  try {
    const raw = localStorage.getItem(LS_KEY_RAW_OLD);
    const id = localStorage.getItem(LS_KEY_ID_OLD);
    if (raw === null || id === null) return null;
    const parsed = parse(raw) as Record<string, unknown>;
    const templateId = JSON.parse(id) as string;
    const content =
      templateId in parsed &&
      typeof parsed[templateId] === 'object' &&
      parsed[templateId] !== null
        ? (parsed[templateId] as Record<string, unknown>)
        : parsed;
    localStorage.removeItem(LS_KEY_RAW_OLD);
    localStorage.removeItem(LS_KEY_ID_OLD);
    return [{ id: genId(), templateId, content }];
  } catch {
    return null;
  }
};

const toYaml = (id: string, content: Record<string, unknown>) =>
  stringify({ [id]: content });

const injectFont = (family: string) => {
  const id = `gf-${family.replace(/\s+/g, '-')}`;
  if (document.getElementById(id)) return;
  const link = document.createElement('link');
  link.id = id;
  link.rel = 'stylesheet';
  link.href = `https://fonts.googleapis.com/css2?family=${family.replace(/\s+/g, '+')}:wght@300;400;600;700;900&display=swap`;
  document.head.appendChild(link);
};

const templateLabel = (id: string) =>
  TEMPLATES.find((t) => t.id === id)?.label ?? id;

const createPost = (templateId: string): PostItem => ({
  id: genId(),
  templateId,
  content: { ...DEFAULT_CONTENT_MAP[templateId] },
});

export const InstagramPage: FC = () => {
  const initialPosts = useMemo(() => {
    const migrated = migrateOldStorage();
    if (migrated) return migrated;
    return loadFromStorage<PostItem[]>(LS_KEY_POSTS, () => [
      createPost(TEMPLATES[0].id),
    ]);
  }, []);

  const initialActive = loadFromStorage(LS_KEY_ACTIVE, () => 0);
  const clampedActive = Math.min(initialActive, initialPosts.length - 1);

  const initialFont = loadFromStorage(LS_KEY_FONT, () => 'Inter');
  const initialInstagram = loadFromStorage(LS_KEY_INSTAGRAM, () => '');

  const [posts, setPosts] = useState<PostItem[]>(initialPosts);
  const [activeIndex, setActiveIndex] = useState<number>(clampedActive);
  const [fontFamily, setFontFamily] = useState<string>(initialFont);
  const [instagramUsername, setInstagramUsername] =
    useState<string>(initialInstagram);
  const [ratio, setRatio] = useState('1:1');
  const [docOpen, setDocOpen] = useState(false);
  const [leftOpen, setLeftOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(true);
  const [previewTemplateId, setPreviewTemplateId] = useState<string | null>(
    null
  );
  const captureRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<{ focus: () => void }>(null);

  const activePost = posts[activeIndex];
  const activeTemplateId = activePost?.templateId ?? TEMPLATES[0].id;
  const activeData = activePost?.content ?? {};

  const effectiveTemplateId = previewTemplateId ?? activeTemplateId;
  const effectiveData = previewTemplateId
    ? DEFAULT_CONTENT_MAP[previewTemplateId]
    : activeData;

  const activeTemplate = useMemo(
    () => TEMPLATES.find((t) => t.id === effectiveTemplateId)!,
    [effectiveTemplateId]
  );

  const [yamlRaw, setYamlRaw] = useState(() =>
    toYaml(activeTemplateId, activeData)
  );
  const [yamlError, setYamlError] = useState<string | null>(null);

  const [fullYamlRaw, setFullYamlRaw] = useState('');
  const [fullYamlError, setFullYamlError] = useState<string | null>(null);

  const allYaml = useMemo(() => {
    if (posts.length === 0) return '';
    return posts
      .map(
        (p, i) =>
          `# Post ${i + 1} (${templateLabel(p.templateId)})\n${toYaml(p.templateId, p.content).trim()}`
      )
      .join('\n\n---\n\n');
  }, [posts]);

  useEffect(() => {
    setFullYamlRaw(allYaml);
  }, [allYaml]);

  useEffect(() => {
    injectFont(fontFamily);
    localStorage.setItem(LS_KEY_FONT, fontFamily);
  }, [fontFamily]);

  useEffect(() => {
    localStorage.setItem(LS_KEY_INSTAGRAM, instagramUsername);
  }, [instagramUsername]);

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem(LS_KEY_POSTS, JSON.stringify(posts));
      localStorage.setItem(LS_KEY_ACTIVE, JSON.stringify(activeIndex));
    }, 300);
    return () => clearTimeout(timer);
  }, [posts, activeIndex]);

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem(`instagram-yaml-${activePost?.id}`, yamlRaw);
    }, 300);
    return () => clearTimeout(timer);
  }, [yamlRaw, activePost?.id]);

  const syncYamlFromPost = useCallback((post: PostItem) => {
    const saved = loadRawFromStorage(`instagram-yaml-${post.id}`);
    setYamlRaw(saved ?? toYaml(post.templateId, post.content));
    setYamlError(null);
  }, []);

  const handleSelectPost = useCallback(
    (index: number) => {
      if (index === activeIndex) return;
      setActiveIndex(index);
      const post = posts[index];
      if (post) syncYamlFromPost(post);
    },
    [activeIndex, posts, syncYamlFromPost]
  );

  const handleAddFromTemplate = useCallback(
    (templateId: string) => {
      if (posts.length >= MAX_POSTS) return;
      const newPost = createPost(templateId);
      setPosts((prev) => [...prev, newPost]);
      const newIndex = posts.length;
      setActiveIndex(newIndex);
      syncYamlFromPost(newPost);
      setLeftOpen(true);
    },
    [posts.length, syncYamlFromPost]
  );

  const updatePostContent = useCallback(
    (index: number, content: Record<string, unknown>) => {
      setPosts((prev) => {
        const next = [...prev];
        next[index] = { ...next[index], content };
        return next;
      });
    },
    []
  );

  const handleYamlChange = useCallback(
    (raw: string) => {
      setYamlRaw(raw);
      try {
        const parsed = parse(raw);
        if (typeof parsed === 'object' && parsed !== null) {
          const dict = parsed as Record<string, unknown>;
          const unwrapped =
            activeTemplateId in dict &&
            typeof dict[activeTemplateId] === 'object' &&
            dict[activeTemplateId] !== null
              ? (dict[activeTemplateId] as Record<string, unknown>)
              : dict;
          updatePostContent(activeIndex, unwrapped);
          setYamlError(null);
        } else {
          setYamlError('Content must be a YAML mapping');
        }
      } catch (e: unknown) {
        setYamlError(e instanceof Error ? e.message : 'Invalid YAML');
      }
    },
    [activeTemplateId, activeIndex, updatePostContent]
  );

  const handleDownload = useCallback(() => {
    download({
      ref: captureRef,
      output: `instagram-${activeTemplateId}`,
      backgroundColor: '#000000',
    });
  }, [activeTemplateId]);

  const handleCopy = useCallback(async () => {
    if (!captureRef.current) return;
    try {
      const canvas = await html2canvas(captureRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#000000',
      });
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve)
      );
      if (!blob) return;
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob }),
      ]);
    } catch {
      // clipboard write not supported
    }
  }, []);

  const handleFullYamlChange = useCallback(
    (raw: string) => {
      setFullYamlRaw(raw);
      try {
        const docs = parseAllDocuments(raw);
        const newPosts: PostItem[] = docs.map((doc) => {
          const json = doc.toJSON() as Record<string, unknown>;
          const entries = Object.entries(json);
          if (entries.length === 0) throw new Error('Empty document');
          const [templateId, content] = entries[0] as [
            string,
            Record<string, unknown>,
          ];
          if (!TEMPLATES.some((t) => t.id === templateId)) {
            throw new Error(`Unknown template: ${templateId}`);
          }
          return {
            id: genId(),
            templateId,
            content: { ...DEFAULT_CONTENT_MAP[templateId], ...content },
          };
        });
        if (newPosts.length === 0) throw new Error('No posts defined');
        if (newPosts.length > MAX_POSTS)
          throw new Error(`Maximum ${MAX_POSTS} posts allowed`);
        setPosts(newPosts);
        setActiveIndex(0);
        syncYamlFromPost(newPosts[0]);
        setFullYamlError(null);
      } catch (e: unknown) {
        setFullYamlError(e instanceof Error ? e.message : 'Invalid YAML');
      }
    },
    [syncYamlFromPost]
  );

  const handleReset = useCallback(() => {
    const c = { ...DEFAULT_CONTENT_MAP[activeTemplateId] };
    updatePostContent(activeIndex, c);
    setYamlRaw(toYaml(activeTemplateId, c));
    setYamlError(null);
  }, [activeTemplateId, activeIndex, updatePostContent]);

  const handleMoveUp = useCallback(
    (index: number) => {
      if (index <= 0) return;
      setPosts((prev) => {
        const next = [...prev];
        [next[index - 1], next[index]] = [next[index], next[index - 1]];
        return next;
      });
      if (activeIndex === index) {
        setActiveIndex(index - 1);
      } else if (activeIndex === index - 1) {
        setActiveIndex(index);
      }
    },
    [activeIndex]
  );

  const handleMoveDown = useCallback(
    (index: number) => {
      setPosts((prev) => {
        if (index >= prev.length - 1) return prev;
        const next = [...prev];
        [next[index], next[index + 1]] = [next[index + 1], next[index]];
        return next;
      });
      if (activeIndex === index) {
        setActiveIndex(index + 1);
      } else if (activeIndex === index + 1) {
        setActiveIndex(index);
      }
    },
    [activeIndex]
  );

  const handleDuplicate = useCallback(
    (index: number) => {
      if (posts.length >= MAX_POSTS) return;
      const original = posts[index];
      const newPost: PostItem = {
        id: genId(),
        templateId: original.templateId,
        content: { ...original.content },
      };
      setPosts((prev) => {
        const next = [...prev];
        next.splice(index + 1, 0, newPost);
        return next;
      });
      setActiveIndex(index + 1);
      syncYamlFromPost(newPost);
    },
    [posts, syncYamlFromPost]
  );

  const handleDelete = useCallback(
    (index: number) => {
      if (posts.length <= 1) return;
      setPosts((prev) => prev.filter((_, i) => i !== index));
      if (index <= activeIndex) {
        const newIndex = Math.max(0, activeIndex - 1);
        setActiveIndex(newIndex);
        const remaining = posts.filter((_, i) => i !== index);
        syncYamlFromPost(remaining[newIndex]);
      }
    },
    [posts.length, activeIndex, posts, syncYamlFromPost]
  );

  const handlePrev = useCallback(() => {
    const next = Math.max(0, activeIndex - 1);
    if (next === activeIndex) return;
    setActiveIndex(next);
    syncYamlFromPost(posts[next]);
  }, [activeIndex, posts, syncYamlFromPost]);

  const handleNext = useCallback(() => {
    const next = Math.min(posts.length - 1, activeIndex + 1);
    if (next === activeIndex) return;
    setActiveIndex(next);
    syncYamlFromPost(posts[next]);
  }, [activeIndex, posts.length, posts, syncYamlFromPost]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;
      if (!mod) return;

      if (e.key === 's' && !e.shiftKey) {
        e.preventDefault();
        handleDownload();
      } else if (e.key === 'd' && !e.shiftKey) {
        e.preventDefault();
        setDocOpen((o) => !o);
      } else if (e.key === 'r' && e.shiftKey) {
        e.preventDefault();
        handleReset();
      } else if (e.key === ',' && !e.shiftKey) {
        e.preventDefault();
        editorRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleDownload, handleReset]);

  const TemplateComponent = TEMPLATE_MAP[effectiveTemplateId];

  return (
    <div className="flex h-screen flex-col">
      <header className="border-base-300 flex items-center justify-between border-b px-6 py-3">
        <div>
          <h1 className="text-base-content text-base font-bold tracking-tight">
            Instagram Infographic Creator
          </h1>
          <p className="text-neutral text-xs">
            Pick a template, edit your content in YAML, and download as a PNG.
          </p>
        </div>
        <button
          onClick={() => setDocOpen(true)}
          className="btn btn-ghost btn-sm rounded-box text-neutral flex-shrink-0 text-xs">
          Template Docs
        </button>
      </header>

      <div className="flex min-h-0 flex-1">
        <TemplateSidebar
          open={leftOpen}
          onToggle={() => setLeftOpen((o) => !o)}
          templates={TEMPLATES}
          posts={posts}
          activeIndex={activeIndex}
          onSelectPost={handleSelectPost}
          onMoveUp={handleMoveUp}
          onMoveDown={handleMoveDown}
          onDuplicate={handleDuplicate}
          onDelete={handleDelete}
          onAddFromTemplate={handleAddFromTemplate}
          templateLabel={templateLabel}
          onPreviewTemplate={setPreviewTemplateId}
          onClearPreview={() => setPreviewTemplateId(null)}
        />

        <div className="flex flex-1 flex-col overflow-y-auto p-6">
          <Toolbar
            ratio={ratio}
            onRatioChange={setRatio}
            fontFamily={fontFamily}
            onFontChange={setFontFamily}
            instagramUsername={instagramUsername}
            onInstagramUsernameChange={setInstagramUsername}
          />

          <div className="flex flex-1 flex-col items-center justify-center">
            <PreviewPane
              captureRef={captureRef}
              onDownload={handleDownload}
              onCopy={handleCopy}
              ratio={ratio}
              fontFamily={fontFamily}
              totalPosts={posts.length}
              activeIndex={activeIndex}
              onPrev={handlePrev}
              onNext={handleNext}
              onSelectPost={handleSelectPost}
              instagramUsername={instagramUsername}>
              {TemplateComponent && <TemplateComponent data={effectiveData} />}
            </PreviewPane>
          </div>
        </div>

        <EditorSidebar
          open={rightOpen}
          onToggle={() => setRightOpen((o) => !o)}
          onReset={handleReset}
          yamlRaw={yamlRaw}
          onYamlChange={handleYamlChange}
          yamlError={yamlError}
          fields={activeTemplate.schema}
          editorRef={editorRef}
          fullYamlRaw={fullYamlRaw}
          onFullYamlChange={handleFullYamlChange}
          fullYamlError={fullYamlError}
        />
      </div>

      <TemplateDocModal open={docOpen} onClose={() => setDocOpen(false)} />
    </div>
  );
};
