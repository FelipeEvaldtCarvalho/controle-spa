<script setup lang="ts">
import {
  object,
  string,
  boolean,
  pipe,
  minLength,
  email,
  custom,
} from "valibot";
import type { FormSubmitEvent } from "@nuxt/ui";
import type { InferOutput } from "valibot";

definePageMeta({
  middleware: ["guest"],
});

const { register } = useAuth();
const router = useRouter();
const toast = useToast();

const strongPasswordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

const schema = object({
  name: pipe(string(), minLength(2, "Nome deve ter pelo menos 2 caracteres")),
  email: pipe(string(), email("Email inválido")),
  password: pipe(
    string(),
    minLength(8, "A senha deve ter pelo menos 8 caracteres"),
    custom(
      (value) => strongPasswordRegex.test(value as string),
      "A senha deve conter pelo menos 1 letra maiúscula, 1 número e 1 caractere especial"
    )
  ),
  confirmPassword: pipe(
    string(),
    custom((value) => value === form.password, "Senhas não coincidem")
  ),
  acceptTerms: pipe(
    boolean(),
    custom(
      (value) => !!value,
      "Você deve aceitar os termos de uso e política de privacidade"
    )
  ),
});

type Schema = InferOutput<typeof schema>;

const form = reactive({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  acceptTerms: false,
});

const loading = ref(false);
const passwordShow = ref(false);
const confirmPasswordShow = ref(false);

const handleRegister = async (event: FormSubmitEvent<Schema>) => {
  const { name, email, password } = event.data;
  try {
    loading.value = true;

    await register({
      name,
      email,
      password,
    });
  } catch (err: unknown) {
    console.error("Erro ao registrar:", err);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="max-w-md w-full space-y-8">
    <div>
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Criar nova conta
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Ou
        <NuxtLink
          to="/auth/login"
          class="font-medium text-primary-600 hover:text-primary-500"
        >
          entrar na sua conta existente
        </NuxtLink>
      </p>
    </div>

    <UCard class="mt-8">
      <UForm
        :schema="schema"
        :state="form"
        class="space-y-6"
        @submit.prevent="handleRegister"
      >
        <UFormField label="Nome da Loja" name="name" class="w-full">
          <UInput v-model="form.name" class="w-full" autocomplete="name" />
        </UFormField>
        <UFormField label="Email" name="email" class="w-full">
          <UInput v-model="form.email" class="w-full" autocomplete="email" />
        </UFormField>
        <UFormField label="Senha" name="password" class="w-full">
          <UInput
            v-model="form.password"
            class="w-full"
            :type="passwordShow ? 'text' : 'password'"
            autocomplete="new-password"
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
        <UFormField
          label="Confirmar senha"
          name="confirmPassword"
          class="w-full"
        >
          <UInput
            v-model="form.confirmPassword"
            class="w-full"
            :type="confirmPasswordShow ? 'text' : 'password'"
            autocomplete="new-password"
          >
            <template #trailing>
              <UButton
                color="neutral"
                variant="link"
                :icon="
                  confirmPasswordShow ? 'i-lucide-eye-off' : 'i-lucide-eye'
                "
                :aria-label="
                  confirmPasswordShow ? 'Hide password' : 'Show password'
                "
                :aria-pressed="confirmPasswordShow"
                aria-controls="password"
                class="cursor-pointer"
                @click="confirmPasswordShow = !confirmPasswordShow"
              />
            </template>
          </UInput>
        </UFormField>

        <UCheckbox
          v-model="form.acceptTerms"
          label="Eu aceito os termos de uso e política de privacidade"
          required
        />

        <UButton
          type="submit"
          :loading="loading"
          :disabled="loading || !form.acceptTerms"
          class="w-full"
          size="lg"
          label="Criar conta"
        />
      </UForm>
    </UCard>
  </div>
</template>
