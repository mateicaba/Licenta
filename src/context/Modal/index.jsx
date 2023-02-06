import { Modal } from "antd";
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";
import reducer, { CLOSE_MODAL, initialState, OPEN_MODAL } from "./reducer";

const ModalContext = createContext(initialState);

export function useModalContext() {
  return useContext(ModalContext);
}

export default function ModalManager({ children }) {
  const [{ modals }, dispatch] = useReducer(reducer, initialState);

  const openModal = useCallback(
    (descriptor) => {
      const payload = { descriptor };
      const newModals = [...modals, payload];
      dispatch({ type: OPEN_MODAL, payload: newModals });
    },
    [modals]
  );

  const closeModal = useCallback(() => {
    let newModals = [...modals];
    newModals.pop();
    dispatch({ type: CLOSE_MODAL, payload: newModals });
  }, [modals]);

  const onOk = useCallback(
    (callback) => () => {
      callback.call();
      closeModal();
    },
    [closeModal]
  );

  const providerValue = useMemo(
    () => ({ modals, openModal, closeModal }),
    [modals, openModal, closeModal]
  );

  const renderModals = useCallback(() => {
    return modals.map(
      ({ descriptor: { callback, renderContent, okText } }, index) => {
        return (
          <Modal
            key={index}
            open
            centered
            okText={okText}
            onOk={onOk(callback)}
            destroyOnClose
            onCancel={() => closeModal()}
          >
            {renderContent(closeModal)}
          </Modal>
        );
      }
    );
  }, [modals, closeModal]);

  return (
    <ModalContext.Provider value={providerValue}>
      {children}
      {renderModals()}
    </ModalContext.Provider>
  );
}
