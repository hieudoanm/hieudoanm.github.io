export interface NoteParentLink {
  href: string;
  label: string;
}

export interface NoteLink {
  href: string;
  label: string;
  description: string;
}

export interface NoteSection {
  title: string;
  body: string;
}

export interface NoteFrontmatter {
  title: string;
  subtitle: string;
  parentLink?: NoteParentLink;
  links?: NoteLink[];
  references?: NoteLink[];
}

export interface Note extends NoteFrontmatter {
  sections: NoteSection[];
}
