// Persistent and in-memory mock database for OnlyProfessional Matrimony
import fs from 'fs';
import path from 'path';

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

const DATA_FILE = path.resolve(process.cwd(), 'database.json');

// Initial seed dataset
const initialProfiles: Profile[] = [
  {
    id: 'OPM-9821',
    name: 'Vikram Malhotra',
    age: 31,
    gender: 'male',
    photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB40lg4prvJo3tVWIC_F1CQDfA14wfwojNNLqA3YdKDDE3SHrmTfMR4OApFHSHav8ByZSl8kqBYwilH6zf33vhVuw523xntdv0TeBYIdwcB606aKfjtA24BnRpz_Qr2J5LuYH7EIkRTW-DeO03jTB1DPzmIJsieIHnW-YQ_BlHqWxROnrwEg53f18PHh5DEEpLDvabw78LH0xdB8j6VnII5oT_yHisuR6hsuHsHaABe52TiFj8YXdQN',
    gallery: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBos40b-0WUcktDeCwa6wkF9ItLdgVaRA3Eqw8P3SZdyMflm7vnfGXLrGV2OTScIRuaTUj1IWDdmtnRudmqmUvLJTlFCU1dEGTBa4idDusoLsdrLmY-SNqvhneMwJeg4XsTdRCqARv1GbKyCeewx9sxhe5dgcd77Ak-kcJSj5fNHU8fWNhQkpQ4nFvijp8p8jXDgxsKP_7TwqPFYRewbKlXDIs7jLbiogZtScblHNJ4DvX6O8rz5San',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAx4AbC5LgLfjAHjfIWS7-lx35jO3AsYDHwq61IzDD53cfQj3jkDmFVULJMjl1k5DbVL0uj2Vn3X1ByMwcCI2ZD_vkM5JXG8pDC4TwcVLwVO78I_90zHu7EFv_3meFhkCarBN7InXKFK-B_fEl3B5JlgyippEHRREU_Zj8DdE40_k_3nGq6ZQuXzQZqPWgEWCO4S6YClm35ZEumTiuImdISDPooFTrlXkSKfaWP3N1omVd_KvTiA8zq',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCmQdLaMdmafkwMPWndpYtY0V1vJ6x_dheMvPLwzsrmrDIpcpjNnI59ICqpEAT0fxIuu3PNpOsU3LROchO2kETsqTyVE1COPJIxYFd1f_9hSeljJ6QDArOUU5n2apRcepM5WyXWMGG5WJvHwcV6NvL-8dmp4KoBTzkdK3273zCb59Pmezb4opcVnEo7dRu9D52_VdCmv-bxKw5PLi5Sp9kNy28emxxAxaiW8Fp_8O8W9vK165nbqZZo'
    ],
    profession: 'Vice President, Global Markets',
    company: 'Goldman Sachs',
    education: 'B.Tech + MBA',
    college: 'IIT Bombay & IIM Calcutta',
    income: '₹55L - ₹75L CTC',
    location: 'Bandra West, Mumbai',
    city: 'Mumbai',
    height: '6\' 1" (185 cm)',
    religion: 'Hindu',
    caste: 'Punjabi Khatri',
    motherTongue: 'Hindi, Punjabi, English',
    maritalStatus: 'Never Married',
    diet: 'Strict Vegetarian',
    drink: 'Occasional Social',
    smoke: 'Non-Smoker',
    bio: 'IIT Bombay & IIM Calcutta alumnus. Marathon runner, classical music aficionado. Looking for an ambitious, warm, and articulate life partner with shared filial and cultural values.',
    verifiedBadges: {
      mobile: true,
      identity: true,
      education: true,
      professional: true
    },
    trustScore: 96,
    matchScore: 94,
    status: 'verified',
    phoneMasked: '+91 98••••••••',
    horoscope: {
      rashi: 'Taurus (Vrishabha)',
      nakshatra: 'Rohini (Pada 2)',
      manglik: 'Non-Manglik',
      gotra: 'Kashyap',
      birthTime: '10:45 AM',
      birthPlace: 'Amritsar, Punjab',
      gunas: 32
    },
    family: {
      type: 'Joint Family',
      values: 'Moderate Traditional',
      father: 'Col. Ashok K. Malhotra (Retd), Indian Army',
      mother: 'Prof. Sunita Malhotra (M.A. Modern History)',
      siblings: '1 Younger Sister (Principal Designer, London)',
      origin: 'Amritsar & Chandigarh Roots'
    }
  },
  {
    id: 'OPM-88912',
    name: 'Dr. Rajesh Sen',
    age: 33,
    gender: 'male',
    photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZndLxTQo9NdO6zmgm58ViVOUz5vMUfxUcxws4mkwkut5rVzruU2D_Z4ldolidrRWtG6sXnH6JdotvHuRvHos8YPlcSTs-SNlvmNd6Xs46lyYaBWFsQODUJZcAPqohGJp86HkcLPhwzRXydowopim1g84biJsu2yM10rYG1BL6k_Il6MFvinxGO39OpEqw710FNvmT5XjnqVrl3mU5r7GxVqdZP6fJpKgjxLd-p9QuCu96jScOEMme',
    gallery: [],
    profession: 'Associate Professor & Cardiologist',
    company: 'AIIMS New Delhi',
    education: 'MBBS, MD Cardiology',
    college: 'AIIMS Delhi',
    income: '₹42L - ₹55L CTC',
    location: 'Hauz Khas, New Delhi',
    city: 'New Delhi',
    height: '5\' 11" (180 cm)',
    religion: 'Hindu',
    caste: 'Bengali Kayastha',
    motherTongue: 'Bengali, Hindi',
    maritalStatus: 'Never Married',
    diet: 'Vegetarian',
    drink: 'Non-Drinker',
    smoke: 'Non-Smoker',
    bio: 'Cardiologist at AIIMS. Avid reader, classical music listener. Looking for a compassionate partner with deep family values.',
    verifiedBadges: {
      mobile: true,
      identity: true,
      education: true,
      professional: true
    },
    trustScore: 98,
    matchScore: 92,
    status: 'verified',
    phoneMasked: '+91 97••••••••',
    horoscope: {
      rashi: 'Leo (Simha)',
      nakshatra: 'Magha (Pada 2)',
      manglik: 'Non-Manglik',
      gotra: 'Sandilya',
      birthTime: '06:30 AM',
      birthPlace: 'Kolkata, WB',
      gunas: 31
    },
    family: {
      type: 'Nuclear',
      values: 'Progressive Traditional',
      father: 'Dr. P. K. Sen (Retd Professor)',
      mother: 'Aparna Sen (Principal)',
      siblings: '1 Younger Brother (Doctor)',
      origin: 'Kolkata & New Delhi'
    }
  },
  {
    id: 'OPM-7612',
    name: 'Dr. Riya Sen',
    age: 28,
    gender: 'female',
    photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbXKIgyjbIWEJDTEiGGqWSnEYqAJL92ROEGD2D1AM-DWbTQ0ARF7wF5WykXKisxlL15mfmoTOcUaMIFYtV3gSEYS49OCR0qPQ9t8EeAjZ_YV1PUo6Kqse7AtXjVKl9j0PxVJhOMbPLLxH86EAPsq3NJY5eG1lEJrVmhmaRe2aJ2mCjkLfey82X8wgWdQ4TBWDKhvsl7bIvVMpK7KA5LMX3rImzkAuvjEDTSnIb-0Vd4NAK3jN60oQu',
    gallery: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuABoZY4udzfLN3RNwFhOqo9H-i71fJabGrNEk-F-TrhFahIAKt5f__ejCMKsTv-K4RGu6nufdvVHCDXFG1rfxmuBeG4apaOgDHo8wF3Brx9sfd7qiuQFCY3vKhcDrAc3D8Rn7SlnjgrxicmcS2yVohwMVuNEgZJBZgs8kM41_s5y7vU5z8Ao5RMp-g3fG0ycZ_QsgNZqRIn5rZO7E6A8efCQ887YNizjlC0CgDr_We_7Q-HUA5xM4lX',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAfi7Gp31xGs1NYug-5IPYYLnCUED0WuRJKowcXMYFYC6jtXK113JwWEWDoYbtHMOjlcu2tCj6zTQuwenzewIOyb34DEwZ5UDSOo70DkcC0MMj_es3x7p87arwzsbDakzcUuFXz-KW1oSFFjLJpZIppaCM8eOAh_kHoCqEI0sV2foF1oM-aCQei8k3LRV1HPBeNQQ5irjRduPS8tkTgTBM9cz_VMZaa5VqUOrhjS-PZP7LEXm_R9-5s'
    ],
    profession: 'Clinical Cardiologist (Fellow)',
    company: 'AIIMS New Delhi',
    education: 'MD Cardiology, MBBS',
    college: 'Grant Medical College & AIIMS',
    income: '₹35L - ₹45L CTC',
    location: 'South Delhi, New Delhi',
    city: 'New Delhi',
    height: '5\' 5" (165 cm)',
    religion: 'Hindu',
    caste: 'Bengali Kayastha',
    motherTongue: 'Bengali, Hindi, English',
    maritalStatus: 'Never Married',
    diet: 'Strict Vegetarian',
    drink: 'Never',
    smoke: 'Never',
    bio: 'Practicing cardiologist with love for classical Hindustani music, heritage architecture, and healthy outdoor routines. Grounded, empathetic, and ambitious.',
    verifiedBadges: {
      mobile: true,
      identity: true,
      education: true,
      professional: true
    },
    trustScore: 97,
    matchScore: 96,
    status: 'verified',
    phoneMasked: '+91 99••••••••',
    horoscope: {
      rashi: 'Simha (Leo)',
      nakshatra: 'Magha (Pada 2)',
      manglik: 'Non-Manglik',
      gotra: 'Kashyap',
      birthTime: '07:15 AM',
      birthPlace: 'Kolkata, WB',
      gunas: 32
    },
    family: {
      type: 'Nuclear',
      values: 'Moderate Traditional',
      father: 'Retired Senior Bank Official (SBI)',
      mother: 'Homemaker & Literature Scholar',
      siblings: '1 Younger Brother (Software Engineer at Microsoft)',
      origin: 'Varanasi & Kolkata'
    }
  },
  {
    id: 'OPM-67431',
    name: 'Ananya Deshmukh',
    age: 27,
    gender: 'female',
    photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxGQC1hPvAsPXcgbUh1UYi-FofHlo41iRgtX2RevKZFpuGojqpy2r1fLUcddVJrIfKIFzxZqhorrIwQM02oSy4equhofsfky8BUyf-pEln9gHPyXo5x-JEd05rYn1Fd4n0sBhqVugPm-FW-z1HrEOcwUk2hVVrnMuqEMklTLUXNhXaYs3rPxvCcsB1XzsZFtFwxJm2Jrp-kgDTN6nBRCP5wLzeQSDvJum7Ut8qwHHfrMoMdGcBrsJF',
    gallery: [],
    profession: 'Senior Legal Counsel',
    company: 'Cyril Amarchand Mangaldas',
    education: 'B.A. LL.B. (Hons)',
    college: 'NLSIU Bengaluru',
    income: '₹38L - ₹48L CTC',
    location: 'Indiranagar, Bengaluru',
    city: 'Bengaluru',
    height: '5\' 6" (168 cm)',
    religion: 'Hindu',
    caste: 'Marathi Deshastha',
    motherTongue: 'Marathi, Hindi, English',
    maritalStatus: 'Never Married',
    diet: 'Eggetarian',
    drink: 'Socially',
    smoke: 'Never',
    bio: 'Corporate litigator with interest in modern art, tennis, and heritage preservation. Seeking an intellectually curious partner who values laughter and ambition.',
    verifiedBadges: {
      mobile: true,
      identity: true,
      education: true,
      professional: false
    },
    trustScore: 89,
    matchScore: 91,
    status: 'pending',
    phoneMasked: '+91 96••••••••',
    horoscope: {
      rashi: 'Kanya (Virgo)',
      nakshatra: 'Hasta',
      manglik: 'Mild Anshik Manglik',
      gotra: 'Vashishta',
      birthTime: '11:20 AM',
      birthPlace: 'Pune, Maharashtra',
      gunas: 30
    },
    family: {
      type: 'Joint Family',
      values: 'Progressive',
      father: 'Senior High Court Advocate',
      mother: 'Professor of Economics',
      siblings: '1 Elder Brother (Architect)',
      origin: 'Pune & Bengaluru'
    }
  },
  {
    id: 'OPM-91043',
    name: 'Sneha Kapoor',
    age: 29,
    gender: 'female',
    photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgm6XhJTFgtv-cZ1_IxVuar9pP0xQ1eU7dqLk7-j6gzPWPoijnTuhpgqg-wLmVXFH0geEMXn-vnxF5rnepJCkdTKCl8Np8opEFCbQte4v8Zt51WzDjM0S1n7Hu42I7vYUvaWeLqT8jiObeHCxtYR82lry0CKdDKSUX4QT8sPCpPmnv-sizmpfmM5rx0N-kDXM7oL4uSgxGE75LpW-wNGdVVw-l0cY60fjWtvUjNR9XWfsvrrB7XSkX',
    gallery: [],
    profession: 'Vice President, Quantitative Trading',
    company: 'Morgan Stanley',
    education: 'MBA, Finance',
    college: 'Wharton School / IIT Delhi',
    income: '₹75L - ₹95L CTC',
    location: 'Bandra Kurla Complex, Mumbai',
    city: 'Mumbai',
    height: '5\' 7" (170 cm)',
    religion: 'Hindu',
    caste: 'Punjabi Khatri',
    motherTongue: 'Hindi, English',
    maritalStatus: 'Never Married',
    diet: 'Vegetarian',
    drink: 'Socially',
    smoke: 'Never',
    bio: 'Finance executive with global background. Marathoner, classical pianist, avid reader of history. Looking for an accomplished equal partner.',
    verifiedBadges: {
      mobile: true,
      identity: true,
      education: true,
      professional: true
    },
    trustScore: 98,
    matchScore: 95,
    status: 'verified',
    phoneMasked: '+91 98••••••••',
    horoscope: {
      rashi: 'Taurus (Vrishabha)',
      nakshatra: 'Rohini',
      manglik: 'Non-Manglik',
      gotra: 'Kashyap',
      birthTime: '04:15 PM',
      birthPlace: 'New Delhi',
      gunas: 33
    },
    family: {
      type: 'Nuclear',
      values: 'Progressive',
      father: 'Senior Director, Ministry of External Affairs',
      mother: 'Doctor (MD)',
      siblings: 'None (Only child)',
      origin: 'Delhi NCR'
    }
  },
  {
    id: 'OPM-5509',
    name: 'Siddharth Kashyap',
    age: 30,
    gender: 'male',
    photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjhJ3Wql8Fd-2tWSbFiTgF3Ekqe0r-PwptVPmRi8R7w1Eu5_7ZGl6wfVOoajQ3dDk0SuvSY1JUSXQz4sdrQCJPwUiwD3m28NcG85UMjiOB4Z4Nu4yJrL3So5wEDmSV3SZwKlfSRTGKQJttnTmvsY3rwdlMyqvszy2982tte2RiZnVdxsenmC1Y395bOcqyeDZi-k2bSqT1pOgS9ueAp2qYg-Pl7cmgIAggL_o8YndnIZSS4_4gSEi9',
    gallery: [],
    profession: 'Co-Founder & CTO',
    company: 'FinLeap Tech (Series B)',
    education: 'B.E. Computer Science',
    college: 'BITS Pilani',
    income: '₹80L+ CTC + Equity',
    location: 'Koramangala, Bengaluru',
    city: 'Bengaluru',
    height: '6\' 0" (183 cm)',
    religion: 'Hindu',
    caste: 'Agarwal',
    motherTongue: 'Hindi, English',
    maritalStatus: 'Never Married',
    diet: 'Vegetarian',
    drink: 'Never',
    smoke: 'Never',
    bio: 'Technology founder with passion for space exploration, cycling, and Indian philosophy. Looking for an authentic life companion.',
    verifiedBadges: {
      mobile: true,
      identity: true,
      education: true,
      professional: true
    },
    trustScore: 94,
    matchScore: 90,
    status: 'verified',
    phoneMasked: '+91 99••••••••',
    horoscope: {
      rashi: 'Mithuna (Gemini)',
      nakshatra: 'Punarvasu',
      manglik: 'Non-Manglik',
      gotra: 'Garg',
      birthTime: '08:45 AM',
      birthPlace: 'Jaipur, Rajasthan',
      gunas: 29
    },
    family: {
      type: 'Joint Family',
      values: 'Traditional',
      father: 'Industrialist (Jaipur)',
      mother: 'Homemaker',
      siblings: '2 Elder Brothers (Married, in business)',
      origin: 'Jaipur & Bengaluru'
    }
  }
];

