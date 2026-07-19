'use client';

import { useState } from 'react';
import { DashboardTemplate } from '@/components/templates';
import { ContactList } from '@/components/molecules';
import Skeleton, { SkeletonText } from '@/components/atoms/Skeleton';
import { useData } from '@/providers/DataProvider';
import { useToast } from '@/providers/ToastProvider';
import { FiPlus, FiX } from 'react-icons/fi';
import type { Contact } from '@/types';

const ContactsPage = () => {
  const { contacts, addContact, loading } = useData();
  const { showToast } = useToast();

  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  console.log('[ContactsPage] render', { loading, count: contacts.length });

  if (loading) {
    return (
      <DashboardTemplate>
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <SkeletonText className="h-7 w-1/4" />
            <SkeletonText className="w-1/3" />
          </div>
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full rounded-lg" />
            ))}
          </div>
        </div>
      </DashboardTemplate>
    );
  }

  const handleAdd = async () => {
    if (!name.trim() || !email.trim()) return;

    const newContact: Contact = {
      id: String(Date.now()),
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      avatar: '',
      frequentlyUsed: false,
    };

    await addContact(newContact);
    showToast('Contact added!', 'success');
    setName('');
    setEmail('');
    setPhone('');
    setShowForm(false);
  };

  return (
    <DashboardTemplate>
      <div className="flex flex-col gap-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold">Contacts</h1>
            <p className="text-base-content/60">Manage your payment contacts</p>
          </div>
          <button
            className="btn btn-primary btn-sm gap-1"
            onClick={() => setShowForm(!showForm)}>
            {showForm ? <FiX /> : <FiPlus />}
            {showForm ? 'Cancel' : 'Add Contact'}
          </button>
        </div>

        {showForm && (
          <div className="card bg-base-200 shadow-md">
            <div className="card-body gap-3">
              <h3 className="card-title text-lg">New Contact</h3>
              <label className="floating-label">
                <span>Name</span>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </label>
              <label className="floating-label">
                <span>Email</span>
                <input
                  type="email"
                  className="input input-bordered w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
              <label className="floating-label">
                <span>Phone (optional)</span>
                <input
                  type="tel"
                  className="input input-bordered w-full"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </label>
              <button
                className="btn btn-primary w-full"
                disabled={!name.trim() || !email.trim()}
                onClick={handleAdd}>
                Add Contact
              </button>
            </div>
          </div>
        )}

        <ContactList contacts={contacts} />
      </div>
    </DashboardTemplate>
  );
};

export default ContactsPage;
