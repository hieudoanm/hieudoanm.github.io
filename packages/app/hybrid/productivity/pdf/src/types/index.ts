export interface PDFPage {
  id: string;
  documentId: string;
  pageNumber: number;
  width: number;
  height: number;
  rotation: number;
  textBlocks: TextBlock[];
  images: ImageBlock[];
  labels: string;
  watermark?: Watermark;
  crop?: { x: number; y: number; width: number; height: number };
}

export interface TextBlock {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  content: string;
  fontSize: number;
  fontFamily: string;
  bold: boolean;
  italic: boolean;
  color: string;
}

export interface ImageBlock {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  label: string;
  opacity: number;
  src?: string;
  rotation?: number;
}

export interface PDFDocument {
  id: string;
  title: string;
  filename: string;
  author: string;
  pageCount: number;
  fileSize: number;
  createdAt: number;
  updatedAt: number;
  lastOpenedAt: number;
  thumbnailColor: string;
  pages: PDFPage[];
}

export type AnnotationType =
  | 'highlight'
  | 'underline'
  | 'strikethrough'
  | 'sticky-note'
  | 'freehand'
  | 'rectangle'
  | 'circle'
  | 'arrow'
  | 'line';

export interface AnnotationComment {
  id: string;
  text: string;
  author: string;
  createdAt: number;
}

export interface Annotation {
  id: string;
  documentId: string;
  pageNumber: number;
  type: AnnotationType;
  color: string;
  x: number;
  y: number;
  width: number;
  height: number;
  content: string;
  points?: { x: number; y: number }[];
  comments?: AnnotationComment[];
  createdAt: number;
  updatedAt: number;
}

export interface Bookmark {
  id: string;
  documentId: string;
  pageNumber: number;
  title: string;
  createdAt: number;
}

export interface FormField {
  id: string;
  documentId: string;
  pageNumber: number;
  type: 'text' | 'checkbox' | 'radio' | 'dropdown' | 'date' | 'signature';
  label: string;
  value: string;
  x: number;
  y: number;
  width: number;
  height: number;
  options?: string[];
}

export interface Stamp {
  id: string;
  documentId: string;
  pageNumber: number;
  preset: string;
  text: string;
  color: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  createdAt: number;
}

export interface Watermark {
  id: string;
  documentId: string;
  type: 'text' | 'image';
  text: string;
  fontSize: number;
  color: string;
  opacity: number;
  rotation: number;
  position: 'center' | 'diagonal' | 'top' | 'bottom';
  pageRange: string;
  image?: string;
  label?: string;
}

export interface MergeJob {
  id: string;
  documentIds: string[];
  pageRanges: string[];
  createdAt: number;
}

export interface CompareJob {
  id: string;
  documentIdA: string;
  documentIdB: string;
  createdAt: number;
}

export interface Settings {
  id: string;
  theme: string;
  defaultZoom: number;
  pageLayout: 'single' | 'continuous';
  annotationDefaults: {
    color: string;
    strokeWidth: number;
  };
}
