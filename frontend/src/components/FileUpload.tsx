import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, Image as ImageIcon, Sparkles, AlertCircle, ArrowRight } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  onSampleClick: () => void;
  isLoading: boolean;
  error: string | null;
}

export default function FileUpload({ onFileSelect, onSampleClick, isLoading, error }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      validateAndSubmit(file);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      validateAndSubmit(file);
    }
  };

  const validateAndSubmit = (file: File) => {
    setSelectedFileName(file.name);
    onFileSelect(file);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !isLoading && fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center transition-all cursor-pointer ${
          isDragging
            ? 'border-teal-500 bg-teal-50/50 scale-[1.01]'
            : 'border-slate-300 hover:border-teal-400 bg-white hover:bg-slate-50/60 shadow-xs'
        } ${isLoading ? 'pointer-events-none opacity-80' : ''}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.png,.jpg,.jpeg,.webp"
          onChange={handleFileInputChange}
          className="hidden"
          disabled={isLoading}
        />

        {isLoading ? (
          <div className="py-6 flex flex-col items-center justify-center space-y-4">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin"></div>
              <Sparkles className="w-6 h-6 text-teal-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
            </div>
            <div>
              <p className="font-semibold text-slate-800 text-lg">
                Analyzing Your Lab Report...
              </p>
              <p className="text-xs text-slate-500 mt-1 max-w-sm">
                Extracting clinical biomarkers, translating medical terminology, and preparing plain-language insights.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="p-4 bg-teal-50 text-teal-600 rounded-2xl ring-8 ring-teal-50/50">
              <UploadCloud className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <p className="text-lg font-semibold text-slate-800">
                {selectedFileName ? selectedFileName : 'Drop your lab report here, or browse'}
              </p>
              <p className="text-xs text-slate-500">
                Supports PDF documents, scans, or clear photos (PNG, JPG, WEBP up to 10MB)
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-400 pt-2">
              <span className="flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-slate-500" /> Digital PDFs
              </span>
              <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
              <span className="flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-slate-500" /> Scanned Photos
              </span>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="flex items-start gap-3 bg-red-50 text-red-700 p-4 rounded-2xl border border-red-200 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-500" />
          <p className="font-medium">{error}</p>
        </div>
      )}

      {/* 1-Click Demo / Sample Button */}
      <div className="bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200/70 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
        <div className="text-center sm:text-left space-y-0.5">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <Sparkles className="w-4 h-4 text-teal-600" />
            <h4 className="text-sm font-semibold text-teal-950">Don't have a report on hand?</h4>
          </div>
          <p className="text-xs text-teal-800/80">
            Explore with a realistic sample report (Complete Blood Count & Lipid Profile).
          </p>
        </div>
        <button
          onClick={onSampleClick}
          disabled={isLoading}
          className="whitespace-nowrap inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-medium text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-all shadow-sm hover:shadow active:scale-95 disabled:opacity-50"
        >
          <span>Try Sample Report</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

