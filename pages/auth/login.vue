<script setup lang="ts">
import * as v from "valibot";
import type { FormSubmitEvent } from "@nuxt/ui";

definePageMeta({
  middleware: ["guest"],
});

const { login } = useAuth();
const router = useRouter();
const toast = useToast();

const schema = v.object({
  email: v.pipe(v.string(), v.nonEmpty("")),
  password: v.pipe(v.string(), v.nonEmpty("")),
});

type Schema = v.InferOutput<typeof schema>;

const state = reactive({
  email: "",
  password: "",
});

const rememberMe = ref(false);

const loading = ref(false);
const passwordShow = ref(false);

const handleLogin = async (event: FormSubmitEvent<Schema>) => {
  const { password, email } = event.data;
  try {
    loading.value = true;

    await login({
      email: email,
      password: password,
      remember: rememberMe.value,
    });

    await router.push("/dashboard");
  } catch (err: unknown) {
    toast.add({
      title: "Erro ao fazer login",
      description: err instanceof Error ? err.message : "Erro ao fazer login",
      color: "error",
    });
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="max-w-md w-full space-y-8">
    <div>
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Entrar na sua conta
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Ou
        <NuxtLink
          to="/auth/register"
          class="font-medium text-primary-600 hover:text-primary-500"
        >
          criar uma nova conta
        </NuxtLink>
      </p>
    </div>

    <UCard class="mt-8">
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-6"
        @submit.prevent="handleLogin"
      >
        <UFormField label="Email" name="email" class="w-full">
          <UInput v-model="state.email" class="w-full" autocomplete="email" />
        </UFormField>

        <UFormField label="Password" name="password" class="w-full">
          <UInput
            v-model="state.password"
            class="w-full"
            :type="passwordShow ? 'text' : 'password'"
          >
            <template #trailing>
              <UButton
                color="neutral"
                variant="link"
                :icon="passwordShow ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                :aria-label="passwordShow ? 'Hide password' : 'Show password'"
                :aria-pressed="passwordShow"
                aria-controls="password"
                class="cursor-pointer"
                @click="passwordShow = !passwordShow"
              />
            </template>
          </UInput>
        </UFormField>

        <div class="flex items-center justify-between">
          <UCheckbox v-model="rememberMe" label="Lembrar de mim" />
          <NuxtLink
            to="/auth/forgot-password"
            class="text-sm text-primary-600 hover:text-primary-500"
          >
            Esqueceu sua senha?
          </NuxtLink>
        </div>

        <UButton
          type="submit"
          :loading="loading"
          :disabled="loading"
          class="w-full flex justify-center"
          size="lg"
          label="Entrar"
        />
      </UForm>
    </UCard>
  </div>
</template>
