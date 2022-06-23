export const isAuthenticated = () => {
  const userName = sessionStorage.getItem('USER_NAME');
  return !!userName;
};

export const setUserInformation = ({ tenant, userName, profile }) => {
  sessionStorage.setItem('USER_PROFILE', profile);
  sessionStorage.setItem('USER_TENANT', tenant);
  sessionStorage.setItem('USER_NAME', userName);
};

export const getUserInformation = () => {
  return {
    userName: sessionStorage.getItem('USER_NAME'),
    tenant: sessionStorage.getItem('USER_TENANT'),
    profile: sessionStorage.getItem('USER_PROFILE'),
  };
};

export const clearUserInformation = () => {
  sessionStorage.clear();
};

export const redirectToLogin = (tenant, returnPath) => {
  const params = new URLSearchParams({
    tenant,
    returnPath,
  });

  window.location.href = `/backstage/auth?${params.toString()}`;
};

export const redirectToLogout = returnPath => {
  const params = new URLSearchParams({
    returnPath,
  });

  window.location.href = `/backstage/auth/revoke?${params.toString()}`;
};
