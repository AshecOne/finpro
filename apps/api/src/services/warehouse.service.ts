import { LocationRepository } from '@/repositories/location.repository';
import { WarehouseRepository } from '@/repositories/warehouse.repository';
import { WarehouseBody, WarehouseQuery } from '@/types/warehouse.type';
import {
  responseDataWithPagination,
  responseWithData,
  responseWithoutData,
} from '@/utils/response';
import { Validation } from '@/validators/validation';
import { WarehouseValidation } from '@/validators/warehouse.validation';

export class WarehouseService {
  static async createWarehouse(body: WarehouseBody) {
    const data = Validation.validate(WarehouseValidation.BODY, body);

    const checkProvince = await LocationRepository.getProvinceById(
      data.provinceId,
    );
    if (!checkProvince) {
      return responseWithoutData(400, false, 'Province Not Found');
    }

    const checkCity = await LocationRepository.getCityById(data.cityId);
    if (!checkCity) {
      return responseWithoutData(400, false, 'City Not Found');
    }

    if (checkCity.provinceId !== checkProvince.id) {
      return responseWithoutData(400, false, 'City Not In Province');
    }

    await WarehouseRepository.createWarehouse({
      name: data.name,
      address: data.address,
      province: { connect: { id: data.provinceId } },
      city: { connect: { id: data.cityId } },
      postalCode: data.postalCode,
      latitude: data.latitude,
      longitude: data.longitude,
    });
    return responseWithoutData(201, true, 'Success Create Warehouse');
  }

  static async getWarehouses(query: WarehouseQuery) {
    const { filter, limit, page, sortBy, orderBy } = Validation.validate(
      Validation.QUERY,
      query,
    );

    const queryPage = page || 1;
    const queryLimit = limit || 10;
    const queryFilter = filter || '';
    const querySortBy = sortBy || 'name';
    const queryOrderBy = orderBy || 'asc';

    const response = await WarehouseRepository.getWarehouses(
      queryPage,
      queryLimit,
      queryFilter,
      querySortBy,
      queryOrderBy,
    );

    if (!response.length) {
      return responseWithoutData(404, false, 'Data Not Found');
    }

    const total = await WarehouseRepository.countWarehouses(queryFilter);
    return responseDataWithPagination(200, 'Success Get Warehouses', response, {
      page: queryPage,
      limit: queryLimit,
      total,
    });
  }

  static async deleteWarehouse(id: string) {
    const newId = Validation.validate(Validation.INT_ID, id);

    const checkId = await WarehouseRepository.findWarehouseById(Number(newId));
    if (!checkId) {
      return responseWithoutData(404, false, 'Warehouse Not Found');
    }

    try {
      await WarehouseRepository.deleteWarehouseById(Number(newId));
    } catch (error) {
      return responseWithoutData(500, false, 'Internal Server Error');
    }

    return responseWithoutData(200, true, 'Success Delete Warehouse');
  }

  static async getWarehouse(id: string) {
    const newId = Validation.validate(Validation.INT_ID, id);
    const checkId = await WarehouseRepository.findWarehouseById(Number(newId));

    if (!checkId) {
      return responseWithoutData(404, false, 'Warehouse Not Found');
    }

    return responseWithData(200, 'Success Get Warehouse', checkId);
  }

  static async updateWarehouse(id: string, body: WarehouseBody) {
    const newId = Validation.validate(Validation.INT_ID, id);
    const data = Validation.validate(WarehouseValidation.BODY, body);

    const checkId = await WarehouseRepository.findWarehouseById(Number(newId));
    if (!checkId) {
      return responseWithoutData(404, false, 'Warehouse Not Found');
    }

    const checkProvince = await LocationRepository.getProvinceById(
      data.provinceId,
    );
    if (!checkProvince) {
      return responseWithoutData(400, false, 'Province Not Found');
    }

    const checkCity = await LocationRepository.getCityById(data.cityId);
    if (!checkCity) {
      return responseWithoutData(400, false, 'City Not Found');
    }

    if (checkCity.provinceId !== checkProvince.id) {
      return responseWithoutData(400, false, 'City Not In Province');
    }

    await WarehouseRepository.updateWarehouseById(Number(newId), {
      name: data.name,
      address: data.address,
      province: { connect: { id: data.provinceId } },
      city: { connect: { id: data.cityId } },
      postalCode: data.postalCode,
      latitude: data.latitude,
      longitude: data.longitude,
    });

    return responseWithoutData(200, true, 'Success Update Warehouse');
  }
}
