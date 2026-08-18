import { getBillIcon, getBudgetIcon, getTransactionIcon } from '../iconMap';
import {
  FiFilm,
  FiMusic,
  FiGlobe,
  FiActivity,
  FiHome,
  FiCreditCard,
  FiCoffee,
  FiTruck,
  FiShoppingCart,
  FiZap,
  FiDollarSign,
  FiRepeat,
  FiPackage,
} from 'react-icons/fi';

describe('getBillIcon', () => {
  it('returns correct icon for known bills', () => {
    expect(getBillIcon('Netflix')).toBe(FiFilm);
    expect(getBillIcon('Spotify')).toBe(FiMusic);
    expect(getBillIcon('Internet')).toBe(FiGlobe);
    expect(getBillIcon('Gym Membership')).toBe(FiActivity);
    expect(getBillIcon('Car Insurance')).toBe(FiHome);
  });

  it('returns default icon for unknown bills', () => {
    expect(getBillIcon('Unknown')).toBe(FiCreditCard);
  });
});

describe('getBudgetIcon', () => {
  it('returns correct icon for known categories', () => {
    expect(getBudgetIcon('Food & Drink')).toBe(FiCoffee);
    expect(getBudgetIcon('Transport')).toBe(FiTruck);
    expect(getBudgetIcon('Shopping')).toBe(FiShoppingCart);
    expect(getBudgetIcon('Utilities')).toBe(FiZap);
    expect(getBudgetIcon('Entertainment')).toBe(FiFilm);
  });

  it('returns default icon for unknown categories', () => {
    expect(getBudgetIcon('Unknown')).toBe(FiDollarSign);
  });
});

describe('getTransactionIcon', () => {
  it('returns correct icon for known categories', () => {
    expect(getTransactionIcon('Food & Drink')).toBe(FiCoffee);
    expect(getTransactionIcon('Transport')).toBe(FiTruck);
    expect(getTransactionIcon('Shopping')).toBe(FiPackage);
    expect(getTransactionIcon('Utilities')).toBe(FiZap);
    expect(getTransactionIcon('Income')).toBe(FiDollarSign);
    expect(getTransactionIcon('Transfer')).toBe(FiRepeat);
  });

  it('returns default icon for unknown categories', () => {
    expect(getTransactionIcon('Unknown')).toBe(FiDollarSign);
  });
});
