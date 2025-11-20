// src/utils/helpers.ts
export const groupBy = <T, K extends PropertyKey>(
    array: T[],
    key: (item: T) => K
  ): Record<K, T[]> => {
    return array.reduce(
      (result, item) => {
        const k = key(item);
        if (!result[k]) {
          result[k] = [];
        }
        result[k].push(item);
        return result;
      },
      {} as Record<K, T[]>
    );
  };
  
  export const calculatePercentageChange = (current: number, previous: number) => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return ((current - previous) / previous) * 100;
  };
  
  export const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };