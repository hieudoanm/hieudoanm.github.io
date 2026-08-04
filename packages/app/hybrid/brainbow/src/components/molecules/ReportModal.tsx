import type { FC } from 'react';
import { FiX } from 'react-icons/fi';
import { Button } from '@/components/atoms/Button';

export interface ReportModalProps {
  title: string;
  html: string;
  onClose: () => void;
}

export const ReportModal: FC<ReportModalProps> = ({ title, html, onClose }) => (
  <div
    className="bg-base-300/50 fixed inset-0 z-50 flex items-center justify-center p-4"
    role="dialog"
    aria-modal="true"
    aria-label="Analysis report">
    <div className="bg-base-100 flex h-[80vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl shadow-xl">
      <div className="flex items-center justify-between border-b p-3">
        <h2 className="text-base">{title}</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => window.print()}>
            Print
          </Button>
          <Button
            variant="ghost"
            size="sm"
            aria-label="Close report"
            onClick={onClose}>
            <FiX />
          </Button>
        </div>
      </div>
      <div className="overflow-y-auto p-4">
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  </div>
);
