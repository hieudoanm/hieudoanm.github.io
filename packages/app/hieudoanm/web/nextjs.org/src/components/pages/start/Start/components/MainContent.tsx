import { ItemCard } from '@hieudoanm.github.io/components/pages/start/cards/ItemCard';
import { ToolCard } from '@hieudoanm.github.io/components/pages/start/cards/ToolCard';
import {
  agents as agentsBookmarks,
  code as codeBookmarks,
  google as googleBookmarks,
  messaging as messagingBookmarks,
  music as musicBookmarks,
  social as socialBookmarks,
  work as workBookmarks,
} from '@hieudoanm.github.io/data/bookmarks';
import {
  agents,
  clis,
  extensions,
  packages,
} from '@hieudoanm.github.io/data/downloads';
import {
  FC,
  memo,
  useEffect,
  useDeferredValue,
  useMemo,
  useState,
} from 'react';

import { match, matchTool, GRID } from '../constants';
import { makeTools } from '../tools';
import { SearchBar } from './SearchBar';
import { Section } from './Section';

type MainTab = 'bookmarks' | 'downloads' | 'tools';

interface MainContentProps {
  today: string;
  query: string;
  onQueryChange: (v: string) => void;
  toolSections: ReturnType<typeof makeTools>;
}

const TABS: { id: MainTab; label: string; emoji: string }[] = [
  { id: 'bookmarks', label: 'Bookmarks', emoji: '🔖' },
  { id: 'downloads', label: 'Downloads', emoji: '📦' },
  { id: 'tools', label: 'Tools', emoji: '🔧' },
];

const bookmarkSections = [
  { label: 'Agents', items: agentsBookmarks },
  { label: 'Code', items: codeBookmarks },
  { label: 'Google Workspace', items: googleBookmarks },
  { label: 'Messaging', items: messagingBookmarks },
  { label: 'Music', items: musicBookmarks },
  { label: 'Social', items: socialBookmarks },
  { label: 'Work', items: workBookmarks },
] as const;

const downloadSections = [
  { label: 'Agents', items: agents },
  { label: 'CLIs', items: clis },
  { label: 'Extensions', items: extensions },
  { label: 'Packages', items: packages },
] as const;

const filterBy = <T extends { label?: string; id?: string }>(
  items: T[],
  key: keyof T,
  query: string
) => items.filter((item) => match(String(item[key] ?? ''), query));

