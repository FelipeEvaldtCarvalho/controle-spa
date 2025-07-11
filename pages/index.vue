<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="text-center">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">
        Bem-vindo ao Sistema
      </h1>
      <p class="text-gray-600 mb-8">Carregando...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const { isAuthenticated } = useAuth();
const router = useRouter();

onMounted(() => {
  if (isAuthenticated.value) {
    router.push("/dashboard");
  } else {
    router.push("/login");
  }
});
</script>
