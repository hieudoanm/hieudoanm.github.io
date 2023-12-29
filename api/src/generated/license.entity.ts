export class LicenseDto {
  id: string;
  name: string | null;
  spdx: string | null;
  node: string | null;
  html: string | null;
  description: string | null;
  implementation: string | null;
  body: string | null;
  permissions: string[];
  conditions: string[];
  limitations: string[];
  createdAt: Date | null;
  updatedAt: Date | null;
}
