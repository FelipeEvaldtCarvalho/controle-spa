export default defineNuxtRouteMiddleware((to) => {
  if (to.path !== "/auth") return;
  return navigateTo("/auth/login");
});
