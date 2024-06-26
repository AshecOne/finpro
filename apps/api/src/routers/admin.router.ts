import { AdminController } from '@/controllers/admin.controller';
import { Router } from 'express';
import {
  adminGuard,
  superAdminGuard,
  verifyToken,
} from '@/middlewares/auth.middleware';

export class AdminRouter {
  private router: Router;
  private adminController: AdminController;

  constructor() {
    this.adminController = new AdminController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(
      '/users',
      verifyToken,
      adminGuard,
      this.adminController.getUsers,
    );
    this.router.post(
      '/users',
      verifyToken,
      superAdminGuard,
      this.adminController.createUser,
    );
    this.router.put(
      '/users/:id',
      verifyToken,
      superAdminGuard,
      this.adminController.updateUser,
    );
    this.router.delete(
      '/users/:id',
      verifyToken,
      superAdminGuard,
      this.adminController.deleteUser,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