const initialVerificationQueue: VerificationItem[] = [
  {
    id: 'VQ-101',
    candidateId: 'OPM-9821',
    candidateName: 'Vikram Malhotra',
    candidatePhoto: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB40lg4prvJo3tVWIC_F1CQDfA14wfwojNNLqA3YdKDDE3SHrmTfMR4OApFHSHav8ByZSl8kqBYwilH6zf33vhVuw523xntdv0TeBYIdwcB606aKfjtA24BnRpz_Qr2J5LuYH7EIkRTW-DeO03jTB1DPzmIJsieIHnW-YQ_BlHqWxROnrwEg53f18PHh5DEEpLDvabw78LH0xdB8j6VnII5oT_yHisuR6hsuHsHaABe52TiFj8YXdQN',
    profession: 'VP Global Markets, Goldman Sachs',
    documentType: 'Aadhaar',
    documentNumberMasked: 'XXXX-XXXX-9142',
    ocrExtracted: {
      name: 'VIKRAM MALHOTRA',
      dob: '14/08/1993',
      idNumber: 'XXXX-XXXX-9142',
      matchRate: 99.4
    },
    statedData: {
      name: 'Vikram Malhotra',
      dob: '14 August 1993',
      fatherName: 'Col. Ashok K. Malhotra (Retd)',
      city: 'Bandra West, Mumbai'
    },
    submittedAt: 'Today, 09:15 AM',
    slaMinutesLeft: 14,
    priority: 'Urgent',
    status: 'pending'
  },
  {
    id: 'VQ-102',
    candidateId: 'OPM-67431',
    candidateName: 'Ananya Deshmukh',
    candidatePhoto: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxGQC1hPvAsPXcgbUh1UYi-FofHlo41iRgtX2RevKZFpuGojqpy2r1fLUcddVJrIfKIFzxZqhorrIwQM02oSy4equhofsfky8BUyf-pEln9gHPyXo5x-JEd05rYn1Fd4n0sBhqVugPm-FW-z1HrEOcwUk2hVVrnMuqEMklTLUXNhXaYs3rPxvCcsB1XzsZFtFwxJm2Jrp-kgDTN6nBRCP5wLzeQSDvJum7Ut8qwHHfrMoMdGcBrsJF',
    profession: 'Senior Legal Counsel, Cyril Amarchand',
    documentType: 'Bar Council',
    documentNumberMasked: 'MAH/4021/2019',
    ocrExtracted: {
      name: 'ANANYA DESHMUKH',
      dob: '22/03/1997',
      idNumber: 'MAH/4021/2019',
      matchRate: 94.2
    },
    statedData: {
      name: 'Ananya Deshmukh',
      dob: '22 March 1997',
      fatherName: 'V. R. Deshmukh',
      city: 'Bengaluru, Karnataka'
    },
    submittedAt: 'Today, 08:30 AM',
    slaMinutesLeft: 28,
    priority: 'Normal',
    status: 'pending'
  },
  {
    id: 'VQ-103',
    candidateId: 'OPM-7612',
    candidateName: 'Dr. Riya Sen',
    candidatePhoto: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbXKIgyjbIWEJDTEiGGqWSnEYqAJL92ROEGD2D1AM-DWbTQ0ARF7wF5WykXKisxlL15mfmoTOcUaMIFYtV3gSEYS49OCR0qPQ9t8EeAjZ_YV1PUo6Kqse7AtXjVKl9j0PxVJhOMbPLLxH86EAPsq3NJY5eG1lEJrVmhmaRe2aJ2mCjkLfey82X8wgWdQ4TBWDKhvsl7bIvVMpK7KA5LMX3rImzkAuvjEDTSnIb-0Vd4NAK3jN60oQu',
    profession: 'Cardiologist, AIIMS',
    documentType: 'MCI',
    documentNumberMasked: 'DMC-REG-84910',
    ocrExtracted: {
      name: 'RIYA SEN',
      dob: '18/11/1995',
      idNumber: 'DMC-REG-84910',
      matchRate: 98.7
    },
    statedData: {
      name: 'Dr. Riya Sen',
      dob: '18 November 1995',
      fatherName: 'S. N. Sen',
      city: 'New Delhi'
    },
    submittedAt: 'Today, 07:45 AM',
    slaMinutesLeft: 45,
    priority: 'Normal',
    status: 'pending'
  }
];

