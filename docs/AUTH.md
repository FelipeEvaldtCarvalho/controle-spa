# Módulo de Autenticação

Este módulo fornece um sistema completo de autenticação para o projeto Nuxt.

## Estrutura

```
├── pages/
│   ├── login.vue              # Página de login
│   ├── register.vue           # Página de registro
│   ├── forgot-password.vue    # Página de recuperação de senha
│   ├── dashboard.vue          # Dashboard (área autenticada)
│   └── index.vue              # Página inicial com redirecionamento
├── layouts/
│   └── auth.vue               # Layout para páginas de autenticação
├── middleware/
│   ├── auth.ts                # Middleware para páginas protegidas
│   └── guest.ts               # Middleware para páginas públicas
├── composables/
│   └── useAuth.ts             # Composable para gerenciar autenticação
└── plugins/
    └── auth.client.ts         # Plugin para inicializar autenticação
```

## Funcionalidades

### Páginas

- **Login**: Formulário de login com validação
- **Registro**: Formulário de registro com validações
- **Recuperação de Senha**: Envio de email para recuperação
- **Dashboard**: Área protegida para usuários autenticados

### Middlewares

- **auth**: Protege páginas que requerem autenticação
- **guest**: Redireciona usuários autenticados para o dashboard

### Composable useAuth

```typescript
const {
  user, // Usuário atual (readonly)
  isAuthenticated, // Status de autenticação (computed)
  loading, // Estado de carregamento (readonly)
  login, // Função de login
  register, // Função de registro
  logout, // Função de logout
  checkAuth, // Verificar autenticação
} = useAuth();
```

## Uso

### Login

```typescript
const { login } = useAuth();

await login({
  email: "usuario@exemplo.com",
  password: "senha123",
  remember: true,
});
```

### Registro

```typescript
const { register } = useAuth();

await register({
  name: "Nome Completo",
  email: "usuario@exemplo.com",
  password: "senha123",
});
```

### Logout

```typescript
const { logout } = useAuth();

await logout();
```

## Configuração

### Proteger Páginas

```typescript
// Página que requer autenticação
definePageMeta({
  middleware: ["auth"],
});

// Página apenas para visitantes
definePageMeta({
  middleware: ["guest"],
});
```

## TODO

- [ ] Implementar integração com API real
- [ ] Adicionar validação de token JWT
- [ ] Implementar refresh token
- [ ] Adicionar testes unitários
- [ ] Implementar recuperação de senha real
- [ ] Adicionar autenticação social (Google, Facebook, etc.)
- [ ] Implementar verificação de email
- [ ] Adicionar captcha para segurança
- [ ] Implementar rate limiting
- [ ] Adicionar logs de auditoria

## Tecnologias Utilizadas

- **Nuxt 3**: Framework Vue.js
- **Nuxt UI**: Componentes de interface
- **TypeScript**: Tipagem estática
- **Vue 3 Composition API**: Gerenciamento de estado
- **Tailwind CSS**: Estilização

## Desenvolvimento

Para testar o módulo:

1. Execute o servidor de desenvolvimento:

```bash
npm run dev
```

2. Acesse `http://localhost:3000`
3. Você será redirecionado para `/login`
4. Use qualquer email/senha para testar (simulação)
5. Após o login, será redirecionado para `/dashboard`
