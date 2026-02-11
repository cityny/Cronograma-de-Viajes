import React from 'react';
import { createPortal } from 'react-dom';

interface ConfirmDialogProps {
    isOpen: boolean;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel: () => void;
    type?: 'warning' | 'danger' | 'info';
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
    isOpen,
    title,
    message,
    confirmText = 'Confirmar',
    cancelText = 'Cancelar',
    onConfirm,
    onCancel,
    type = 'warning'
}) => {
    if (!isOpen) return null;

    const typeStyles = {
        warning: {
            iconBg: 'bg-yellow-100',
            iconColor: 'text-yellow-600',
            confirmBtn: 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500',
            icon: (
                <svg className="w-6 h-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            )
        },
        danger: {
            iconBg: 'bg-red-100',
            iconColor: 'text-red-600',
            confirmBtn: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
            icon: (
                <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            )
        },
        info: {
            iconBg: 'bg-blue-100',
            iconColor: 'text-blue-600',
            confirmBtn: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
            icon: (
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        }
    };

    const style = typeStyles[type];

    return createPortal(
        <div className="fixed inset-0 z-[10000] overflow-y-auto">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                onClick={onCancel}
            />

            {/* Dialog Container */}
            <div className="flex min-h-screen items-center justify-center p-4 text-center">
                {/* Trick to center the modal content */}
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="relative inline-block align-bottom bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 text-left overflow-hidden transform transition-all sm:my-8 sm:align-middle animate-in fade-in zoom-in duration-200">
                    {/* Icon */}
                    <div className={`mx-auto flex items-center justify-center h-12 w-12 rounded-full ${style.iconBg} mb-4`}>
                        {style.icon}
                    </div>

                    {/* Content */}
                    <div className="text-center">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                            {title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-6">
                            {message}
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                        <button
                            onClick={onCancel}
                            className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                        >
                            {cancelText}
                        </button>
                        <button
                            onClick={onConfirm}
                            className={`flex-1 px-4 py-2.5 text-white font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${style.confirmBtn}`}
                        >
                            {confirmText}
                        </button>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default ConfirmDialog;