const initialFraudAlerts: FraudAlert[] = [
  {
    id: 'FA-801',
    candidateId: 'OPM-CRIM-8912',
    candidateName: 'Rajesh Kumar Verma',
    claimedProfession: 'Sr. VP Global Markets, Barclays UK',
    photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZHT175sVYykH0G_dT_DLEn_uhmFztyCE8urbm3EbXA1kiPgMEOoLCHJzg3PKslU-E-Dho8SYB-AyJJWCK0_nXQ_I5fx6mtdyM1QZfJmiA2ntfzkCkXgN047EZBqpAmhVBGlxjY36BQ0OZMCRrDOTvdgEVc-e6fpchHEHhxaRG-Wf581QkSeyH20Ey2IsZfo41qLGrlSKOED1gLMsYkFAGDmlNZ2A3wTql4TmRXL2c1ulKoUjXviD2',
    triggerVector: 'Rule 7: Early Financial Demands (Airport customs fee scam)',
    riskScore: 96,
    status: 'quarantined',
    severity: 'Critical',
    details: 'NLP triggered on "urgent offshore transfer ₹1,20,000 for customs gift clearance". Hardware IMEI matches 4 previously banned profiles.',
    evidence: 'Intercepted chat message asking for immediate GPay QR scan on message #2.',
    phone: '+91 98201 ••••• (Virtual VoIP eSIM)',
    ipGeo: 'VPN Subnet / Lagos Proxy'
  },
  {
    id: 'FA-802',
    candidateId: 'OPM-7712',
    candidateName: 'Aditya S. (Goldman Sachs VP)',
    claimedProfession: 'VP Investment Banking',
    photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCb10ZwjU2N9lNu-lJx0k_A4_lQ5GyUKwVyS5bwvEvj-EOMNfUK15XhZY2wqjLxOpfkyQlP9HXeSypN18gWa5Rc0meM_QZBKzZwx4cZ34unSun_NFkD7tL1BiOTisWQVQ3jU_BpkvOM1uj47NUmZQ2FKtRLvsfYYqNQDbjRQ0SjJgcZDCZgYEgyarhRhRvMouWkCe0aEgXE5h41gIAbgkWLDM24q0EJKSxTIk0ctTFBWql8m6U6Jfco',
    triggerVector: 'Rule 3: Stolen pHash Duplicate (IG Influencer model)',
    riskScore: 94,
    status: 'quarantined',
    severity: 'Critical',
    details: 'Perceptual hash matched public influencer photos with 98.4% cosine similarity.',
    evidence: 'pHash Hamming distance < 2 from indexed instagram model database.',
    phone: '+91 98112 •••••',
    ipGeo: 'Romania Proxy Node'
  },
  {
    id: 'FA-803',
    candidateId: 'OPM-BOT-9022',
    candidateName: 'Rohit Kulkarni (Script Agent)',
    claimedProfession: 'Automated Agent',
    photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNO9O41MKllgqJ3UEoKO7MM5errpIwUBbNfNmrrVRaejDMBUHoun9q79VxhmiFKK2tJ0o7UwHgbUDcbQiyMvxqypfWiw9_06qfEr3LSzHOnMAScZ5UlQEMlBZW2OTXgXhLUjGNDGy6RnEvx6XERKqojrqb_nfLf0QlEn0BqioMDhggY1HqFFWHPi9SllB_oZxbMWsqUIrLHroxoZCpQWBzR3SOHggX9mE9ih2GqqViZNk8guFnvGte',
    triggerVector: 'Rule 6: Spam Script Fan-out (450 chats in 8 mins)',
    riskScore: 78,
    status: 'quarantined',
    severity: 'High',
    details: 'Rapid programmatic transmission of identical greeting script to 50+ prospective matches in 10 minutes.',
    evidence: 'Rate limit violation: 5.4 msgs/min from Tor Exit Relay.',
    phone: '+44 7700 ••••• (VoIP)',
    ipGeo: 'Tor Exit Node'
  }
];

