import React from 'react';
import { Show } from '@clerk/react';

export const SignedIn: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Show when="signed-in">{children}</Show>
);

export const SignedOut: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Show when="signed-out">{children}</Show>
);

export const CLERK_PUBLISHABLE_KEY =
  (import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string | undefined) ||
  (import.meta.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY as string | undefined) ||
  'pk_test_cHJvdmVuLWhlbi00MDgyLmNsZXJrLmFjY291bnRzLmRldiQ';

export const CLERK_APPEARANCE = {
  layout: {
    socialButtonsPlacement: 'top' as const,
    logoPlacement: 'inside' as const,
    showOptionalFields: false,
  },
  variables: {
    colorPrimary: '#163300',
    colorText: '#163300',
    colorTextSecondary: '#4b5e4a',
    colorBackground: '#ffffff',
    colorInputBackground: '#f7f9f5',
    colorInputText: '#163300',
    colorDanger: '#dc2626',
    colorSuccess: '#16a34a',
    borderRadius: '12px',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  elements: {
    card: {
      boxShadow: '0 20px 45px -10px rgba(22, 51, 0, 0.08), 0 0 0 1px #e5e9e2',
      borderRadius: '20px',
      border: '1px solid #e5e9e2',
      backgroundColor: '#ffffff',
      padding: '32px 28px',
    },
    headerTitle: {
      color: '#163300',
      fontSize: '1.45rem',
      fontWeight: '900',
      letterSpacing: '-0.03em',
    },
    headerSubtitle: {
      color: '#526650',
      fontSize: '0.90rem',
    },
    socialButtonsBlockButton: {
      borderColor: '#d8e2d4',
      borderRadius: '12px',
      backgroundColor: '#fbfcf9',
      transition: 'all 0.2s ease',
      '&:hover': {
        borderColor: '#9fe870',
        backgroundColor: '#f3f6ee',
        transform: 'translateY(-1px)',
      },
    },
    socialButtonsBlockButtonText: {
      color: '#163300',
      fontWeight: '600',
    },
    dividerLine: {
      backgroundColor: '#e5e9e2',
    },
    dividerText: {
      color: '#839681',
      fontSize: '0.80rem',
      fontWeight: '600',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.05em',
    },
    formFieldLabel: {
      color: '#284218',
      fontSize: '0.86rem',
      fontWeight: '700',
    },
    formFieldInput: {
      borderColor: '#d8e2d4',
      borderRadius: '10px',
      fontSize: '0.92rem',
      backgroundColor: '#f9faf7',
      transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
      '&:focus': {
        borderColor: '#163300',
        boxShadow: '0 0 0 3px rgba(159, 232, 112, 0.35)',
      },
    },
    formButtonPrimary: {
      backgroundColor: '#163300',
      color: '#9fe870',
      fontWeight: '800',
      fontSize: '0.94rem',
      borderRadius: '12px',
      padding: '12px 20px',
      transition: 'all 0.15s ease',
      boxShadow: '0 4px 14px rgba(22, 51, 0, 0.2)',
      '&:hover': {
        backgroundColor: '#0c1c00',
        transform: 'translateY(-1px)',
        boxShadow: '0 6px 20px rgba(22, 51, 0, 0.28)',
      },
      '&:active': {
        transform: 'translateY(0)',
      },
    },
    footerActionLink: {
      color: '#15803d',
      fontWeight: '700',
      '&:hover': {
        color: '#163300',
        textDecoration: 'underline',
      },
    },
    identityPreviewText: {
      color: '#163300',
      fontWeight: '700',
    },
    userButtonAvatarBox: {
      width: '36px',
      height: '36px',
      borderRadius: '50%',
      border: '2px solid #9fe870',
    },
  },
};
