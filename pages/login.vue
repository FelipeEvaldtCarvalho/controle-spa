<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Entrar na sua conta
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Ou
          <NuxtLink
            to="/register"
            class="font-medium text-primary-600 hover:text-primary-500"
          >
            criar uma nova conta
          </NuxtLink>
        </p>
      </div>

      <UCard class="mt-8">
        <form class="space-y-6" @submit.prevent="handleLogin">
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

          <div>
            <UFormGroup label="Senha" name="password">
              <UInput
                v-model="form.password"
                type="password"
                placeholder="Sua senha"
                required
                autocomplete="current-password"
              />
            </UFormGroup>
          </div>
          <div class="flex items-center justify-between">
            <UCheckbox v-model="form.rememberMe" label="Lembrar de mim" />
            <NuxtLink
              to="/forgot-password"
              class="text-sm text-primary-600 hover:text-primary-500"
            >
              Esqueceu sua senha?
            </NuxtLink>
          </div>

          <UButton
            type="submit"
            :loading="loading"
            :disabled="loading"
            class="w-full"
            size="lg"
          >
            {{ loading ? "Entrando..." : "Entrar" }}
          </UButton>
        </form>
      </UCard>

      <div v-if="error" class="mt-4">
        <UAlert
          :title="error"
          color="error"
          variant="soft"
          icon="i-heroicons-exclamation-triangle"
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

const { login } = useAuth();
const router = useRouter();

const form = ref({
  email: "",
  password: "",
  rememberMe: false,
});

const loading = ref(false);
const error = ref("");

const handleLogin = async () => {
  try {
    loading.value = true;
    error.value = "";

    await login({
      email: form.value.email,
      password: form.value.password,
      remember: form.value.rememberMe,
    });

    await router.push("/dashboard");
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error
        ? err.message
        : "Erro ao fazer login. Tente novamente.";
    error.value = errorMessage;
  } finally {
    loading.value = false;
  }
};
</script>
