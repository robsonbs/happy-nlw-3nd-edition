/* eslint-disable no-restricted-globals */
import { ValueTransformer } from 'typeorm';
import isNullOrUndefined from '../isNullOrUndefined';

export default class ColumnNumericTransformer implements ValueTransformer {
  to(data?: number | null): number | null {
    if (!isNullOrUndefined(data)) {
      return data;
    }
    return null;
  }

  from(data?: string | null): number | null {
    if (!isNullOrUndefined(data)) {
      const res = parseFloat(data);
      if (isNaN(res)) {
        return null;
      }
      return res;
    }
    return null;
  }
}
