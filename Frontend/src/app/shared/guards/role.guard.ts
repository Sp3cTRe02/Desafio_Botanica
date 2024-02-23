import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Adjust the import path as necessary
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.esAdmin()) {
    return true;
  } else {
    router.navigate(['']);
    return false;
  }
};




