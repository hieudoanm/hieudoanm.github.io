'use client';

import { DashboardTemplate } from '@/components/templates';
import Skeleton, { SkeletonText } from '@/components/atoms/Skeleton';
import { useData } from '@/providers/DataProvider';
import { formatCurrency, formatDate } from '@/utils/format';
import {
  FiCheckCircle,
  FiClock,
  FiXCircle,
  FiArrowUpRight,
  FiArrowDownLeft,
} from 'react-icons/fi';

const PaymentRequestsPage = () => {
  const { paymentRequests, contacts, loading } = useData();

  console.log('[PaymentRequestsPage] render', {
    loading,
    count: paymentRequests.length,
  });

  if (loading) {
    return (
      <DashboardTemplate>
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <SkeletonText className="h-7 w-1/4" />
            <SkeletonText className="w-1/3" />
          </div>
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-20 w-full rounded-lg" />
            ))}
          </div>
        </div>
      </DashboardTemplate>
    );
  }

  const getContactName = (id: string): string => {
    if (id === '0') return 'You';
    return contacts.find((c) => c.id === id)?.name ?? 'Unknown';
  };

  const statusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <FiCheckCircle className="text-success text-lg" />;
      case 'pending':
        return <FiClock className="text-warning text-lg" />;
      case 'failed':
        return <FiXCircle className="text-error text-lg" />;
      default:
        return null;
    }
  };

  const statusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <span className="badge badge-success badge-sm">Completed</span>;
      case 'pending':
        return <span className="badge badge-warning badge-sm">Pending</span>;
      case 'failed':
        return <span className="badge badge-error badge-sm">Failed</span>;
      default:
        return null;
    }
  };

  const incoming = paymentRequests.filter((r) => r.toContactId === '0');
  const outgoing = paymentRequests.filter((r) => r.fromContactId === '0');

  return (
    <DashboardTemplate>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold">Payment Requests</h1>
          <p className="text-base-content/60">
            Manage incoming and outgoing payment requests
          </p>
        </div>

        {incoming.length > 0 && (
          <div>
            <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold">
              <FiArrowDownLeft className="text-success" />
              Incoming ({incoming.length})
            </h2>
            <div className="flex flex-col gap-2">
              {incoming.map((req) => (
                <div key={req.id} className="card bg-base-200 shadow-sm">
                  <div className="card-body flex-row items-center gap-3 p-3">
                    {statusIcon(req.status)}
                    <div className="flex-1">
                      <span className="font-medium">
                        {getContactName(req.fromContactId)}
                      </span>
                      <div className="text-base-content/60 text-sm">
                        {req.note || 'No note'} · {formatDate(req.date)}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-primary font-bold">
                        {formatCurrency(req.amount)}
                      </span>
                      <div>{statusBadge(req.status)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {outgoing.length > 0 && (
          <div>
            <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold">
              <FiArrowUpRight className="text-primary" />
              Outgoing ({outgoing.length})
            </h2>
            <div className="flex flex-col gap-2">
              {outgoing.map((req) => (
                <div key={req.id} className="card bg-base-200 shadow-sm">
                  <div className="card-body flex-row items-center gap-3 p-3">
                    {statusIcon(req.status)}
                    <div className="flex-1">
                      <span className="font-medium">
                        To {getContactName(req.toContactId)}
                      </span>
                      <div className="text-base-content/60 text-sm">
                        {req.note || 'No note'} · {formatDate(req.date)}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-bold">
                        -{formatCurrency(req.amount)}
                      </span>
                      <div>{statusBadge(req.status)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {paymentRequests.length === 0 && (
          <div className="py-12 text-center">
            <FiArrowUpRight className="text-base-content/30 mx-auto mb-3 text-4xl" />
            <p className="text-base-content/60">No payment requests</p>
            <p className="text-base-content/40 text-sm">
              Payment requests will appear here
            </p>
          </div>
        )}
      </div>
    </DashboardTemplate>
  );
};

export default PaymentRequestsPage;