const initialSupportTickets: SupportTicket[] = [
  {
    id: 'TKT-4412',
    memberId: 'OPM-67431',
    memberName: 'Ananya Sharma',
    memberPhoto: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDCXlPmlxfR4LBNWEs2_f04UA_PWDYyovPtHOzW4SlPFsCYYQNJ95Ek4PDlHt-6fuFzUxg8QkACc_RhzaBjuIQnIL03IXjjQn0uyza0LgWldGA_N1_u5TkglojEn-4FTcpxcJ52SjX5NCFZF_DXL7LSKm0oQ18gtjlYBdbBJwon7QpvmbvQHR9O3Q9hFb4aSiuJ1t4QyEdorfs4I70WOPjMhvzsfJvSXirsP5B_4PL0W_dGAXruW7IK',
    tier: 'VIP Platinum',
    subject: 'Photo privacy request: hide from colleagues at Paytm',
    category: 'Privacy & Visibility',
    slaMinutesRemaining: 6,
    priority: 'Urgent',
    status: 'in_progress',
    updatedAt: '2m ago',
    assignedTo: 'Rajesh Verma (RM)',
    messages: [
      {
        sender: 'member',
        senderName: 'Ananya Sharma',
        text: 'Namaste Rajesh ji, I noticed two senior colleagues from my team at Paytm sent me match connection requests today. This is deeply embarrassing as I have not disclosed my matrimonial search at work.',
        timestamp: '11:42 AM'
      },
      {
        sender: 'member',
        senderName: 'Ananya Sharma',
        text: 'Can we immediately block my profile from anyone whose verified employer is listed as Paytm, One97 Communications, or related fintech partners in Noida/Gurgaon?',
        timestamp: '11:44 AM'
      },
      {
        sender: 'agent',
        senderName: 'Rajesh Verma',
        text: 'Namaste Ananya ji. Please be assured, your privacy is our sacred commitment. I am opening an immediate priority override to mask your entire portfolio from Paytm corporate IP ranges and domain-verified candidates.',
        timestamp: '11:46 AM'
      },
      {
        sender: 'system',
        senderName: 'System Sentinel',
        text: 'System Audit: Masking rule applied to Paytm corporate directory (4,120 active accounts).',
        timestamp: '11:48 AM'
      }
    ]
  },
  {
    id: 'TKT-4409',
    memberId: 'OPM-9821',
    memberName: 'Vikram Malhotra',
    memberPhoto: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB40lg4prvJo3tVWIC_F1CQDfA14wfwojNNLqA3YdKDDE3SHrmTfMR4OApFHSHav8ByZSl8kqBYwilH6zf33vhVuw523xntdv0TeBYIdwcB606aKfjtA24BnRpz_Qr2J5LuYH7EIkRTW-DeO03jTB1DPzmIJsieIHnW-YQ_BlHqWxROnrwEg53f18PHh5DEEpLDvabw78LH0xdB8j6VnII5oT_yHisuR6hsuHsHaABe52TiFj8YXdQN',
    tier: 'VIP Platinum',
    subject: 'Urgent: Astro Kundali Dosha discrepancy verification',
    category: 'Vedic Astrology',
    slaMinutesRemaining: 18,
    priority: 'High',
    status: 'open',
    updatedAt: '11m ago',
    assignedTo: 'Pandit Vidyadhar Shastri',
    messages: [
      {
        sender: 'member',
        senderName: 'Vikram Malhotra',
        text: 'Hello, our family astrologer wants to review the raw ephemeris planetary degree positions for Rohini Nakshatra for my profile and match #OPM-7612.',
        timestamp: '11:15 AM'
      }
    ]
  }
];

