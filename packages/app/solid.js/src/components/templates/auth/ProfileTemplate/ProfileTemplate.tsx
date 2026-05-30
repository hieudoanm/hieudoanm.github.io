import { createSignal, type JSX } from 'solid-js';

interface ProfileTemplateProps {
  userName?: string;
  userEmail?: string;
  memberSince?: string;
}

const Section = (props: {
  title: string;
  desc?: string;
  children?: JSX.Element;
}) => (
  <div class="card bg-base-200 border-base-300 border">
    <div class="card-body p-6">
      <h2 class="mb-1 font-serif text-lg font-bold">{props.title}</h2>
      {props.desc && (
        <p class="text-base-content/50 mb-5 text-sm leading-relaxed">
          {props.desc}
        </p>
      )}
      {props.children}
    </div>
  </div>
);

export const ProfileTemplate = (props: ProfileTemplateProps) => {
  const [name, setName] = createSignal(props.userName || 'Guest User');
  const [email, setEmail] = createSignal(
    props.userEmail || 'guest@example.com'
  );
  const [currentPassword, setCurrentPassword] = createSignal('');
  const [newPassword, setNewPassword] = createSignal('');
  const [confirmPassword, setConfirmPassword] = createSignal('');
  const [notifications, setNotifications] = createSignal({
    email: true,
    weekly: true,
    product: false,
  });

  const initials = (props.userName || 'Guest User')
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  const toggleNotification = (key: 'email' | 'weekly' | 'product') => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div
      class="bg-base-100 text-base-content min-h-screen font-sans"
      data-theme="luxury">
      {/* Nav */}
      <div class="navbar bg-base-100/85 border-base-300 sticky top-0 z-50 min-h-[60px] border-b px-4 backdrop-blur-xl lg:px-12">
        <div class="navbar-start">
          <a
            href="/"
            class="text-primary font-serif text-2xl font-bold tracking-widest">
            Forma
          </a>
        </div>
        <div class="navbar-end">
          <a href="/" class="btn btn-ghost btn-sm">
            Home
          </a>
        </div>
      </div>

      <main class="mx-auto max-w-2xl px-4 py-12 lg:px-8">
        {/* Page heading */}
        <div class="mb-10 flex items-center gap-5">
          <div class="bg-primary/20 text-primary flex h-16 w-16 items-center justify-center rounded-full text-xl font-bold">
            {initials}
          </div>
          <div>
            <h1 class="text-2xl font-bold tracking-tight">
              {props.userName || 'Guest User'}
            </h1>
            <p class="text-base-content/50 text-sm">
              {props.userEmail || 'guest@example.com'}
            </p>
            <p class="text-base-content/40 mt-0.5 text-xs">
              Member since {props.memberSince || 'January 2024'}
            </p>
          </div>
        </div>

        <div class="flex flex-col gap-6">
          {/* Account settings */}
          <Section
            title="Account settings"
            desc="Update your name and email address.">
            <div class="mb-4 grid grid-cols-2 gap-4">
              <div class="form-control">
                <label class="label">
                  <span class="label-text text-base-content/50 text-xs">
                    Name
                  </span>
                </label>
                <input
                  type="text"
                  class="input input-bordered w-full"
                  value={name()}
                  onInput={(e) => setName((e.target as HTMLInputElement).value)}
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text text-base-content/50 text-xs">
                    Email
                  </span>
                </label>
                <input
                  type="email"
                  class="input input-bordered w-full"
                  value={email()}
                  onInput={(e) =>
                    setEmail((e.target as HTMLInputElement).value)
                  }
                />
              </div>
            </div>
            <button class="btn btn-primary btn-sm">Save changes</button>
          </Section>

          {/* Password */}
          <Section
            title="Change password"
            desc="Set a new password for your account.">
            <div class="mb-4 flex flex-col gap-4">
              <div class="form-control">
                <label class="label">
                  <span class="label-text text-base-content/50 text-xs">
                    Current password
                  </span>
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  class="input input-bordered w-full"
                  value={currentPassword()}
                  onInput={(e) =>
                    setCurrentPassword((e.target as HTMLInputElement).value)
                  }
                />
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div class="form-control">
                  <label class="label">
                    <span class="label-text text-base-content/50 text-xs">
                      New password
                    </span>
                  </label>
                  <input
                    type="password"
                    placeholder="At least 8 characters"
                    class="input input-bordered w-full"
                    value={newPassword()}
                    onInput={(e) =>
                      setNewPassword((e.target as HTMLInputElement).value)
                    }
                  />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text text-base-content/50 text-xs">
                      Confirm
                    </span>
                  </label>
                  <input
                    type="password"
                    placeholder="Repeat password"
                    class="input input-bordered w-full"
                    value={confirmPassword()}
                    onInput={(e) =>
                      setConfirmPassword((e.target as HTMLInputElement).value)
                    }
                  />
                </div>
              </div>
            </div>
            <button class="btn btn-primary btn-sm">Update password</button>
          </Section>

          {/* Notifications */}
          <Section
            title="Notifications"
            desc="Choose what updates you receive.">
            <div class="flex flex-col gap-3">
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
                <label class="flex cursor-pointer items-start gap-3 text-sm">
                  <input
                    type="checkbox"
                    checked={notifications()[key]}
                    onChange={() => toggleNotification(key)}
                    class="checkbox checkbox-primary checkbox-sm mt-0.5"
                  />
                  <div>
                    <p class="font-medium">{label}</p>
                    <p class="text-base-content/40 text-xs">{itemDesc}</p>
                  </div>
                </label>
              ))}
            </div>
          </Section>

          {/* Danger zone */}
          <Section
            title="Danger zone"
            desc="Irreversible actions for your account.">
            <p class="text-base-content/50 mb-4 text-sm leading-relaxed">
              Once you delete your account, there is no going back. Please be
              certain.
            </p>
            <button class="btn btn-error btn-sm">Delete account</button>
          </Section>
        </div>
      </main>

      {/* Footer */}
      <footer class="border-base-300 border-t py-12 text-center">
        <p class="text-primary mb-3 font-serif text-2xl font-bold tracking-widest">
          Forma
        </p>
        <p class="text-base-content/30 text-sm">
          &copy; 2026 &middot; Built with care
        </p>
      </footer>
    </div>
  );
};
