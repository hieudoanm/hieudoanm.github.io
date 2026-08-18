import { downloadText } from '@/lib/io/dom';
import { nativePickProject, nativeSaveProject } from '@/lib/native';
import type { Project } from '@/types/project';
import {
  PROJECT_EXTENSION,
  deserializeProject,
  serializeProject,
} from './bundle';

export const saveProject = async (project: Project): Promise<boolean> => {
  const content = serializeProject(project);
  const filename = `${project.name}.${PROJECT_EXTENSION}`;
  const saved = await nativeSaveProject(project.name, content);
  if (saved) return true;
  downloadText(filename, content);
  return true;
};

export const openProjectFromFile = async (file: File): Promise<Project> =>
  deserializeProject(await file.text());

export const pickProject = async (): Promise<Project | null> => {
  const native = await nativePickProject();
  if (native) return deserializeProject(native.content);
  return null;
};

export const projectFilename = (project: Project): string =>
  `${project.name}.${PROJECT_EXTENSION}`;
