import { createContext, useContext, createSignal, JSX } from 'solid-js';

type ModalContextType = {
  isOpen: boolean;
  modalContent: JSX.Element | null;
  openModal: (content: JSX.Element) => void;
  closeModal: () => void;
};

const ModalContext = createContext<ModalContextType>();

export function ModalProvider(props: { children?: JSX.Element }) {
  const [isOpen, setIsOpen] = createSignal(false);
  const [modalContent, setModalContent] = createSignal<JSX.Element | null>(
    null
  );

  const openModal = (content: JSX.Element) => {
    setModalContent(content);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalContent(null);
  };

  const value: ModalContextType = {
    get isOpen() {
      return isOpen();
    },
    get modalContent() {
      return modalContent();
    },
    openModal,
    closeModal,
  };

  return (
    <ModalContext.Provider value={value}>
      {props.children}
    </ModalContext.Provider>
  );
}

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
