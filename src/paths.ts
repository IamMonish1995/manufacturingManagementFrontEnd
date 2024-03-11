export const paths = {
  home: '/dashboard/inventory',
  auth: { signIn: '/auth/sign-in', signUp: '/auth/sign-up', resetPassword: '/auth/reset-password' },
  dashboard: {
    overview: '/dashboard',
    account: '/dashboard/account',
    inventory: '/dashboard/inventory',
    integrations: '/dashboard/integrations',
    settings: '/dashboard/settings',
  },
  errors: { notFound: '/errors/not-found' },
} as const;
