import { useState, useEffect } from 'react';
import NuvicaNavbar from './components/NuvicaNavbar';
import NuvicaHero from './components/NuvicaHero';
import NuvicaPanelCards from './components/NuvicaPanelCards';
import NuvicaAboutSection from './components/NuvicaAboutSection';
import NuvicaStatsBar from './components/NuvicaStatsBar';
import NuvicaDnaSection from './components/NuvicaDnaSection';
import NuvicaDoctorTeam from './components/NuvicaDoctorTeam';
import NuvicaDepartmentsGrid from './components/NuvicaDepartmentsGrid';
import NuvicaBlogSection, { ArticleItem } from './components/NuvicaBlogSection';
import NuvicaArticleModal from './components/NuvicaArticleModal';
import NuvicaResultsView from './components/NuvicaResultsView';
import UploadArea from './components/UploadArea';

import { SAMPLE_REPORTS } from './data/sampleReports';
import { ReportAnalysis } from './types/report';
import { checkBackendHealth } from './services/api';
import { addReport, getStoredReports } from './services/storage';
import { CheckCircle2, X } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'results'>('landing');
  const [activeReport, setActiveReport] = useState<ReportAnalysis>(SAMPLE_REPORTS[0]);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isBackendConnected, setIsBackendConnected] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(null);
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);

  useEffect(() => {
    checkBackendHealth()
      .then((h) => setIsBackendConnected(h.status === 'healthy'))
      .catch(() => setIsBackendConnected(false));

    const stored = getStoredReports();
    if (stored && stored.length > 0) {
      setActiveReport(stored[0]);
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSelectReport = (report: ReportAnalysis) => {
    setActiveReport(report);
    setCurrentView('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectSpecialist = (panelName: string) => {
    const lower = panelName.toLowerCase();
    let matched = SAMPLE_REPORTS[0];
    if (lower.includes('cardio') || lower.includes('heart') || lower.includes('lipid')) {
      matched = SAMPLE_REPORTS[1];
    } else if (lower.includes('thyroid') || lower.includes('hormone') || lower.includes('vitamin')) {
      matched = SAMPLE_REPORTS[2];
    } else if (lower.includes('kidney') || lower.includes('metabolic')) {
      matched = SAMPLE_REPORTS[1];
    } else {
      matched = SAMPLE_REPORTS[0];
    }
    showToast(`Consulting advisory panel: ${matched.report_title}`);
    handleSelectReport(matched);
  };

  const handleSelectDepartment = (deptName: string) => {
    const lower = deptName.toLowerCase();
    let matched = SAMPLE_REPORTS[0];
    if (lower.includes('cardio') || lower.includes('urol') || lower.includes('gastro')) {
      matched = SAMPLE_REPORTS[1];
    } else if (lower.includes('ortho') || lower.includes('gynec') || lower.includes('neuro')) {
      matched = SAMPLE_REPORTS[2];
    } else {
      matched = SAMPLE_REPORTS[0];
    }
    showToast(`Loaded ${deptName} laboratory report panel.`);
    handleSelectReport(matched);
  };

  const handleUploadSuccess = (newReport: ReportAnalysis) => {
    addReport(newReport);
    setActiveReport(newReport);
    setIsUploadOpen(false);
    setCurrentView('results');
    showToast(`Successfully analyzed "${newReport.report_title}"!`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    if (currentView !== 'landing') {
      setCurrentView('landing');
      setTimeout(() => {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#dbeefd] via-[#f1f7fe] to-[#ffffff] font-sans antialiased text-[#0b192c] selection:bg-[#0284c7] selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <div className="bg-[#0b192c] text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 border border-[#22c55e]">
            <CheckCircle2 className="w-4 h-4 text-[#22c55e]" />
            <span>{toastMessage}</span>
            <button onClick={() => setToastMessage(null)} className="ml-1 text-slate-400 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Sticky Nuvica Header */}
      <NuvicaNavbar
        onOpenUpload={() => setIsUploadOpen(true)}
        onScrollToSection={scrollToSection}
        isBackendConnected={isBackendConnected}
      />

      {/* Main Content Area */}
      <main>
        {currentView === 'landing' ? (
          <>
            {/* 1. Hero Section ("QUICK SMART MEDIC") */}
            <div id="hero-section">
              <NuvicaHero
                onOpenUpload={() => setIsUploadOpen(true)}
                onExploreSamples={() => scrollToSection('panels-section')}
              />
            </div>

            {/* 2. Three Organ Cards (Brain, Liver, Kidney/Lipids) */}
            <NuvicaPanelCards onSelectReport={handleSelectReport} />

            {/* 3. Hospital Architecture & Mission Section */}
            <NuvicaAboutSection onOpenUpload={() => setIsUploadOpen(true)} />

            {/* 4. Stats Bar */}
            <NuvicaStatsBar />

            {/* 5. DNA Testing Section (From New Reference Image) */}
            <NuvicaDnaSection 
              onOpenUpload={() => setIsUploadOpen(true)} 
              onExploreDemo={() => scrollToSection('panels-section')} 
            />

            {/* 6. Medical Advisory Team (From New Reference Image) */}
            <NuvicaDoctorTeam onSelectSpecialist={handleSelectSpecialist} />

            {/* 7. Medical Departments Grid (8 Cards from New Reference Image) */}
            <NuvicaDepartmentsGrid onSelectDepartment={handleSelectDepartment} />

            {/* 8. Latest From Medical Frontlines (3 Articles from New Reference Image) */}
            <NuvicaBlogSection 
              onReadArticle={(article) => {
                setSelectedArticle(article);
                setIsArticleModalOpen(true);
              }} 
            />
          </>
        ) : (
          <NuvicaResultsView
            report={activeReport}
            onBack={() => {
              setCurrentView('landing');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNewUpload={() => setIsUploadOpen(true)}
          />
        )}
      </main>

      {/* Article Reader Modal */}
      {isArticleModalOpen && selectedArticle && (
        <NuvicaArticleModal
          article={selectedArticle}
          onClose={() => setIsArticleModalOpen(false)}
        />
      )}

      {/* Upload Modal (accessible overlay with Nuvica styling) */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-50 bg-[#0b192c]/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="w-full max-w-2xl my-auto animate-scaleUp">
            <UploadArea
              onAnalysisSuccess={handleUploadSuccess}
              onCancel={() => setIsUploadOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Footer matching Nuvica theme */}
      <footer id="safety-section" className="border-t border-slate-100 bg-[#f8fbfe] py-14 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-4">
          <div className="flex items-center justify-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#0b192c] text-white flex items-center justify-center font-bold text-xs">
              +
            </div>
            <span className="font-extrabold text-[#0b192c] text-sm tracking-tight">ReportSaathi</span>
          </div>

          <p className="max-w-2xl mx-auto text-slate-500 leading-relaxed">
            ReportSaathi is an educational health literacy tool. It does not provide medical diagnoses, treatment advice, or prescriptions. All laboratory metrics must always be evaluated in consultation with your licensed physician.
          </p>

          <p className="text-[11px] text-slate-400">
            © {new Date().getFullYear()} ReportSaathi. Nuvica Medical Healthcare Architecture.
          </p>
        </div>
      </footer>
    </div>
  );
}
