<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Recuperar senha
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Digite seu email para receber um link de recuperação
        </p>
      </div>

      <UCard class="mt-8">
        <form class="space-y-6" @submit.prevent="handleForgotPassword">
          <div>
            <UFormGroup label="Email" name="email">
              <UInput
                v-model="form.email"
                type="email"
                placeholder="seu@email.com"
                required
                autocomplete="email"
              />
            </UFormGroup>
          </div>

          <UButton
            type="submit"
            :loading="loading"
            :disabled="loading"
            class="w-full"
            size="lg"
          >
            {{ loading ? "Enviando..." : "Enviar link de recuperação" }}
          </UButton>
        </form>
      </UCard>

      <div class="text-center">
        <NuxtLink
          to="/login"
          class="text-sm text-primary-600 hover:text-primary-500"
        >
          Voltar para o login
        </NuxtLink>
      </div>

      <div v-if="error" class="mt-4">
        <UAlert
          :title="error"
          color="error"
          variant="soft"
          icon="i-heroicons-exclamation-triangle"
        />
      </div>

      <div v-if="success" class="mt-4">
        <UAlert
          :title="success"
          color="success"
          variant="soft"
          icon="i-heroicons-check-circle"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "auth",
  middleware: ["guest"],
});

const form = ref({
  email: "",
});

const loading = ref(false);
const error = ref("");
const success = ref("");

const handleForgotPassword = async () => {
  try {
    loading.value = true;
    error.value = "";
    success.value = "";

    // Simular envio de email por enquanto
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // TODO: Implementar envio real de email
    console.log("Recuperação de senha:", form.value);

    success.value =
      "Email de recuperação enviado! Verifique sua caixa de entrada.";
    form.value.email = "";
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error
        ? err.message
        : "Erro ao enviar email. Tente novamente.";
    error.value = errorMessage;
  } finally {
    loading.value = false;
  }
};
</script>