const initialTransactions: Transaction[] = [
  {
    id: 'TXN-998412',
    invoiceId: 'INV-2024-8841',
    memberId: 'OPM-DEL-89410',
    memberName: 'Devavrat Singhania',
    memberPhoto: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAiRwPHAXib8aUUn3tDvnP4DgBVoI2e_6P4mD9zKh9Zfcz6C_rhSOcprfrTMg4jOmjPdAtlpZgBbV6GKRu9bNcueU4m7x_yDLuxqaLUZJVwjHHribZmiVkTWsVmIBl4lvwu-Ft5w4WVdWP7XeUXGHdNea1o7RBsMnzp-10TUv6cDkyuXahSobU2eLYRAlrrrOoZfSAd0ZKOb6D4mBr7ooEBN8kfEE9oFKpHOu9TgrYgpJeGXsvnCY74',
    planName: 'Royal Elite Custom (1 Year)',
    amount: 45000,
    gstAmount: 6864,
    gateway: 'Razorpay PG',
    paymentMethod: 'HDFC Infinia (Card)',
    timestamp: 'Today, 14:42 IST',
    status: 'Paid'
  },
  {
    id: 'TXN-998411',
    invoiceId: 'INV-2024-8840',
    memberId: 'OPM-MUM-44120',
    memberName: 'Ananya Deshmukh',
    memberPhoto: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxFem8TiEGKCLcsba5lxeY0rj38pcTZOeSVrR_UcU07qlvHqPvRbKABxCJ2_-x2ZoUjRGf_vbAT8hfB1HMEBAN7m1ZRyb_5F9iJEuJbZHVtDfF1Hzdm20J-tQIgpdHw_TTTGz9Ir0Npyl8VbBZ0iEaX5GTna2fYiYexC092YbTk60Zx-1yCKy6YXkqJitbVDx1OAH4C9ZQ8nD4NU4u_ok_VcRYfxKTnCq2Jy0FsD3_kQMjvMUlGGL5',
    planName: 'Platinum Assisted (6 Months)',
    amount: 16999,
    gstAmount: 2593,
    gateway: 'UPI AutoPay',
    paymentMethod: 'GooglePay (ICICI)',
    timestamp: 'Today, 14:28 IST',
    status: 'Paid'
  },
  {
    id: 'TXN-998410',
    invoiceId: 'REF-REQ-0021',
    memberId: 'OPM-BLR-21009',
    memberName: 'Rohit K. Varma',
    memberPhoto: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZCV9OebaFyZnjHmeIwqYOIbylZUVotHtc1hqxY8Db_uwtJ8OTUPMrImZU9jROxlKpWw1okaCn52QrTW1BtofEXqS5sVEHtTK2f8k0aHZvuJJ73ZLI6tmc1R5Kj13tDer_JE09vXlgWbIrhhuiyd04PdixVhXR6URLMvaq1vOMhjEb5OPYiwOr8OKTEmmswzhRaU2A-Jhob-IOpHmvNRLhr3Ljp--9NAOWoFMas15oiacYRm0-IrRn',
    planName: 'Platinum Assisted (Double Charge)',
    amount: 16999,
    gstAmount: 2593,
    gateway: 'NetBanking',
    paymentMethod: 'HDFC NetBanking',
    timestamp: 'Today, 13:51 IST',
    status: 'Refund Pending'
  },
  {
    id: 'TXN-998409',
    invoiceId: 'INV-2024-8839',
    memberId: 'OPM-PUN-55610',
    memberName: 'Tanya Chopra',
    memberPhoto: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5iV19EFt5YpmH-aucK6fDMM1jc9d4dc-QteV3qu3Se7P1zpIt5AJ3dqVyU7xydb_S5m2B7ZqA65IEIgDxvfLeCmLyEi7iAxcy_OHONzKBoMu5i4Npais26OU2a2vcmY75J7ktGxzTGTKeGH7XQ-byla5kgQJZqGNhMQ4VELoJl_eWtx8xeTjeONZzFoI5UJ3CVpBdkRCEd9jJY2eYL_jN5OnKxKVrRu4hyv631_jcZKtb__gAaloX',
    planName: 'Self-Serve Gold (3 Months)',
    amount: 4999,
    gstAmount: 762,
    gateway: 'UPI',
    paymentMethod: 'PhonePe UPI',
    timestamp: 'Today, 13:12 IST',
    status: 'Paid'
  }
];

