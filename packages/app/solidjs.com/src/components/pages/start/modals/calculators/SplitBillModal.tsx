import { formatCurrency } from '@lodashx/ts';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import html2canvas from 'html2canvas-pro';
import { createSignal, createMemo } from 'solid-js';

const CURRENCIES = [
  'VND',
  'USD',
  'EUR',
  'GBP',
  'JPY',
  'KRW',
  'THB',
  'ILS',
  'INR',
  'AUD',
  'CAD',
  'SGD',
];

type Settlement = {
  from: string;
  to: string;
  amount: number;
};

type PersonRow = {
  name: string;
  paid: number;
  owes: number;
};

const calculateSettlements = (persons: PersonRow[]): Settlement[] => {
  const net = persons.map((p) => ({
    name: p.name.trim(),
    net: (p.paid || 0) - (p.owes || 0),
  }));

  const creditors = net.filter((n) => n.net > 0).sort((a, b) => b.net - a.net);
  const debtors = net.filter((n) => n.net < 0).sort((a, b) => a.net - b.net);

  const settlements: Settlement[] = [];
  let i = 0;
  let j = 0;

  while (i < debtors.length && j < creditors.length) {
    const debtor = debtors[i];
    const creditor = creditors[j];
    const amount = Math.min(-debtor.net, creditor.net);

    settlements.push({ from: debtor.name, to: creditor.name, amount });

    debtor.net += amount;
    creditor.net -= amount;

    if (debtor.net === 0) i++;
    if (creditor.net === 0) j++;
  }

  return settlements;
};

