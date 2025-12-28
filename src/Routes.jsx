import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import DataIntakeMonitor from './pages/data-intake-monitor';
import AIDecisionAnalytics from './pages/ai-decision-analytics';
import DuplicateDetectionHub from './pages/duplicate-detection-hub';
import AuditTimelineView from './pages/audit-timeline-view';
import AdminLogin from './pages/admin-login';
import StaffRegistration from './pages/staff-registration';
import AdminPortal from './pages/admin-portal';
import CandidatePortal from './pages/candidate-portal';
import Landing from './pages/landing';
import FieldDetection from './pages/field-detection';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<Landing />} />
        <Route path="/data-intake-monitor" element={<DataIntakeMonitor />} />
        <Route path="/ai-decision-analytics" element={<AIDecisionAnalytics />} />
        <Route path="/duplicate-detection-hub" element={<DuplicateDetectionHub />} />
        <Route path="/audit-timeline-view" element={<AuditTimelineView />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/staff-registration" element={<StaffRegistration />} />
        <Route path="/admin-portal" element={<AdminPortal />} />
        <Route path="/candidate-portal" element={<CandidatePortal />} />
        <Route path="/field-detection" element={<FieldDetection />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
