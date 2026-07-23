'use client';

import { useState } from 'react';
import { DashboardTemplate } from '@/components/templates';
import {
  QRCodeActions,
  QuickPayForm,
  QRCodeModal,
} from '@/components/molecules';
import { useToast } from '@/providers/ToastProvider';

const PayPage = () => {
  const { showToast } = useToast();
  const [amount, setAmount] = useState('');
  const [showQR, setShowQR] = useState(false);

  console.log('[PayPage] render');

  return (
    <DashboardTemplate>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold">Pay</h1>
          <p className="text-base-content/60">Quick payments</p>
        </div>

        <QRCodeActions
          onShowQR={() => setShowQR(true)}
          onScan={(result) => {
            console.log('[PayPage] scanned', { result });
            showToast('QR code scanned successfully!', 'success');
          }}
        />

        <QuickPayForm
          amount={amount}
          onAmountChange={setAmount}
          onSubmit={() => {
            console.log('[PayPage] quickPay', { amount });
            showToast('Payment sent!', 'success');
          }}
        />

        <QRCodeModal open={showQR} onClose={() => setShowQR(false)} />
      </div>
    </DashboardTemplate>
  );
};

export default PayPage;
