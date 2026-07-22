'use client';

import Link from 'next/link';
import { DashboardTemplate } from '@/components/templates';
import {
  FiArrowLeft,
  FiMail,
  FiMessageCircle,
  FiHelpCircle,
  FiBookOpen,
  FiPhone,
} from 'react-icons/fi';

const faqs = [
  {
    q: 'How do I add a new account?',
    a: 'Go to Accounts and tap "Add Account". Follow the prompts to enter your account details.',
  },
  {
    q: 'How do I transfer money?',
    a: 'Navigate to Transfer, select the source account, enter the recipient and amount, then confirm.',
  },
  {
    q: 'Can I freeze my card?',
    a: 'Yes. Go to Cards, select the card, and tap "Freeze Card" to temporarily disable it.',
  },
  {
    q: 'How do I change the app theme?',
    a: 'Go to Profile and use the Theme Picker to choose from 59 available themes.',
  },
  {
    q: 'Is my financial data secure?',
    a: 'All data is stored locally on your device. Nothing is transmitted to external servers.',
  },
];

const contactOptions = [
  {
    icon: <FiMail />,
    title: 'Email Support',
    description: 'support@wallet.example.com',
    detail: 'Response within 24 hours',
  },
  {
    icon: <FiMessageCircle />,
    title: 'Live Chat',
    description: 'Available Mon–Fri, 9 AM – 6 PM EST',
    detail: 'Start a conversation',
  },
  {
    icon: <FiPhone />,
    title: 'Phone Support',
    description: '+1 (555) 999-0000',
    detail: 'Mon–Fri, 9 AM – 5 PM EST',
  },
];

export default function HelpSupportPage() {
  return (
    <DashboardTemplate>
      <div className="mx-auto max-w-3xl">
        <Link
          href="/profile"
          className="text-base-content/60 mb-4 inline-flex items-center gap-1 text-sm hover:underline">
          <FiArrowLeft /> Back to Profile
        </Link>

        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-2xl font-bold">Help & Support</h1>
            <p className="text-base-content/60">
              Get help with your Wallet app
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {contactOptions.map((option) => (
              <div key={option.title} className="card bg-base-200 shadow-md">
                <div className="card-body items-center text-center">
                  <span className="text-primary text-2xl">{option.icon}</span>
                  <h3 className="card-title text-sm">{option.title}</h3>
                  <p className="text-base-content/60 text-xs">
                    {option.description}
                  </p>
                  <p className="text-primary text-xs">{option.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="card bg-base-200 shadow-md">
            <div className="card-body">
              <div className="flex items-center gap-2">
                <FiHelpCircle className="text-primary" />
                <h2 className="card-title text-lg">
                  Frequently Asked Questions
                </h2>
              </div>

              <div className="divide-base-300 mt-2 divide-y">
                {faqs.map((faq) => (
                  <div key={faq.q} className="py-3">
                    <p className="font-medium">{faq.q}</p>
                    <p className="text-base-content/60 mt-1 text-sm">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card bg-base-200 shadow-md">
            <div className="card-body">
              <div className="flex items-center gap-2">
                <FiBookOpen className="text-primary" />
                <h2 className="card-title text-lg">Resources</h2>
              </div>

              <div className="divide-base-300 mt-2 divide-y">
                <button className="flex items-center justify-between py-3">
                  <span>User Guide</span>
                  <span className="text-base-content/60">›</span>
                </button>
                <button className="flex items-center justify-between py-3">
                  <span>Video Tutorials</span>
                  <span className="text-base-content/60">›</span>
                </button>
                <button className="flex items-center justify-between py-3">
                  <span>Community Forum</span>
                  <span className="text-base-content/60">›</span>
                </button>
                <button className="flex items-center justify-between py-3">
                  <span>Report a Bug</span>
                  <span className="text-base-content/60">›</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardTemplate>
  );
}