const initialChats: Record<string, ChatMessage[]> = {
  'chat-vikram': [
    {
      id: 'm1',
      chatId: 'chat-vikram',
      senderId: 'OPM-9821',
      senderName: 'Vikram Malhotra',
      text: 'Namaste Dr. Aditi, lovely connecting here. I reviewed your clinical research in cardiology at AIIMS—truly inspiring dedication.',
      timestamp: '10:14 AM',
      isRead: true
    },
    {
      id: 'm2',
      chatId: 'chat-vikram',
      senderId: 'current-user',
      senderName: 'You (Dr. Aditi)',
      text: 'Thank you Vikram! Your work in quantitative market architecture is fascinating as well. My parents mentioned your family had a warm chat yesterday evening.',
      timestamp: '10:18 AM',
      isRead: true
    },
    {
      id: 'm3',
      chatId: 'chat-vikram',
      senderId: 'OPM-9821',
      senderName: 'Vikram Malhotra',
      mediaType: 'view_once_image',
      mediaUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4u_n7kzHnk8lNpV3N-V7Aj4Lasvd8XrRpLbIjyEUXkRyweIMgglPP4j_saW_pMWLy_HDsp6zVRrPFZDBtxmzQ4wyjEjIDXMSVZnsttQWxkNawrkCekjSCDP3k-MJoYYZuTNPNPAUP6Nu0rUrBjBF2RxLmQMiMk_bsUk_WGF5ItZS-zxAvjcj3tiyFQTdgqFgp3e9VnkRA3AAusGBDJ6ZZ898QJG3V8kuf4Zjb6GxKAsovI6Lm6pq9',
      text: 'Family ceremonial celebration photo from Diwali.',
      timestamp: '10:22 AM',
      isRead: true
    },
    {
      id: 'm4',
      chatId: 'chat-vikram',
      senderId: 'current-user',
      senderName: 'You (Dr. Aditi)',
      mediaType: 'voice_note',
      duration: '0:42',
      text: 'Voice note: Sharing thoughts on weekend marathon routines and hospital schedules.',
      timestamp: '10:25 AM',
      isRead: true
    },
    {
      id: 'm5',
      chatId: 'chat-vikram',
      senderId: 'OPM-9821',
      senderName: 'Vikram Malhotra',
      text: 'Looking forward to our Sunday video session with parents joining later in the evening! I will share the auspicious Muhurat schedule beforehand.',
      timestamp: '10:29 AM',
      isRead: true
    }
  ]
};

