import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from '@/state/store.ts';
import { StoreSliceEnum } from '@/const/enums/StoreSliceEnum.ts';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <T>(sliceName: StoreSliceEnum) =>
  useSelector((state: RootState): T | any => state[sliceName]);
