<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div class="flex items-center">
            <h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-gray-700">Bem-vindo, Usuário!</span>
            <UButton variant="ghost" color="error" @click="handleLogout">
              Sair
            </UButton>
          </div>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <UCard>
          <template #header>
            <h3 class="text-lg font-medium text-gray-900">
              Painel de Controle
            </h3>
          </template>

          <div class="space-y-6">
            <p class="text-gray-600">
              Bem-vindo ao seu painel de controle! Aqui você pode gerenciar suas
              informações e configurações.
            </p>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <UCard>
                <div class="text-center">
                  <div class="text-2xl font-bold text-primary-600">0</div>
                  <div class="text-sm text-gray-500">Itens</div>
                </div>
              </UCard>

              <UCard>
                <div class="text-center">
                  <div class="text-2xl font-bold text-success-600">0</div>
                  <div class="text-sm text-gray-500">Ativos</div>
                </div>
              </UCard>

              <UCard>
                <div class="text-center">
                  <div class="text-2xl font-bold text-warning-600">0</div>
                  <div class="text-sm text-gray-500">Pendentes</div>
                </div>
              </UCard>
            </div>
          </div>
        </UCard>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});

const { logout } = useAuth();
const router = useRouter();

const handleLogout = async () => {
  try {
    await logout();
    await router.push("/auth/login");
  } catch (err: unknown) {
    console.error("Erro ao fazer logout:", err);
  }
};
</script>
