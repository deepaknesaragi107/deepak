import { useState } from 'react';
import { 
  UploadCloud, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Plus, 
  RotateCcw, 
  Search, 
  Info,
  Layers,
  Inbox,
  Trash2,
  Server,
  Laptop
} from 'lucide-react';
import { ReportAnalysis } from '../types/report';

interface DashboardProps {
  reports: ReportAnalysis[];
  onOpenUpload: () => void;
  onSelectReport: (report: ReportAnalysis) => void;
  onDeleteReport?: (id: string) => void;
  onClearReports: () => void;
  onRestoreSamples: () => void;
}

export default function Dashboard({
  reports,
  onOpenUpload,
  onSelectReport,
  onDeleteReport,
  onClearReports,
  onRestoreSamples,
}: DashboardProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredReports = reports.filter((report) => {
    const term = searchTerm.toLowerCase();
    return (
      report.report_title.toLowerCase().includes(term) ||
      (report.patient_name && report.patient_name.toLowerCase().includes(term)) ||
      report.summary.toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-8 py-2">
      {/* Top Banner / Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              ReportSaathi Dashboard
            </h1>
            <span className="text-[11px] font-semibold bg-teal-100 text-teal-800 px-2.5 py-0.5 rounded-full">
              Interactive Hub
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            Translate confusing clinical metrics into simple patient-friendly explanations.
          </p>
        </div>

        {/* Clear Action Button */}
        <div className="flex items-center gap-2.5 self-start sm:self-center">
          <button
            onClick={onOpenUpload}
            className="inline-flex items-center gap-2 px-5 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-2xl shadow-sm hover:shadow transition-all active:scale-95 text-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Upload Report</span>
          </button>
        </div>
      </div>

      {/* State Inspection / Developer Helper Bar */}
      <div className="bg-slate-100/70 border border-slate-200 rounded-2xl px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-600">
          <Layers className="w-4 h-4 text-slate-500" />
          <span className="font-semibold text-slate-700">Interface Controls:</span>
          <span>Toggle between populated list and empty state</span>
        </div>

        <div className="flex items-center gap-2">
          {reports.length > 0 ? (
            <button
              onClick={onClearReports}
              className="text-rose-700 hover:text-rose-800 font-medium px-2.5 py-1 bg-white hover:bg-rose-50 border border-rose-200 rounded-lg transition-colors"
            >
              Test Empty State ({reports.length} reports)
            </button>
          ) : (
            <button
              onClick={onRestoreSamples}
              className="text-teal-700 hover:text-teal-800 font-semibold px-2.5 py-1 bg-white hover:bg-teal-50 border border-teal-200 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Restore Sample Reports</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      {reports.length === 0 ? (
        /* Explicit Empty State */
        <div className="bg-white border border-slate-200 rounded-3xl p-10 sm:p-14 text-center space-y-6 shadow-xs max-w-2xl mx-auto">
          <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mx-auto">
            <Inbox className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold text-slate-900">
              No Lab Reports in Dashboard
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
              You currently have no laboratory reports stored in this session. You can upload a new PDF or image, or restore the realistic sample panels to explore.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={onOpenUpload}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl text-xs sm:text-sm transition-all shadow-xs"
            >
              <UploadCloud className="w-4 h-4" />
              <span>Upload New Report</span>
            </button>

            <button
              onClick={onRestoreSamples}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs sm:text-sm transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Load 3 Sample Reports</span>
            </button>
          </div>
        </div>
      ) : (
        /* Populated Dashboard List */
        <div className="space-y-6">
          {/* Search Bar & Count */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by test name, patient, or condition..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:border-teal-500 focus:ring-1 focus:ring-teal-500 shadow-2xs"
              />
            </div>

            <span className="text-xs text-slate-500 font-medium">
              Showing {filteredReports.length} of {reports.length} Reports
            </span>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredReports.map((report, idx) => {
              // Calculate counts
              let totalTests = 0;
              let outOfRange = 0;
              report.categories.forEach((cat) => {
                cat.parameters.forEach((param) => {
                  totalTests++;
                  if (param.status !== 'normal') outOfRange++;
                });
              });

              const isBackendReport = report.extraction_method !== 'client_demo_simulation';

              return (
                <div
                  key={report.id || idx}
                  className="bg-white border border-slate-200/90 rounded-3xl p-6 hover:border-teal-400 hover:shadow-md transition-all flex flex-col justify-between space-y-4 group relative"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full">
                        {report.patient_name || 'Patient'}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-slate-400">{report.report_date}</span>
                        {onDeleteReport && report.id && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteReport(report.id!);
                            }}
                            className="p-1 text-slate-300 hover:text-rose-600 rounded-md hover:bg-rose-50 transition-colors"
                            title="Delete report"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    <h3 className="font-bold text-slate-900 text-base group-hover:text-teal-700 transition-colors leading-snug">
                      {report.report_title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {report.summary}
                    </p>
                  </div>

                  {/* Badges & Action */}
                  <div className="space-y-3 pt-3 border-t border-slate-100">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5">
                        <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium">
                          {totalTests} Tests
                        </span>
                        {outOfRange > 0 ? (
                          <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md font-medium flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3 text-amber-600" />
                            {outOfRange} Out of Range
                          </span>
                        ) : (
                          <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md font-medium flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            Normal
                          </span>
                        )}
                      </div>

                      <span className="text-[10px] text-slate-400 flex items-center gap-1 font-medium">
                        {isBackendReport ? (
                          <>
                            <Server className="w-3 h-3 text-teal-600" />
                            <span>Backend</span>
                          </>
                        ) : (
                          <>
                            <Laptop className="w-3 h-3 text-slate-400" />
                            <span>Demo</span>
                          </>
                        )}
                      </span>
                    </div>

                    <button
                      onClick={() => onSelectReport(report)}
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-50 hover:bg-teal-600 hover:text-white text-slate-800 font-semibold text-xs rounded-xl border border-slate-200 hover:border-teal-600 transition-all group-hover:bg-teal-600 group-hover:text-white active:scale-95"
                    >
                      <span>View Explanation</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Health Literacy / Educational Tip Card */}
      <div className="bg-teal-50/50 border border-teal-200/80 rounded-3xl p-6 sm:p-7 flex flex-col sm:flex-row items-start gap-4">
        <div className="p-3 bg-teal-100 text-teal-800 rounded-2xl flex-shrink-0">
          <Info className="w-5 h-5" />
        </div>
        <div className="space-y-1 text-xs sm:text-sm text-teal-950">
          <h4 className="font-bold text-teal-900">
            Did you know? Reference ranges vary between laboratories
          </h4>
          <p className="text-teal-900/80 leading-relaxed">
            Different medical pathology labs calibrate their machines using different standard cohorts and units. 
            A value slightly above or below one lab's interval does not automatically imply a health problem. 
            Always review results with your doctor, who interprets them in the context of your overall clinical picture.
          </p>
        </div>
      </div>
    </div>
  );
}
