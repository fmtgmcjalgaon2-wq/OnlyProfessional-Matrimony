/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/common/Header';
import { PortalHome } from './components/portal/PortalHome';
import { ProfileDossier } from './components/portal/ProfileDossier';
import { KundaliModal } from './components/portal/KundaliModal';
import { MembershipPlansModal } from './components/portal/MembershipPlansModal';
import { TrustCenterModal } from './components/portal/TrustCenterModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { MobileApp } from './components/mobile/MobileApp';

export default function App() {
  const [currentView, setCurrentView] = useState<'portal' | 'admin' | 'mobile'>('portal');
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);

  // Modal triggers
  const [isKundaliOpen, setIsKundaliOpen] = useState(false);
  const [isMembershipOpen, setIsMembershipOpen] = useState(false);
  const [isTrustCenterOpen, setIsTrustCenterOpen] = useState(false);

  return (
    <div className="w-full min-h-screen bg-[#f9f9ff] text-[#171c25] flex flex-col font-sans">
      {/* Universal Top Header with High-Visibility Switcher */}
      <Header
        currentView={currentView}
        onViewChange={(view) => {
          setCurrentView(view);
          if (view !== 'portal') {
            setSelectedProfileId(null);
          }
        }}
        onOpenKundali={() => setIsKundaliOpen(true)}
        onOpenMembership={() => setIsMembershipOpen(true)}
        onOpenTrustCenter={() => setIsTrustCenterOpen(true)}
        onSelectProfile={(id) => {
          setSelectedProfileId(id);
          setCurrentView('portal');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main View Area (offset for fixed header) */}
      <main className="flex-1 w-full pt-[88px]">
        {/* VIEW 1: WEB PORTAL */}
        {currentView === 'portal' && (
          selectedProfileId ? (
            <ProfileDossier
              profileId={selectedProfileId}
              onBack={() => setSelectedProfileId(null)}
              onOpenKundali={() => setIsKundaliOpen(true)}
              onOpenMembership={() => setIsMembershipOpen(true)}
            />
          ) : (
            <PortalHome
              onSelectProfile={(id) => {
                setSelectedProfileId(id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenKundali={() => setIsKundaliOpen(true)}
              onOpenMembership={() => setIsMembershipOpen(true)}
              onOpenTrustCenter={() => setIsTrustCenterOpen(true)}
              onOpenMobileView={() => setCurrentView('mobile')}
            />
          )
        )}

        {/* VIEW 2: MASTER ADMIN PANEL */}
        {currentView === 'admin' && (
          <AdminDashboard />
        )}

        {/* VIEW 3: WORKING MOBILE APPLICATION */}
        {currentView === 'mobile' && (
          <MobileApp />
        )}
      </main>

      {/* Global Modals */}
      <KundaliModal
        isOpen={isKundaliOpen}
        onClose={() => setIsKundaliOpen(false)}
      />

      <MembershipPlansModal
        isOpen={isMembershipOpen}
        onClose={() => setIsMembershipOpen(false)}
        onSuccess={() => {
          setIsMembershipOpen(false);
        }}
      />

      <TrustCenterModal
        isOpen={isTrustCenterOpen}
        onClose={() => setIsTrustCenterOpen(false)}
      />
    </div>
  );
}
