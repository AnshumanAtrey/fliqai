"use client";
import React from 'react';
import Image from 'next/image';

interface PaymentSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  creditsAdded: number;
  newBalance: number;
  planDescription: string;
}

export const PaymentSuccessModal: React.FC<PaymentSuccessModalProps> = ({
  isOpen,
  onClose,
  creditsAdded,
  newBalance,
  planDescription
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white border border-black p-8 max-w-md w-full shadow-[4px_4px_0_0_rgba(0,0,0,0.8)]">
        {/* Success Icon */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-black">Payment Successful!</h2>
          <p className="text-gray-600 mt-2">Your credits have been added to your account</p>
        </div>

        {/* Purchase Details */}
        <div className="bg-[#FFF5F0] border border-[#FF9269] p-4 mb-6">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">Purchase:</p>
            <p className="font-medium text-black">{planDescription}</p>
            
            <div className="flex items-center justify-center gap-2 mt-3">
              <Image src="/Coins.svg" alt="Coins" width={24} height={13} />
              <span className="text-2xl font-bold text-[#FF9269]">+{creditsAdded}</span>
              <span className="text-lg">Credits</span>
            </div>
            
            <div className="mt-3 pt-3 border-t border-[#FF9269]">
              <p className="text-sm text-gray-600">New Balance:</p>
              <div className="flex items-center justify-center gap-2">
                <Image src="/Coins.svg" alt="Coins" width={20} height={11} />
                <span className="text-lg font-bold text-black">{newBalance} Credits</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-[#FF9269] text-white font-medium hover:bg-[#e5825a] transition-colors border border-black shadow-[2px_2px_0_0_rgba(0,0,0,0.8)]"
          >
            Continue
          </button>
          
          <div className="flex gap-3">
            <button
              onClick={() => window.location.href = '/discover-students'}
              className="flex-1 px-4 py-2 border border-black hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              View Student Profiles
            </button>
            <button
              onClick={() => window.location.href = '/essay-builder'}
              className="flex-1 px-4 py-2 border border-black hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              Essay Builder
            </button>
          </div>
        </div>

        {/* Receipt Info */}
        <div className="mt-6 pt-4 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-500">
            A receipt has been sent to your email
          </p>
        </div>
      </div>
    </div>
  );
};