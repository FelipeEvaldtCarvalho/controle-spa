export interface User {
  id: string;
  name: string;
  email: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  remember?: boolean;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
}

export const useAuth = () => {
  const user = useState<User | null>("user", () => null);
  const isAuthenticated = computed(() => !!user.value);
  const loading = ref(false);
  const toast = useToast();

  const { $api: api } = useNuxtApp();

  const login = async (credentials: LoginCredentials): Promise<void> => {
    try {
      loading.value = true;

      const {
        data: { access_token: accessToken },
      } = await api.post<LoginResponse>("/auth/login", credentials);

      if (accessToken) {
        localStorage.setItem("auth_token", accessToken);
      }
      navigateTo("/");
    } catch {
      throw new Error("Credenciais inválidas");
    } finally {
      loading.value = false;
    }
  };

  const register = async (payload: RegisterData): Promise<void> => {
    try {
      loading.value = true;
      console.log("Registrando usuário:", payload);
      // const {
      //   data: { access_token: accessToken },
      // } = await api.post<LoginResponse>("/auth/create", payload);
      const accessToken = "fake_access_token"; // Simulação de token
      toast.add({
        title: "Conta criada com sucesso!",
      });
      if (accessToken) {
        localStorage.setItem("auth_token", accessToken);
      }
    } catch {
      throw new Error("Erro ao criar conta");
    } finally {
      loading.value = false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      loading.value = true;

      // TODO: Implementar chamada real para API
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Limpar dados do usuário
      user.value = null;
      localStorage.removeItem("auth_token");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    } finally {
      loading.value = false;
    }
  };

  const checkAuth = async (): Promise<void> => {
    try {
      // TODO: Verificar token e buscar dados do usuário
      const token = localStorage.getItem("auth_token");

      if (token) {
        // Simular verificação de token
        user.value = {
          id: "1",
          name: "Usuário Teste",
          email: "usuario@teste.com",
        };
      }
    } catch (error) {
      console.error("Erro ao verificar autenticação:", error);
      user.value = null;
    }
  };

  return {
    user: readonly(user),
    isAuthenticated,
    loading: readonly(loading),
    login,
    register,
    logout,
    checkAuth,
  };
};
