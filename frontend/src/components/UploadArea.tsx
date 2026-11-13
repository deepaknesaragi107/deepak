import React, { useState, useRef, useEffect } from 'react';
import { 
  UploadCloud, 
  FileText, 
  Image as ImageIcon, 
  AlertCircle, 
  X, 
  Sparkles, 
  Bug,
  Server,
  Laptop
} from 'lucide-react';
import { SAMPLE_REPORTS } from '../data/sampleReports';
import { ReportAnalysis, FileValidationError, BackendHealth } from '../types/report';
import { analyzeReportFile, checkBackendHealth } from '../services/api';

interface UploadAreaProps {
  onAnalysisSuccess: (report: ReportAnalysis) => void;
  onCancel?: () => void;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_EXTENSIONS = ['.pdf', '.jpg', '.jpeg', '.png'];
const ALLOWED_MIME_TYPES = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];

export default function UploadArea({ onAnalysisSuccess, onCancel }: UploadAreaProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [validationError, setValidationError] = useState<FileValidationError | null>(null);
  const [simulateError, setSimulateError] = useState(false);
  
  // Backend availability & Mode
  const [backendHealth, setBackendHealth] = useState<BackendHealth | null>(null);
  const [processingMode, setProcessingMode] = useState<'backend' | 'demo'>('demo');

  // Loading & stage simulation
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStage, setCurrentStage] = useState<string>('');
  const [progressPercent, setProgressPercent] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    checkBackendHealth()
      .then((health) => {
        setBackendHealth(health);
        // Default to live backend if healthy
        if (health.status === 'healthy') {
          setProcessingMode('backend');
        }
      })
      .catch(() => {
        setBackendHealth(null);
        setProcessingMode('demo');
      });
  }, []);

  const validateFile = (file: File): boolean => {
    setValidationError(null);

    // 1. Check extension
    const extension = '.' + file.name.split('.').pop()?.toLowerCase();
    const hasValidExt = ALLOWED_EXTENSIONS.includes(extension);
    const hasValidMime = ALLOWED_MIME_TYPES.includes(file.type.toLowerCase()) || hasValidExt;

    if (!hasValidExt && !hasValidMime) {
      setValidationError({
        title: 'Unsupported File Format',
        message: `"${file.name}" is not supported. Please upload a PDF, JPG, or PNG document.`,
      });
      return false;
    }

    // 2. Check size (10MB limit)
    if (file.size > MAX_FILE_SIZE) {
      const sizeInMb = (file.size / (1024 * 1024)).toFixed(1);
      setValidationError({
        title: 'File Exceeds 10MB Limit',
        message: `Selected file is ${sizeInMb}MB. Please upload a file smaller than 10MB.`,
      });
      return false;
    }

    // 3. Check for empty file
    if (file.size === 0) {
      setValidationError({
        title: 'Empty File',
        message: 'The selected file appears to be empty (0 bytes).',
      });
      return false;
    }

    return true;
  };

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    if (validateFile(file)) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  };

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
    handleFiles(e.dataTransfer.files);
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setValidationError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const startAnalysis = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setValidationError(null);
    setProgressPercent(15);
    setCurrentStage('Step 1/4: Validating file structure and image resolution...');

    // Live Backend Mode
    if (processingMode === 'backend' && backendHealth && !simulateError) {
      try {
        setTimeout(() => {
          setProgressPercent(45);
          setCurrentStage('Step 2/4: Sending to FastAPI backend & extracting tabular clinical markers...');
        }, 600);

        setTimeout(() => {
          setProgressPercent(75);
          setCurrentStage('Step 3/4: Gemini AI educational reasoning & medical terminology translation...');
        }, 1400);

        const result = await analyzeReportFile(selectedFile);
        setProgressPercent(100);
        setCurrentStage('Step 4/4: Formatting doctor consultation questions...');

        setTimeout(() => {
          setIsProcessing(false);
          const finalReport: ReportAnalysis = {
            ...result,
            id: `upload-${Date.now()}`,
            report_title: result.report_title || `Analysis of ${selectedFile.name.replace(/\.[^/.]+$/, '')}`,
            patient_name: result.patient_name || 'Patient',
            report_date: result.report_date || new Date().toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            }),
          };
          onAnalysisSuccess(finalReport);
        }, 400);
        return;
      } catch (err: unknown) {
        console.warn('Backend upload failed, offering fallback:', err);
        const errMsg = err instanceof Error ? err.message : 'Backend connection error';
        setIsProcessing(false);
        setValidationError({
          title: 'Backend Analysis Notice',
          message: `${errMsg}. You can switch to Client-Side Demo mode below to analyze instantly.`,
        });
        return;
      }
    }

    // Client-Side Demo Simulation Mode
    setTimeout(() => {
      setProgressPercent(40);
      setCurrentStage('Step 2/4: Simulating OCR & tabular biomarker extraction...');
    }, 700);

    setTimeout(() => {
      setProgressPercent(75);
      setCurrentStage('Step 3/4: Translating medical terminology into clear patient explanations...');
    }, 1500);

    setTimeout(() => {
      if (simulateError) {
        setIsProcessing(false);
        setValidationError({
          title: 'Simulated Extraction Error',
          message: 'The document image was too blurry or the text layout could not be recognized. Please upload a sharper scan or try another sample report.',
        });
        setProgressPercent(0);
        return;
      }

      setProgressPercent(100);
      setCurrentStage('Step 4/4: Structuring doctor consultation checklist...');

      setTimeout(() => {
        setIsProcessing(false);
        const baseSample = SAMPLE_REPORTS[0];
        const customizedReport: ReportAnalysis = {
          ...baseSample,
          id: `demo-${Date.now()}`,
          report_title: `Analysis of ${selectedFile.name.replace(/\.[^/.]+$/, '')}`,
          patient_name: 'Patient (Uploaded File)',
          report_date: new Date().toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          }),
        };
        onAnalysisSuccess(customizedReport);
      }, 500);
    }, 2300);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">
            Upload Medical Lab Report
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Accepts standard digital PDFs, hospital scans, or high-contrast photos (max 10MB).
          </p>
        </div>
        {onCancel && (
          <button
            onClick={onCancel}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Processing Engine Switcher */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-2.5 flex items-center justify-between gap-2 text-xs">
        <span className="font-semibold text-slate-700 pl-1">Processing Engine:</span>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setProcessingMode('backend')}
            disabled={!backendHealth}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-medium transition-all ${
              processingMode === 'backend'
                ? 'bg-teal-600 text-white font-semibold shadow-xs'
                : 'text-slate-600 hover:bg-slate-200/60 disabled:opacity-40 disabled:hover:bg-transparent'
            }`}
          >
            <Server className="w-3.5 h-3.5" />
            <span>FastAPI Backend {backendHealth ? '(Online)' : '(Offline)'}</span>
          </button>

          <button
            type="button"
            onClick={() => setProcessingMode('demo')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-medium transition-all ${
              processingMode === 'demo'
                ? 'bg-teal-600 text-white font-semibold shadow-xs'
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <Laptop className="w-3.5 h-3.5" />
            <span>Client-Side Demo</span>
          </button>
        </div>
      </div>

      {/* Validation Error Alert (Error State) */}
      {validationError && (
        <div className="bg-rose-50 border border-rose-200 text-rose-900 rounded-2xl p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs sm:text-sm">
            <h4 className="font-bold text-rose-800">{validationError.title}</h4>
            <p className="text-rose-700/90 leading-relaxed">{validationError.message}</p>
          </div>
        </div>
      )}

      {/* Drag & Drop Zone */}
      {!isProcessing && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-3xl p-8 sm:p-10 text-center cursor-pointer transition-all ${
            isDragging
              ? 'border-teal-500 bg-teal-50/50 scale-[1.01]'
              : 'border-slate-300 hover:border-teal-400 bg-slate-50/50 hover:bg-slate-50/90'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.png,.jpg,.jpeg"
            onChange={(e) => handleFiles(e.target.files)}
            className="hidden"
          />

          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="p-3.5 bg-teal-50 text-teal-600 rounded-2xl ring-8 ring-teal-50/40">
              <UploadCloud className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <p className="text-sm sm:text-base font-semibold text-slate-800">
                Click to browse, or drag & drop your report here
              </p>
              <p className="text-xs text-slate-500">
                Supports PDF, JPG, and PNG files up to 10MB
              </p>
            </div>

            <div className="flex items-center gap-3 text-[11px] text-slate-400 font-medium pt-2">
              <span className="flex items-center gap-1 bg-white px-2.5 py-1 rounded-md border border-slate-200">
                <FileText className="w-3.5 h-3.5 text-slate-500" /> PDF Document
              </span>
              <span className="flex items-center gap-1 bg-white px-2.5 py-1 rounded-md border border-slate-200">
                <ImageIcon className="w-3.5 h-3.5 text-slate-500" /> JPG / PNG Photo
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Selected File Card */}
      {selectedFile && !isProcessing && (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2.5 bg-teal-100 text-teal-700 rounded-xl flex-shrink-0">
              {selectedFile.type.includes('pdf') ? (
                <FileText className="w-5 h-5" />
              ) : (
                <ImageIcon className="w-5 h-5" />
              )}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-slate-900 truncate">
                {selectedFile.name}
              </p>
              <p className="text-xs text-slate-500">
                {formatFileSize(selectedFile.size)} • {selectedFile.type || 'Document'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={clearSelection}
              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 rounded-lg transition-colors"
              title="Remove selected file"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Loading & Processing State */}
      {isProcessing && (
        <div className="py-8 px-6 bg-slate-50/80 border border-slate-200 rounded-3xl text-center space-y-5">
          <div className="relative mx-auto w-16 h-16">
            <div className="w-16 h-16 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin"></div>
            <Sparkles className="w-6 h-6 text-teal-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            <h4 className="font-bold text-slate-900 text-base">
              {processingMode === 'backend'
                ? 'Processing via FastAPI Backend & AI...'
                : 'Simulating Educational Report Analysis...'}
            </h4>
            <p className="text-xs text-teal-700 font-medium">
              {currentStage}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="w-full max-w-sm mx-auto bg-slate-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-teal-600 h-full transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Action Buttons & Simulation Options */}
      {!isProcessing && (
        <div className="space-y-4 pt-2">
          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Error simulation toggle for testing all states */}
            <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={simulateError}
                onChange={(e) => setSimulateError(e.target.checked)}
                className="w-3.5 h-3.5 rounded text-rose-600 border-slate-300 focus:ring-rose-500 cursor-pointer"
              />
              <span className="flex items-center gap-1">
                <Bug className="w-3.5 h-3.5 text-slate-400" />
                Simulate parsing error (for testing error state)
              </span>
            </label>

            <button
              onClick={startAnalysis}
              disabled={!selectedFile}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-teal-600 hover:bg-teal-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-semibold text-sm rounded-xl transition-all shadow-xs disabled:shadow-none active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>
                {processingMode === 'backend' ? 'Analyze via Backend' : 'Analyze in Demo Mode'}
              </span>
            </button>
          </div>

          {/* Or Pick a Pre-loaded Sample */}
          <div className="pt-4 border-t border-slate-100 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Or Choose a Pre-Verified Sample Panel:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {SAMPLE_REPORTS.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => onAnalysisSuccess(sample)}
                  className="text-left p-3 rounded-xl border border-slate-200/80 hover:border-teal-400 hover:bg-teal-50/30 transition-all text-xs group"
                >
                  <p className="font-bold text-slate-800 group-hover:text-teal-700 truncate">
                    {sample.report_title}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {sample.categories.reduce((acc, c) => acc + c.parameters.length, 0)} tests • Instant load
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
