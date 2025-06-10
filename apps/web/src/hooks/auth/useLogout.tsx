import { clearCookiesAction } from '@/app/(private)/actions';
import { services } from '@/container';

export function useLogout() {
  const logout = async () => {
    try {
      const { success: logoutSuccess } = await services.AuthService.logout();

      if (logoutSuccess) {
        const { success: clearCookiesSuccess } = await clearCookiesAction();

        if (clearCookiesSuccess) {
          window.location.reload();
        }
      }
    } catch (error) {
      console.error('Unexpected error during logout:', error);
    }
  };

  return { logout };
}