export const MainContent: FC<MainContentProps> = memo(
  ({ today, query, onQueryChange, toolSections }) => {
    const [tab, setTab] = useState<MainTab>('bookmarks');
    const [viewMode, setViewMode] = useState<'category' | 'alphabetical'>(
      'category'
    );
    const deferredQuery = useDeferredValue(query);
    const filtering = deferredQuery.trim().length > 0;
    const {
      ai,
      clocks,
      colors,
      converter,
      'data-csv': dataCsv,
      'data-excel': dataExcel,
      'data-json': dataJson,
      'data-xml': dataXml,
      developer,
      editors,
      education,
      eyes,
      financial,
      'games-arcade': gamesArcade,
      'games-casino': gamesCasino,
      'games-chess': gamesChess,
      'games-memory': gamesMemory,
      'games-puzzle': gamesPuzzle,
      'games-trivia': gamesTrivia,
      'games-word': gamesWord,
      'image-convert-gif': imageConvertGIF,
      'image-convert-heic': imageConvertHEIC,
      'image-convert-jpg': imageConvertJPG,
      'image-convert-png': imageConvertPNG,
      'image-convert-psd': imageConvertPSD,
      'image-convert-svg': imageConvertSVG,
      'image-convert-tiff': imageConvertTIFF,
      'image-convert-webp': imageConvertWebP,
      'image-create': imageCreate,
      'image-edit': imageEdit,
      'image-effect': imageEffect,
      'image-scan': imageScan,
      'pdf-convert': pdfConvert,
      'pdf-create': pdfCreate,
      'pdf-ebook': pdfEbook,
      'pdf-edit': pdfEdit,
      'pdf-extract': pdfExtract,
      'pdf-misc': pdfMisc,
      'text-convert': textConvert,
      utilities,
      'video-audio': videoAudio,
      'video-convert-aac': videoConvertAAC,
      'video-convert-avi': videoConvertAVI,
      'video-convert-flv': videoConvertFLV,
      'video-convert-gif': videoConvertGIF,
      'video-convert-m4a': videoConvertM4A,
      'video-convert-mkv': videoConvertMKV,
      'video-convert-mov': videoConvertMOV,
      'video-convert-mp4': videoConvertMP4,
      'video-convert-ogg': videoConvertOGG,
      'video-convert-webm': videoConvertWebM,
      'video-convert-wmv': videoConvertWMV,
      'video-download': videoDownload,
      'video-edit': videoEdit,
      visualization,
      'write-article': writeArticle,
      'write-business': writeBusiness,
      'write-content': writeContent,
      'write-edit': writeEdit,
      'write-misc': writeMisc,
      'write-real-estate': writeRealEstate,
      'write-social': writeSocial,
    } = toolSections;

    const toolSectionDefs = useMemo(
      () => [
        { label: 'AAC Convert', items: videoConvertAAC },
        { label: 'AI', items: ai },
        { label: 'AVI Convert', items: videoConvertAVI },
        { label: 'Clocks', items: clocks },
        { label: 'Colors', items: colors },
        { label: 'Converter', items: converter },
        { label: 'Data CSV', items: dataCsv },
        { label: 'Data Excel', items: dataExcel },
        { label: 'Data JSON', items: dataJson },
        { label: 'Data XML', items: dataXml },
        { label: 'Developer', items: developer },
        { label: 'Editors', items: editors },
        { label: 'Education', items: education },
        { label: 'Eyes', items: eyes },
        { label: 'Financial', items: financial },
        { label: 'FLV Convert', items: videoConvertFLV },
        { label: 'Games Arcade', items: gamesArcade },
        { label: 'Games Casino', items: gamesCasino },
        { label: 'Games Chess', items: gamesChess },
        { label: 'Games Memory', items: gamesMemory },
        { label: 'Games Puzzle', items: gamesPuzzle },
        { label: 'Games Trivia', items: gamesTrivia },
        { label: 'Games Word', items: gamesWord },
        { label: 'GIF Convert', items: videoConvertGIF },
        { label: 'HEIC Convert', items: imageConvertHEIC },
        { label: 'Image Create', items: imageCreate },
        { label: 'Image Edit', items: imageEdit },
        { label: 'Image Effect', items: imageEffect },
        { label: 'Image GIF Convert', items: imageConvertGIF },
        { label: 'Image Scan', items: imageScan },
        { label: 'JPG Convert', items: imageConvertJPG },
        { label: 'M4A Convert', items: videoConvertM4A },
        { label: 'MKV Convert', items: videoConvertMKV },
        { label: 'MOV Convert', items: videoConvertMOV },
        { label: 'MP4 Convert', items: videoConvertMP4 },
        { label: 'OGG Convert', items: videoConvertOGG },
        { label: 'PDF Convert', items: pdfConvert },
        { label: 'PDF Create', items: pdfCreate },
        { label: 'PDF Ebook', items: pdfEbook },
        { label: 'PDF Edit', items: pdfEdit },
        { label: 'PDF Extract', items: pdfExtract },
        { label: 'PDF Misc', items: pdfMisc },
        { label: 'PNG Convert', items: imageConvertPNG },
        { label: 'PSD Convert', items: imageConvertPSD },
        { label: 'SVG Convert', items: imageConvertSVG },
        { label: 'Text Convert', items: textConvert },
        { label: 'TIFF Convert', items: imageConvertTIFF },
        { label: 'Utilities', items: utilities },
        { label: 'Video Audio', items: videoAudio },
        { label: 'Video Download', items: videoDownload },
        { label: 'Video Edit', items: videoEdit },
        { label: 'Visualization', items: visualization },
        { label: 'WebM Convert', items: videoConvertWebM },
        { label: 'WebP Convert', items: imageConvertWebP },
        { label: 'WMV Convert', items: videoConvertWMV },
        { label: 'Write Article', items: writeArticle },
        { label: 'Write Business', items: writeBusiness },
        { label: 'Write Content', items: writeContent },
        { label: 'Write Edit', items: writeEdit },
        { label: 'Write Misc', items: writeMisc },
        { label: 'Write Real Estate', items: writeRealEstate },
        { label: 'Write Social', items: writeSocial },
      ],
      [
        ai,
        clocks,
        colors,
        converter,
        dataCsv,
        dataExcel,
        dataJson,
        dataXml,
        developer,
        editors,
        education,
        eyes,
        financial,
        gamesArcade,
        gamesCasino,
        gamesChess,
        gamesMemory,
        gamesPuzzle,
        gamesTrivia,
        gamesWord,
        imageConvertGIF,
        imageConvertHEIC,
        imageConvertJPG,
        imageConvertPNG,
        imageConvertPSD,
        imageConvertSVG,
        imageConvertTIFF,
        imageConvertWebP,
        imageCreate,
        imageEdit,
        imageEffect,
        imageScan,
        pdfConvert,
        pdfCreate,
        pdfEbook,
        pdfEdit,
        pdfExtract,
        pdfMisc,
        textConvert,
        utilities,
        videoAudio,
        videoConvertAAC,
        videoConvertAVI,
        videoConvertFLV,
        videoConvertGIF,
        videoConvertM4A,
        videoConvertMKV,
        videoConvertMOV,
        videoConvertMP4,
        videoConvertOGG,
        videoConvertWebM,
        videoConvertWMV,
        videoDownload,
        videoEdit,
        visualization,
        writeArticle,
        writeBusiness,
        writeContent,
        writeEdit,
        writeMisc,
        writeRealEstate,
        writeSocial,
      ]
    );

    const allToolsFlat = useMemo(
      () =>
        toolSectionDefs
          .flatMap((s) => s.items)
          .sort((a, b) => a.label.localeCompare(b.label)),
      [toolSectionDefs]
    );
    const filteredAllTools = useMemo(
      () =>
        filtering
          ? allToolsFlat.filter((t) => matchTool(t, deferredQuery))
          : allToolsFlat,
      [allToolsFlat, filtering, deferredQuery]
    );

    const allBookmarksFlat = useMemo(
      () =>
        bookmarkSections
          .flatMap((s) => s.items)
          .sort((a, b) => a.label.localeCompare(b.label)),
      []
    );
    const filteredAllBookmarks = useMemo(
      () =>
        filtering
          ? allBookmarksFlat.filter((bm) => match(bm.label, deferredQuery))
          : allBookmarksFlat,
      [allBookmarksFlat, filtering, deferredQuery]
    );

    const allDownloadsFlat = useMemo(
      () =>
        downloadSections
          .flatMap((s) => s.items)
          .sort((a, b) => a.id.localeCompare(b.id)),
      []
    );
    const filteredAllDownloads = useMemo(
      () =>
        filtering
          ? allDownloadsFlat.filter((d) => match(d.id, deferredQuery))
          : allDownloadsFlat,
      [allDownloadsFlat, filtering, deferredQuery]
    );

    const filteredBookmarks = useMemo(
      () =>
        bookmarkSections.map((s) => ({
          ...s,
          filtered: filtering
            ? filterBy(s.items, 'label', deferredQuery)
            : s.items,
        })),
      [filtering, deferredQuery]
    );
    const filteredTools = useMemo(
      () =>
        toolSectionDefs.map((s) => ({
          ...s,
          filtered: filtering
            ? s.items.filter((t) => matchTool(t, deferredQuery))
            : s.items,
        })),
      [toolSectionDefs, filtering, deferredQuery]
    );
    const filteredDownloads = useMemo(
      () =>
        downloadSections.map((s) => ({
          ...s,
          filtered: filtering
            ? filterBy(s.items, 'id', deferredQuery)
            : s.items,
        })),
      [filtering, deferredQuery]
    );

    useEffect(() => {
      if (!filtering) return;
      const hasTools = filteredTools.some((s) => s.filtered.length > 0);
      const hasBookmarks = filteredBookmarks.some((s) => s.filtered.length > 0);
      const hasDownloads = filteredDownloads.some((s) => s.filtered.length > 0);
      if (tab === 'tools' && !hasTools && hasBookmarks) setTab('bookmarks');
      else if (tab === 'bookmarks' && !hasBookmarks && hasTools)
        setTab('tools');
      else if (tab === 'downloads' && !hasDownloads && hasTools)
        setTab('tools');
    }, [query]); // eslint-disable-line react-hooks/exhaustive-deps

    const hasAnyResult =
      filteredBookmarks.some((s) => s.filtered.length > 0) ||
      filteredTools.some((s) => s.filtered.length > 0) ||
      filteredDownloads.some((s) => s.filtered.length > 0);

    return (
      <main className="flex flex-col items-center overflow-y-auto px-8 py-12">
        <p className="text-base-content/30 mb-2 font-mono text-xs tracking-widest uppercase">
          {today}
        </p>
        <h1 className="mb-6 text-3xl font-thin tracking-tight">Start Page</h1>
        <div className="mb-6 w-full max-w-3xl">
          <SearchBar query={query} onChange={onQueryChange} />
        </div>
        <div className="mb-8 w-full max-w-3xl">
          <div className="border-base-300 flex border-b">
            {TABS.map(({ id, label, emoji }) => {
              const count =
                id === 'bookmarks'
                  ? allBookmarksFlat.length
                  : id === 'downloads'
                    ? allDownloadsFlat.length
                    : allToolsFlat.length;
              return (
                <button
                  key={id}
                  className={`flex flex-1 items-center justify-center gap-1.5 py-3 text-[10px] tracking-widest uppercase transition-all duration-200 ${
                    tab === id
                      ? 'border-primary text-primary border-b-2'
                      : 'text-base-content/40 hover:text-base-content/70'
                  }`}
                  onClick={() => setTab(id)}>
                  <span>{emoji}</span>
                  <span>{label}</span>
                  <span className="badge badge-xs">{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mb-4 flex w-full max-w-3xl justify-center gap-4">
          <button
            className={`text-[10px] tracking-widest uppercase transition-all duration-200 ${
              viewMode === 'category'
                ? 'text-primary'
                : 'text-base-content/40 hover:text-base-content/70'
            }`}
            onClick={() => setViewMode('category')}>
            Categories
          </button>
          <button
            className={`text-[10px] tracking-widest uppercase transition-all duration-200 ${
              viewMode === 'alphabetical'
                ? 'text-primary'
                : 'text-base-content/40 hover:text-base-content/70'
            }`}
            onClick={() => setViewMode('alphabetical')}>
            A–Z
          </button>
        </div>

        {tab === 'tools' && (
          <>
            {viewMode === 'alphabetical' ? (
              <>
                <div className={GRID}>
                  {filteredAllTools.map((t) => (
                    <ToolCard key={t.label} {...t} />
                  ))}
                </div>
                {filtering && filteredAllTools.length === 0 && (
                  <p className="text-base-content/30 mt-20 text-sm">
                    No tools match &quot;{query}&quot;.
                  </p>
                )}
              </>
            ) : (
              <>
                {filteredTools.map(({ label, filtered }) =>
                  !filtering || filtered.length > 0 ? (
                    <Section key={label} label={label} count={filtered.length}>
                      <div className={GRID}>
                        {filtered.map((t) => (
                          <ToolCard key={t.label} {...t} />
                        ))}
                      </div>
                    </Section>
                  ) : null
                )}
                {filtering &&
                  !filteredTools.some((s) => s.filtered.length > 0) && (
                    <p className="text-base-content/30 mt-20 text-sm">
                      No tools match &quot;{query}&quot;.
                    </p>
                  )}
              </>
            )}
          </>
        )}

        {tab === 'bookmarks' && (
          <>
            {viewMode === 'alphabetical' ? (
              <>
                <div className={GRID}>
                  {filteredAllBookmarks.map((bm) => (
                    <ItemCard key={bm.label} {...bm} />
                  ))}
                </div>
                {filtering && filteredAllBookmarks.length === 0 && (
                  <p className="text-base-content/30 mt-20 text-sm">
                    No bookmarks match &quot;{query}&quot;.
                  </p>
                )}
              </>
            ) : (
              <>
                {filteredBookmarks.map(({ label, filtered }) =>
                  !filtering || filtered.length > 0 ? (
                    <Section key={label} label={label} count={filtered.length}>
                      <div className={GRID}>
                        {filtered.map((bm) => (
                          <ItemCard key={bm.label} {...bm} />
                        ))}
                      </div>
                    </Section>
                  ) : null
                )}
                {filtering &&
                  !filteredBookmarks.some((s) => s.filtered.length > 0) && (
                    <p className="text-base-content/30 mt-20 text-sm">
                      No bookmarks match &quot;{query}&quot;.
                    </p>
                  )}
              </>
            )}
          </>
        )}

        {tab === 'downloads' && (
          <>
            {viewMode === 'alphabetical' ? (
              <>
                <div className={GRID}>
                  {filteredAllDownloads.map((a) => (
                    <ItemCard
                      key={a.id}
                      href={a.url}
                      {...a}
                      actions={a.downloads}
                    />
                  ))}
                </div>
                {filtering && filteredAllDownloads.length === 0 && (
                  <p className="text-base-content/30 mt-20 text-sm">
                    No downloads match &quot;{query}&quot;.
                  </p>
                )}
              </>
            ) : (
              <>
                {filteredDownloads.map(({ label, filtered }) =>
                  !filtering || filtered.length > 0 ? (
                    <Section key={label} label={label} count={filtered.length}>
                      <div className={GRID}>
                        {filtered.map((a) => (
                          <ItemCard
                            key={a.id}
                            href={a.url}
                            {...a}
                            actions={a.downloads}
                          />
                        ))}
                      </div>
                    </Section>
                  ) : null
                )}
                {filtering &&
                  !filteredDownloads.some((s) => s.filtered.length > 0) && (
                    <p className="text-base-content/30 mt-20 text-sm">
                      No downloads match &quot;{query}&quot;.
                    </p>
                  )}
              </>
            )}
          </>
        )}

        {filtering && !hasAnyResult && (
          <p className="text-base-content/30 mt-20 text-sm">
            No results for &quot;{query}&quot; &mdash; press 🔍 to search
            Google.
          </p>
        )}
      </main>
    );
  }
);

MainContent.displayName = 'MainContent';
