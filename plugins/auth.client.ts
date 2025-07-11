export default defineNuxtPlugin(async () => {
  const { checkAuth } = useAuth();

  // Verificar autenticação ao carregar a aplicação
  await checkAuth();
});
