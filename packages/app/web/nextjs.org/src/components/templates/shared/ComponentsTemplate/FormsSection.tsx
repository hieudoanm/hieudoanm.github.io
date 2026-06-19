import { Section } from './Section';

export const FormsSection = () => (
  <Section
    id="forms"
    label="Form controls"
    title="Forms that don't frustrate"
    sub="Validation states, accessible labels, and composable field groups — all wired up and ready to go.">
    <div className="grid grid-cols-2 gap-10">
      <div>
        <div className="mb-5 grid grid-cols-2 gap-5">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-base-content/50 text-xs">
                First name
              </span>
            </label>
            <input
              type="text"
              placeholder="Jane"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-base-content/50 text-xs">
                Last name
              </span>
            </label>
            <input
              type="text"
              placeholder="Doe"
              className="input input-bordered w-full"
            />
          </div>
        </div>
        <div className="form-control mb-5">
          <label className="label">
            <span className="label-text text-base-content/50 text-xs">
              Email address
            </span>
          </label>
          <input
            type="email"
            placeholder="jane@forma.io"
            className="input input-bordered w-full"
          />
          <label className="label">
            <span className="label-text-alt text-base-content/40">
              We&apos;ll never share your email.
            </span>
          </label>
        </div>
        <div className="form-control mb-5">
          <label className="label">
            <span className="label-text text-base-content/50 text-xs">
              Invalid input
            </span>
          </label>
          <input
            type="text"
            defaultValue="bad-email@"
            className="input input-bordered input-error w-full"
          />
          <label className="label">
            <span className="label-text-alt text-error">
              Please enter a valid email address.
            </span>
          </label>
        </div>
        <div className="form-control mb-5">
          <label className="label">
            <span className="label-text text-base-content/50 text-xs">
              Role
            </span>
          </label>
          <select className="select select-bordered w-full">
            <option>Designer</option>
            <option>Engineer</option>
            <option>Product manager</option>
          </select>
        </div>
        <div className="form-control mb-5">
          <label className="label">
            <span className="label-text text-base-content/50 text-xs">
              Experience (years)
            </span>
          </label>
          <input
            type="range"
            min="0"
            max="20"
            defaultValue="5"
            className="range range-primary range-sm"
          />
        </div>
        <button className="btn btn-primary w-full">Submit</button>
      </div>
      <div>
        <p className="text-base-content/50 mb-4 text-sm">
          Toggles, checkboxes &amp; radios
        </p>
        <div className="mb-6 flex flex-col gap-3">
          {['Send email notifications', 'Weekly digest', 'Product updates'].map(
            (label, i) => (
              <label
                key={label}
                className="flex cursor-pointer items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  defaultChecked={i !== 1}
                  className="checkbox checkbox-primary checkbox-sm"
                />
                {label}
              </label>
            )
          )}
        </div>
        <div className="mb-6 flex flex-col gap-3">
          {['Monthly billing', 'Annual billing (save 20%)', 'Enterprise'].map(
            (label, i) => (
              <label
                key={label}
                className="flex cursor-pointer items-center gap-3 text-sm">
                <input
                  type="radio"
                  name="plan"
                  defaultChecked={i === 0}
                  className="radio radio-primary radio-sm"
                />
                {label}
              </label>
            )
          )}
        </div>
        <div className="flex flex-col gap-3">
          {[
            { label: 'Dark mode', checked: true },
            { label: 'Auto-save', checked: true },
            { label: 'Beta features', checked: false },
          ].map(({ label, checked }) => (
            <label
              key={label}
              className="flex cursor-pointer items-center gap-3 text-sm">
              <input
                type="checkbox"
                defaultChecked={checked}
                className="toggle toggle-primary toggle-sm"
              />
              {label}
            </label>
          ))}
        </div>
      </div>
    </div>
  </Section>
);
