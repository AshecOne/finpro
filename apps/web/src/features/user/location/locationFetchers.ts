import { ResponseWithData } from '@/features/types';
import axiosInstance from '@/utils/axiosInstance';
import { LocationBody, LocationName } from './type';

export const getProvince = async () => {
  const res =
    await axiosInstance.get<ResponseWithData<LocationBody[]>>(
      'location/province',
    );
  return res.data.result;
};

export const getCities = async (provinceId: string) => {
  const res = await axiosInstance.get<ResponseWithData<LocationBody[]>>(
    `location/${provinceId}`,
  );
  return res.data.result;
};

export const getProvinceName = async (provinceId: string) =>{
  const res = await axiosInstance.get<ResponseWithData<LocationName[]>>(
    `location/province/${provinceId}`,
  );
  return res.data.result[0];
}

export const getCityName = async (cityId: string) =>{
  const res = await axiosInstance.get<ResponseWithData<LocationName[]>>(
    `location/city/${cityId}`,
  );
  return res.data.result;
}
