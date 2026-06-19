import { FC, useState } from 'react';

interface ProfileTemplateProps {
  userName?: string;
  userEmail?: string;
  memberSince?: string;
}

const Section: FC<{
  title: string;
  desc?: string;
  children?: React.ReactNode;
}> = ({ title, desc, children }) => (
  <div className="card bg-base-200 border-base-300 border">
    <div className="card-body p-6">
      <h2 className="mb-1 font-serif text-lg font-bold">{title}</h2>
      {desc && (
        <p className="text-base-content/50 mb-5 text-sm leading-relaxed">
          {desc}
        </p>
      )}
      {children}
    </div>
  </div>
);

export const ProfileTemplate: FC<ProfileTemplateProps> = ({
  userName = 'Guest User',
  userEmail = 'guest@example.com',
  memberSince = 'January 2024',
}) => {
  const [name, setName] = useState(userName);
  const [email, setEmail] = useState(userEmail);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [notifications, setNotifications] = useState({
    email: true,
    weekly: true,
    product: false,
  });

  const initials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <div
      className="bg-base-100 text-base-content min-h-screen font-sans"
      data-theme="luxury">
      {/* Nav */}
      <div className="navbar bg-base-100/85 border-base-300 sticky top-0 z-50 min-h-[60px] border-b px-4 backdrop-blur-xl lg:px-12">
        <div className="navbar-start">
          <a
            href="/"
            className="text-primary font-serif text-2xl font-bold tracking-widest">
            Forma
          </a>
        </div>
        <div className="navbar-end">
          <a href="/" className="btn btn-ghost btn-sm">
            Home
          </a>
        </div>
      </div>

      <main className="mx-auto max-w-2xl px-4 py-12 lg:px-8">
        {/* Page heading */}
        <div className="mb-10 flex items-center gap-5">
          <div className="bg-primary/20 text-primary flex h-16 w-16 items-center justify-center rounded-full text-xl font-bold">
            {initials}
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{userName}</h1>
            <p className="text-base-content/50 text-sm">{userEmail}</p>
            <p className="text-base-content/40 mt-0.5 text-xs">
              Member since {memberSince}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {/* Account settings */}
          <Section
            title="Account settings"
            desc="Update your name and email address.">
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base-content/50 text-xs">
                    Name
                  </span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base-content/50 text-xs">
                    Email
                  </span>
                </label>
                <input
                  type="email"
                  className="input input-bordered w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <button className="btn btn-primary btn-sm">Save changes</button>
          </Section>

          {/* Password */}
          <Section
            title="Change password"
            desc="Set a new password for your account.">
            <div className="mb-4 flex flex-col gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base-content/50 text-xs">
                    Current password
                  </span>
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="input input-bordered w-full"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-base-content/50 text-xs">
                      New password
                    </span>
                  </label>
                  <input
                    type="password"
                    placeholder="At least 8 characters"
                    className="input input-bordered w-full"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-base-content/50 text-xs">
                      Confirm
                    </span>
                  </label>
                  <input
                    type="password"
                    placeholder="Repeat password"
                    className="input input-bordered w-full"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <button className="btn btn-primary btn-sm">Update password</button>
          </Section>

          {/* Notifications */}
          <Section
            title="Notifications"
            desc="Choose what updates you receive.">
            <div className="flex flex-col gap-3">
              {[
                {
                  key: 'email' as const,
                  label: 'Send email notifications',
                  desc: 'Get notified via email for important updates.',
                },
                {
                  key: 'weekly' as const,
                  label: 'Weekly digest',
                  desc: 'Receive a weekly summary of your activity.',
                },
                {
                  key: 'product' as const,
                  label: 'Product updates',
                  desc: 'Learn about new features and improvements.',
                },
              ].map(({ key, label, desc: itemDesc }) => (
                <label
                  key={key}
                  className="flex cursor-pointer items-start gap-3 text-sm">
                  <input
                    type="checkbox"
                    checked={notifications[key]}
                    onChange={(e) =>
                      setNotifications((prev) => ({
                        ...prev,
                        [key]: e.target.checked,
                      }))
                    }
                    className="checkbox checkbox-primary checkbox-sm mt-0.5"
                  />
                  <div>
                    <p className="font-medium">{label}</p>
                    <p className="text-base-content/40 text-xs">{itemDesc}</p>
                  </div>
                </label>
              ))}
            </div>
          </Section>

          {/* Danger zone */}
          <Section
            title="Danger zone"
            desc="Irreversible actions for your account.">
            <p className="text-base-content/50 mb-4 text-sm leading-relaxed">
              Once you delete your account, there is no going back. Please be
              certain.
            </p>
            <button className="btn btn-error btn-sm">Delete account</button>
          </Section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-base-300 border-t py-12 text-center">
        <p className="text-primary mb-3 font-serif text-2xl font-bold tracking-widest">
          Forma
        </p>
        <p className="text-base-content/30 text-sm">
          &copy; 2026 &middot; Built with care
        </p>
      </footer>
    </div>
  );
};

ProfileTemplate.displayName = 'ProfileTemplate';
