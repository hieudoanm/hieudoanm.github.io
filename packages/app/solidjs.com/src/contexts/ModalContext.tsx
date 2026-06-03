import { createContext, createSignal, useContext, type JSX } from 'solid-js';

type ModalContextType = {
  isOpen: () => boolean;
  modalContent: () => JSX.Element | null;
  openModal: (content: JSX.Element) => void;
  closeModal: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = (props: { children: JSX.Element }) => {
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

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        modalContent,
        openModal,
        closeModal,
      }}>
      {props.children}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