export const SplitBillModal = (props: { onClose: () => void }) => {
  const [tab, setTab] = createSignal<'equal' | 'settle'>('equal');

  const [bill, setBill] = createSignal(100);
  const [people, setPeople] = createSignal(2);
  const [tip, setTip] = createSignal(10);
  const [tax, setTax] = createSignal(0);

  const [currency, setCurrency] = createSignal(CURRENCIES[0]);

  const [persons, setPersons] = createSignal<PersonRow[]>([
    { name: 'Alice', paid: 100, owes: 25 },
    { name: 'Bob', paid: 0, owes: 40 },
    { name: 'Carol', paid: 0, owes: 35 },
  ]);

  const [splitEqually, setSplitEqually] = createSignal(true);
  const [settlements, setSettlements] = createSignal<Settlement[] | null>(null);
  const [capturing, setCapturing] = createSignal(false);

  let captureRef: HTMLDivElement | undefined;

  const eqResult = createMemo(() => {
    const tipAmount = bill() * (tip() / 100);
    const taxAmount = bill() * (tax() / 100);
    const total = bill() + tipAmount + taxAmount;
    return { tipAmount, taxAmount, total, perPerson: total / people() };
  });

  const totalPaid = createMemo(() =>
    persons().reduce((s, p) => s + (p.paid || 0), 0)
  );

  const equalShare = createMemo(() => totalPaid() / (persons().length || 1));

  const computedPersons = createMemo(() =>
    splitEqually()
      ? persons().map((p) => ({ ...p, owes: equalShare() }))
      : persons()
  );

  const computedTotalOwes = createMemo(() =>
    computedPersons().reduce((s, p) => s + (p.owes || 0), 0)
  );

  const updatePerson = (
    index: number,
    field: keyof PersonRow,
    value: string
  ) => {
    setSettlements(null);
    setPersons((prev) => {
      const copy = prev.map((p) => ({ ...p }));
      if (field === 'name') {
        copy[index].name = value;
      } else {
        copy[index][field] = Number.parseFloat(value) || 0;
      }
      return copy;
    });
  };

  const addPerson = () => {
    setSettlements(null);
    setPersons((prev) => [...prev, { name: '', paid: 0, owes: 0 }]);
  };

  const removePerson = (index: number) => {
    setSettlements(null);
    setPersons((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSettle = () => {
    setSettlements(calculateSettlements(computedPersons()));
  };

  const handleDownload = async () => {
    if (!captureRef) return;
    setCapturing(true);
    await new Promise((r) => requestAnimationFrame(r));
    try {
      const canvas = await html2canvas(captureRef, {
        scale: 2,
        useCORS: true,
      });
      const dataURL = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = 'split-bill.png';
      link.click();
      link.remove();
    } finally {
      setCapturing(false);
    }
  };

  const handleCopy = async () => {
    if (!captureRef) return;
    setCapturing(true);
    await new Promise((r) => requestAnimationFrame(r));
    try {
      const canvas = await html2canvas(captureRef, {
        scale: 2,
        useCORS: true,
      });
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        try {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob }),
          ]);
        } catch {
          /* fallback */ null;
        }
        setCapturing(false);
      });
    } catch {
      setCapturing(false);
    }
  };

  return (
    <ModalWrapper onClose={props.onClose} title="Split Bill" size="max-w-lg">
      <div role="tablist" class="tabs tabs-boxed mb-4 w-full">
        <button
          role="tab"
          class={`tab flex-1 ${tab() === 'equal' ? 'tab-active' : ''}`}
          onClick={() => setTab('equal')}>
          Equal Split
        </button>
        <button
          role="tab"
          class={`tab flex-1 ${tab() === 'settle' ? 'tab-active' : ''}`}
          onClick={() => {
            setTab('settle');
          }}>
          Who Owes Who
        </button>
      </div>

      <div
        ref={captureRef}
        class={`space-y-3 ${capturing() ? 'relative' : ''}`}>
        {capturing() && (
          <div class="bg-base-100/80 absolute inset-0 z-10 flex items-center justify-center">
            <span class="loading loading-spinner loading-md" />
          </div>
        )}

        {tab() === 'equal' && (
          <>
            <div class="form-control">
              <label for="total-bill" class="label mb-1 p-0">
                <span class="label-text text-xs font-medium opacity-70">
                  Total Bill
                </span>
              </label>
              <input
                id="total-bill"
                type="number"
                class="input input-sm input-bordered w-full text-right"
                value={bill()}
                min={0}
                step={0.01}
                onChange={(e: Event) =>
                  setBill(
                    Number.parseFloat((e.target as HTMLInputElement).value) || 0
                  )
                }
              />
            </div>

            <div class="form-control">
              <label for="number-of-people" class="label mb-1 p-0">
                <span class="label-text text-xs font-medium opacity-70">
                  Number of People
                </span>
              </label>
              <input
                id="number-of-people"
                type="number"
                class="input input-sm input-bordered w-full text-right"
                value={people()}
                min={1}
                onChange={(e: Event) =>
                  setPeople(
                    Math.max(
                      1,
                      Number.parseInt(
                        (e.target as HTMLInputElement).value,
                        10
                      ) || 1
                    )
                  )
                }
              />
            </div>

            <div class="form-control">
              <label for="tip" class="label mb-1 p-0">
                <span class="label-text text-xs font-medium opacity-70">
                  Tip (%)
                </span>
              </label>
              <input
                id="tip"
                type="number"
                class="input input-sm input-bordered w-full text-right"
                value={tip()}
                min={0}
                step={0.5}
                onChange={(e: Event) =>
                  setTip(
                    Number.parseFloat((e.target as HTMLInputElement).value) || 0
                  )
                }
              />
            </div>

            <div class="form-control">
              <label for="tax" class="label mb-1 p-0">
                <span class="label-text text-xs font-medium opacity-70">
                  Tax (%)
                </span>
              </label>
              <input
                id="tax"
                type="number"
                class="input input-sm input-bordered w-full text-right"
                value={tax()}
                min={0}
                step={0.5}
                onChange={(e: Event) =>
                  setTax(
                    Number.parseFloat((e.target as HTMLInputElement).value) || 0
                  )
                }
              />
            </div>

            <div class="bg-base-200 mt-4 space-y-2 rounded-xl p-3">
              <div class="flex items-center justify-between">
                <span class="text-xs opacity-70">Tip Amount</span>
                <span class="text-sm font-bold">
                  {formatCurrency(eqResult().tipAmount, currency())}
                </span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-xs opacity-70">Tax Amount</span>
                <span class="text-sm font-bold">
                  {formatCurrency(eqResult().taxAmount, currency())}
                </span>
              </div>
              <div class="divider my-1" />
              <div class="flex items-center justify-between">
                <span class="text-xs opacity-70">Total</span>
                <span class="text-sm font-bold">
                  {formatCurrency(eqResult().total, currency())}
                </span>
              </div>
              <div class="divider my-1" />
              <div class="flex items-center justify-between">
                <span class="text-xs font-semibold">Per Person</span>
                <span class="text-lg font-black">
                  {formatCurrency(eqResult().perPerson, currency())}
                </span>
              </div>
            </div>
          </>
        )}

        {tab() === 'settle' && (
          <>
            <p class="text-xs opacity-60">
              Enter what each person paid. The calculator figures out who owes
              whom to settle up.
            </p>

            <label class="flex items-center gap-2 text-xs">
              <input
                type="checkbox"
                class="toggle toggle-xs"
                checked={splitEqually()}
                onChange={() => {
                  setSplitEqually((p) => !p);
                  setSettlements(null);
                }}
              />
              Split equally — auto-fill owes as{' '}
              {formatCurrency(equalShare(), currency())} each
            </label>

            <div class="max-h-44 space-y-2 overflow-y-auto pr-1">
              {computedPersons().map((p, i) => (
                <div key={i} class="flex items-center gap-1.5">
                  <input
                    type="text"
                    placeholder="Name"
                    class="input input-sm input-bordered w-28"
                    value={p.name}
                    onChange={(e: Event) =>
                      updatePerson(
                        i,
                        'name',
                        (e.target as HTMLInputElement).value
                      )
                    }
                  />
                  <input
                    type="number"
                    placeholder="Paid"
                    class="input input-sm input-bordered w-28 text-right"
                    value={p.paid || ''}
                    min={0}
                    step={0.01}
                    onChange={(e: Event) =>
                      updatePerson(
                        i,
                        'paid',
                        (e.target as HTMLInputElement).value
                      )
                    }
                  />
                  <span class="text-xs opacity-50">/</span>
                  {splitEqually() ? (
                    <span class="bg-base-200 flex h-8 w-28 items-center justify-end rounded-md px-2 text-sm font-bold opacity-80">
                      {formatCurrency(p.owes, currency())}
                    </span>
                  ) : (
                    <input
                      type="number"
                      placeholder="Owes"
                      class="input input-sm input-bordered w-28 text-right"
                      value={p.owes || ''}
                      min={0}
                      step={0.01}
                      onChange={(e: Event) =>
                        updatePerson(
                          i,
                          'owes',
                          (e.target as HTMLInputElement).value
                        )
                      }
                    />
                  )}
                  <button
                    class="btn btn-ghost btn-xs"
                    onClick={() => removePerson(i)}>
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <div class="flex gap-2">
              <button
                class="btn btn-outline btn-sm border-base-content/20 bg-base-100/10 hover:bg-base-100/20 flex-1 backdrop-blur"
                onClick={addPerson}>
                + Add Person
              </button>
              <button
                class="btn btn-primary btn-sm flex-1"
                onClick={handleSettle}
                disabled={persons().length < 2}>
                Settle Up
              </button>
            </div>

            {totalPaid() > 0 || computedTotalOwes() > 0 ? (
              <div class="flex items-center justify-between text-xs opacity-60">
                <span>
                  Total Paid:{' '}
                  <strong>{formatCurrency(totalPaid(), currency())}</strong>
                </span>
                <span>
                  Total Owes:{' '}
                  <strong>
                    {formatCurrency(computedTotalOwes(), currency())}
                  </strong>
                </span>
              </div>
            ) : null}

            {settlements() && settlements()!.length > 0 && (
              <div class="bg-base-200 mt-2 flex flex-col space-y-2 gap-y-2 rounded-xl p-3">
                <span class="text-xs font-semibold">Settle Up</span>
                {settlements()!.map((s, i) => (
                  <div
                    key={i}
                    class="bg-base-100/50 flex items-center justify-between rounded-lg px-3 py-2">
                    <span class="text-sm font-medium">
                      {s.from} <span class="text-xs opacity-50">pays</span>{' '}
                      {s.to}
                    </span>
                    <span class="text-sm font-bold">
                      {formatCurrency(s.amount, currency())}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {settlements() && settlements()!.length === 0 && (
              <div class="bg-base-200 mt-2 rounded-xl p-3 text-center text-sm font-medium text-green-600">
                All settled ✓
              </div>
            )}
          </>
        )}
      </div>

      <div class="border-base-content/10 flex items-center justify-between gap-2 border-t pt-3">
        <div class="flex items-center gap-1.5">
          <span class="text-xs opacity-60">Currency</span>
          <select
            class="select select-xs select-bordered w-20"
            value={currency()}
            onChange={(e: Event) =>
              setCurrency((e.target as HTMLSelectElement).value)
            }>
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div class="flex items-center gap-1.5">
          <button
            class="btn btn-outline btn-xs border-base-content/20 bg-base-100/10 hover:bg-base-100/20 backdrop-blur"
            onClick={handleDownload}
            disabled={capturing()}>
            {capturing() ? 'Capturing…' : '⬇ PNG'}
          </button>
          <button
            class="btn btn-outline btn-xs border-base-content/20 bg-base-100/10 hover:bg-base-100/20 backdrop-blur"
            onClick={handleCopy}
            disabled={capturing()}>
            {capturing() ? 'Capturing…' : '📋 Copy'}
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};
