import { NextFunction, Request, Response } from 'express';
import { AdminService } from '@/services/admin.service';
import { UserValidation } from '@/validators/user.validation';
import { Validation } from '@/validators/validation';

export class AdminController {
  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const query = req.query;
      const response = await AdminService.getUsers(query);
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const body = Validation.validate(UserValidation.CREATE, req.body);
      const response = await AdminService.createUser(body);
      return res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const body = Validation.validate(UserValidation.UPDATE, req.body);
      const response = await AdminService.updateUser(Number(id), body);
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const response = await AdminService.deleteUser(Number(id));
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
