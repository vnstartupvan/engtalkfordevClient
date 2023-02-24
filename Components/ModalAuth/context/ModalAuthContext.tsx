import { createContext, useContext } from 'react';

export interface IContextValues {}
export interface IModalAuthProvider {
    children: React.ReactNode;
    props?: unknown;
}
const ModalAuthContext = createContext<IContextValues | null>(null);

export const ModalAuthProvider = ({ children }: IModalAuthProvider) => {
    return (
        <ModalAuthContext.Provider value={null}>
            {children}
        </ModalAuthContext.Provider>
    );
};

export const useModalAuth = () => {
    const context = useContext(ModalAuthContext);

    if (!context)
        throw new Error('useModalAuth must be used in Dropdown Provider!');

    return context;
};