let db = {
  profiles: initialProfiles,
  verificationQueue: initialVerificationQueue,
  fraudAlerts: initialFraudAlerts,
  supportTickets: initialSupportTickets,
  transactions: initialTransactions,
  chats: initialChats,
  settings: {
    metroZeroTrustLock: true,
    pHashDeduplication: true,
    dpdp2023AuditLogging: true,
    emergencyKillswitch: false,
    autoQuarantineThreshold: 85,
    outboundLinkSanitizer: true,
    i4cCrimeDbSync: true
  }
};

// Persistence helper
function saveToDisk() {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(db, null, 2));
  } catch (err) {
    console.error('Error saving database to disk:', err);
  }
}

function loadFromDisk() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf-8');
      db = JSON.parse(data);
    }
  } catch (err) {
    console.error('Error loading database from disk, using in-memory defaults:', err);
  }
}

loadFromDisk();

export const database = {
  getProfiles: (filters?: { search?: string; gender?: string; profession?: string; status?: string; minGunas?: number }) => {
    let result = db.profiles;
    if (filters?.gender) {
      result = result.filter(p => p.gender.toLowerCase() === filters.gender?.toLowerCase());
    }
    if (filters?.status) {
      result = result.filter(p => p.status === filters.status);
    }
    if (filters?.minGunas) {
      result = result.filter(p => p.horoscope.gunas >= (filters.minGunas || 0));
    }
    if (filters?.search) {
      const s = filters.search.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(s) ||
        p.profession.toLowerCase().includes(s) ||
        p.company.toLowerCase().includes(s) ||
        p.location.toLowerCase().includes(s) ||
        p.education.toLowerCase().includes(s) ||
        p.caste.toLowerCase().includes(s)
      );
    }
    return result;
  },

  getProfileById: (id: string) => {
    return db.profiles.find(p => p.id === id);
  },

  createProfile: (data: Partial<Profile>) => {
    const id = `OPM-${Math.floor(1000 + Math.random() * 9000)}`;
    const newProfile: Profile = {
      id,
      name: data.name || 'New Candidate',
      age: data.age || 28,
      gender: data.gender || 'male',
      photo: data.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
      gallery: data.gallery || [],
      profession: data.profession || 'Professional',
      company: data.company || 'Verified Firm',
      education: data.education || 'Postgraduate',
      college: data.college || 'Premier University',
      income: data.income || '₹30L+ CTC',
      location: data.location || 'New Delhi',
      city: data.city || 'New Delhi',
      height: data.height || "5' 8\"",
      religion: data.religion || 'Hindu',
      caste: data.caste || 'Open',
      motherTongue: data.motherTongue || 'Hindi',
      maritalStatus: data.maritalStatus || 'Never Married',
      diet: data.diet || 'Vegetarian',
      drink: data.drink || 'Never',
      smoke: data.smoke || 'Never',
      bio: data.bio || 'Curated profile looking for meaningful matrimonial connection.',
      verifiedBadges: {
        mobile: true,
        identity: true,
        education: true,
        professional: true
      },
      trustScore: 92,
      matchScore: 90,
      status: 'verified',
      phoneMasked: '+91 98••••••••',
      horoscope: data.horoscope || {
        rashi: 'Simha (Leo)',
        nakshatra: 'Magha',
        manglik: 'Non-Manglik',
        gotra: 'Kashyap',
        birthTime: '10:00 AM',
        birthPlace: 'New Delhi',
        gunas: 30
      },
      family: data.family || {
        type: 'Nuclear',
        values: 'Moderate',
        father: 'Senior Professional',
        mother: 'Homemaker',
        siblings: '1 Sibling',
        origin: 'Delhi NCR'
      }
    };
    db.profiles.unshift(newProfile);
    saveToDisk();
    return newProfile;
  },

  getVerificationQueue: () => db.verificationQueue,

  updateVerificationItem: (id: string, action: 'approved' | 'rejected' | 'doc_requested', notes?: string) => {
    const item = db.verificationQueue.find(v => v.id === id);
    if (item) {
      item.status = action;
      item.auditorNotes = notes || item.auditorNotes;
      // also update candidate status if approved
      if (action === 'approved') {
        const candidate = db.profiles.find(p => p.id === item.candidateId);
        if (candidate) {
          candidate.status = 'verified';
          candidate.trustScore = Math.min(100, candidate.trustScore + 5);
        }
      } else if (action === 'rejected') {
        const candidate = db.profiles.find(p => p.id === item.candidateId);
        if (candidate) candidate.status = 'rejected';
      }
      saveToDisk();
    }
    return item;
  },

  getFraudAlerts: () => db.fraudAlerts,

  resolveFraudAlert: (id: string, action: 'quarantined' | 'blocked' | 'dismissed') => {
    const alert = db.fraudAlerts.find(a => a.id === id);
    if (alert) {
      alert.status = action;
      const candidate = db.profiles.find(p => p.id === alert.candidateId);
      if (candidate) {
        if (action === 'blocked' || action === 'quarantined') {
          candidate.status = 'quarantined';
        }
      }
      saveToDisk();
    }
    return alert;
  },

  getSupportTickets: () => db.supportTickets,

  addSupportMessage: (ticketId: string, text: string, sender: 'agent' | 'member' = 'agent', senderName: string = 'Trust Officer') => {
    const ticket = db.supportTickets.find(t => t.id === ticketId);
    if (ticket) {
      ticket.messages.push({
        sender,
        senderName,
        text,
        timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
      });
      ticket.updatedAt = 'Just now';
      saveToDisk();
    }
    return ticket;
  },

  createSupportTicket: (data: Partial<SupportTicket>) => {
    const id = `TKT-${Math.floor(4000 + Math.random() * 900)}`;
    const newTicket: SupportTicket = {
      id,
      memberId: data.memberId || 'OPM-CURRENT',
      memberName: data.memberName || 'Candidate',
      memberPhoto: data.memberPhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
      tier: data.tier || 'VIP Platinum',
      subject: data.subject || 'Support Inquiry',
      category: data.category || 'General Support',
      slaMinutesRemaining: 30,
      priority: data.priority || 'High',
      status: 'open',
      updatedAt: 'Just now',
      assignedTo: 'Support Desk',
      messages: data.messages || [
        {
          sender: 'member',
          senderName: data.memberName || 'Candidate',
          text: data.subject || 'Inquiry created',
          timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
        }
      ]
    };
    db.supportTickets.unshift(newTicket);
    saveToDisk();
    return newTicket;
  },

  getTransactions: () => db.transactions,

  createTransaction: (data: Partial<Transaction>) => {
    const id = `TXN-${Math.floor(998000 + Math.random() * 900)}`;
    const invoiceId = `INV-2025-${Math.floor(8800 + Math.random() * 900)}`;
    const newTxn: Transaction = {
      id,
      invoiceId,
      memberId: data.memberId || 'OPM-USER',
      memberName: data.memberName || 'User Candidate',
      memberPhoto: data.memberPhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
      planName: data.planName || 'Executive Premium',
      amount: data.amount || 249,
      gstAmount: Math.round((data.amount || 249) * 0.18),
      gateway: data.gateway || 'UPI AutoPay',
      paymentMethod: data.paymentMethod || 'GooglePay',
      timestamp: 'Just now',
      status: 'Paid'
    };
    db.transactions.unshift(newTxn);
    saveToDisk();
    return newTxn;
  },

  processRefund: (id: string) => {
    const txn = db.transactions.find(t => t.id === id);
    if (txn) {
      txn.status = 'Refunded';
      saveToDisk();
    }
    return txn;
  },

  getChatMessages: (chatId: string) => {
    return db.chats[chatId] || [];
  },

  addChatMessage: (chatId: string, message: Partial<ChatMessage>) => {
    if (!db.chats[chatId]) {
      db.chats[chatId] = [];
    }
    const newMsg: ChatMessage = {
      id: `m_${Date.now()}`,
      chatId,
      senderId: message.senderId || 'current-user',
      senderName: message.senderName || 'You (Dr. Aditi)',
      text: message.text || '',
      mediaType: message.mediaType || 'text',
      mediaUrl: message.mediaUrl,
      duration: message.duration,
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      isRead: true
    };
    db.chats[chatId].push(newMsg);
    saveToDisk();
    return newMsg;
  },

  calculateKundaliMilan: (p1Id: string, p2Id: string) => {
    const p1 = db.profiles.find(p => p.id === p1Id) || db.profiles[0];
    const p2 = db.profiles.find(p => p.id === p2Id) || db.profiles[1];

    // Vedic 8 Kootas calculation
    const kootas = [
      { name: 'Varna', max: 1, scored: 1.0, meaning: 'Work & Spiritual Temperament' },
      { name: 'Vashya', max: 2, scored: 2.0, meaning: 'Mutual Magnetism & Emotional Balance' },
      { name: 'Tara', max: 3, scored: 3.0, meaning: 'Destiny, Health & Longevity' },
      { name: 'Yoni', max: 4, scored: 3.0, meaning: 'Biological Nature & Instinctive Harmony' },
      { name: 'Graha Maitri', max: 5, scored: 5.0, meaning: 'Psychological & Intellectual Friendship' },
      { name: 'Gana', max: 6, scored: 6.0, meaning: 'Social Temperament & Behaviour' },
      { name: 'Bhakoot', max: 7, scored: 4.0, meaning: 'Emotional Chemistry & Family Prosperity' },
      { name: 'Nadi', max: 8, scored: 8.0, meaning: 'Genetic Harmony & Progeny Lineage (Zero Dosha)' },
    ];
    const totalScore = kootas.reduce((acc, k) => acc + k.scored, 0);

    return {
      candidate1: { id: p1.id, name: p1.name, photo: p1.photo, rashi: p1.horoscope.rashi, nakshatra: p1.horoscope.nakshatra },
      candidate2: { id: p2.id, name: p2.name, photo: p2.photo, rashi: p2.horoscope.rashi, nakshatra: p2.horoscope.nakshatra },
      totalScore,
      maxScore: 36,
      percentage: Math.round((totalScore / 36) * 100),
      verdict: totalScore >= 28 ? 'Uttam Milan (Highly Auspicious)' : 'Madhyam Milan (Acceptable)',
      manglikStatus: `${p1.horoscope.manglik} & ${p2.horoscope.manglik} (Zero Friction)`,
      nadiDosha: 'Clean / No Nadi Dosha',
      kootas
    };
  },

  getStats: () => {
    return {
      activeSeekersOnline: 42850,
      verificationQueuePending: db.verificationQueue.filter(v => v.status === 'pending').length,
      verifiedCount: 184310,
      todayNewRegistrations: 1420,
      rejectedCount: 1240,
      reportedCount: db.fraudAlerts.length,
      quarantinedAccounts: 318,
      todayRevenue: 1842000,
      mrr: 4820000,
      arr: 57800000,
      csatScore: 4.85,
      slaAverageMinutes: 42,
      openTickets: db.supportTickets.filter(t => t.status !== 'resolved').length
    };
  },

  getSettings: () => db.settings,
  updateSettings: (newSettings: Partial<typeof db.settings>) => {
    db.settings = { ...db.settings, ...newSettings };
    saveToDisk();
    return db.settings;
  }
};
