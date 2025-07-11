<script setup lang="ts">
import * as v from "valibot";
import type { FormSubmitEvent } from "@nuxt/ui";
import { toast } from "#build/ui";

definePageMeta({
  middleware: ["guest"],
});

const schema = v.object({
  name: v.pipe(
    v.string(),
    v.minLength(2, "Nome deve ter pelo menos 2 caracteres")
  ),
  email: v.pipe(v.string(), v.email("Email inválido")),
  password: v.pipe(
    v.string(),
    v.minLength(8, "A senha deve ter pelo menos 8 caracteres")
  ),
  confirmPassword: v.pipe(
    v.string(),
    v.minLength(8, "A confirmação de senha deve ter pelo menos 8 caracteres")
  ),
  acceptTerms: v.pipe(
    v.boolean(),
    v.custom(
      (value) => !!value,
      "Você deve aceitar os termos de uso e política de privacidade"
    )
  ),
});

type Schema = v.InferOutput<typeof schema>;

const { register } = useAuth();
const router = useRouter();
const toast = useToast();

const form = reactive({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  acceptTerms: false,
});

const loading = ref(false);

const handleRegister = async () => {
  try {
    loading.value = true;

    // Validação do formulário
    const validationResult = v.validate(form, schema);

    if (!validationResult.valid) {
      toast.add({
        title: "Erro de validação",
        description: validationResult.errors[0].message,
        color: "error",
      });
      return;
    }

    await register({
      name: form.name,
      email: form.email,
      password: form.password,
    });
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error
        ? err.message
        : "Erro ao criar conta. Tente novamente.";
    error.value = errorMessage;
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
      <form class="space-y-6" @submit.prevent="handleRegister">
        <div>
          <UForm label="Nome completo" name="name" :schema="schema">
            <UInput
              v-model="form.name"
              type="text"
              placeholder="Seu nome completo"
              required
              autocomplete="name"
            />
          </UForm>
        </div>

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
              autocomplete="new-password"
            />
          </UFormGroup>
        </div>

        <div>
          <UFormGroup label="Confirmar senha" name="confirmPassword">
            <UInput
              v-model="form.confirmPassword"
              type="password"
              placeholder="Confirme sua senha"
              required
              autocomplete="new-password"
            />
          </UFormGroup>
        </div>

        <div>
          <UCheckbox
            v-model="form.acceptTerms"
            label="Eu aceito os termos de uso e política de privacidade"
            required
          />
        </div>

        <UButton
          type="submit"
          :loading="loading"
          :disabled="loading || !form.acceptTerms"
          class="w-full"
          size="lg"
        >
          {{ loading ? "Criando conta..." : "Criar conta" }}
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
</template>
