export interface Profile {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female';
  photo: string;
  gallery: string[];
  profession: string;
  company: string;
  education: string;
  college: string;
  income: string;
  location: string;
  city: string;
  height: string;
  religion: string;
  caste: string;
  motherTongue: string;
  maritalStatus: string;
  diet: string;
  drink: string;
  smoke: string;
  bio: string;
  verifiedBadges: {
    mobile: boolean;
    identity: boolean;
    education: boolean;
    professional: boolean;
  };
  trustScore: number;
  matchScore: number;
  status: 'verified' | 'pending' | 'rejected' | 'quarantined';
  phoneMasked: string;
  horoscope: {
    rashi: string;
    nakshatra: string;
    manglik: string;
    gotra: string;
    birthTime: string;
    birthPlace: string;
    gunas: number;
  };
  family: {
    type: string;
    values: string;
    father: string;
    mother: string;
    siblings: string;
    origin: string;
  };
}

export interface VerificationItem {
  id: string;
  candidateId: string;
  candidateName: string;
  candidatePhoto: string;
  profession: string;
  documentType: 'Aadhaar' | 'Passport' | 'Degree' | 'Form 16' | 'Bar Council' | 'MCI';
  documentNumberMasked: string;
  ocrExtracted: {
    name: string;
    dob: string;
    idNumber: string;
    matchRate: number;
  };
  statedData: {
    name: string;
    dob: string;
    fatherName: string;
    city: string;
  };
  submittedAt: string;
  slaMinutesLeft: number;
  priority: 'Urgent' | 'High' | 'Normal';
  status: 'pending' | 'approved' | 'rejected' | 'doc_requested';
  auditorNotes?: string;
}

export interface FraudAlert {
  id: string;
  candidateId: string;
  candidateName: string;
  claimedProfession: string;
  photo: string;
  triggerVector: string;
  riskScore: number;
  status: 'active' | 'quarantined' | 'blocked' | 'dismissed';
  severity: 'Critical' | 'High' | 'Elevated';
  details: string;
  evidence: string;
  phone: string;
  ipGeo: string;
}

export interface SupportTicket {
  id: string;
  memberId: string;
  memberName: string;
  memberPhoto: string;
  tier: 'VIP Platinum' | 'VIP Gold' | 'Standard';
  subject: string;
  category: string;
  slaMinutesRemaining: number;
  priority: 'Urgent' | 'High' | 'Medium';
  status: 'open' | 'in_progress' | 'resolved';
  updatedAt: string;
  assignedTo: string;
  messages: Array<{
    sender: 'member' | 'agent' | 'system';
    senderName: string;
    text: string;
    timestamp: string;
  }>;
}

export interface Transaction {
  id: string;
  invoiceId: string;
  memberId: string;
  memberName: string;
  memberPhoto: string;
  planName: string;
  amount: number;
  gstAmount: number;
  gateway: string;
  paymentMethod: string;
  timestamp: string;
  status: 'Paid' | 'Refund Pending' | 'Failed' | 'Refunded';
}

export interface ChatMessage {
  id: string;
  chatId: string;
  senderId: string;
  senderName: string;
  text?: string;
  mediaType?: 'text' | 'view_once_image' | 'voice_note';
  mediaUrl?: string;
  duration?: string;
  timestamp: string;
  isRead: boolean;
}

export interface PlatformStats {
  activeSeekersOnline: number;
  verificationQueuePending: number;
  verifiedCount: number;
  todayNewRegistrations: number;
  rejectedCount: number;
  reportedCount: number;
  quarantinedAccounts: number;
  todayRevenue: number;
  mrr: number;
  arr: number;
  csatScore: number;
  slaAverageMinutes: number;
  openTickets: number;
}

export interface KundaliResult {
  candidate1: { id: string; name: string; photo: string; rashi: string; nakshatra: string };
  candidate2: { id: string; name: string; photo: string; rashi: string; nakshatra: string };
  totalScore: number;
  maxScore: number;
  percentage: number;
  verdict: string;
  manglikStatus: string;
  nadiDosha: string;
  kootas: Array<{
    name: string;
    max: number;
    scored: number;
    meaning: string;
  }>;
}

export interface SystemSettings {
  metroZeroTrustLock: boolean;
  pHashDeduplication: boolean;
  dpdp2023AuditLogging: boolean;
  emergencyKillswitch: boolean;
  autoQuarantineThreshold: number;
  outboundLinkSanitizer: boolean;
  i4cCrimeDbSync: boolean;
}
