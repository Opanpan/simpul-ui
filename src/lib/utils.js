import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = import.meta.env.VITE_API_URL;

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const customBaseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  timeout: 60000,
  prepareHeaders: (headers) => {
    return headers;
  },
});

export async function baseQueryWithInterceptors(args, api, extraOptions) {
  const result = await customBaseQuery(args, api, extraOptions);

  return result;
}

export const RTKQueryConfig = {
  keepUnusedDataFor: 1,
  refetchOnFocus: true,
  refetchOnReconnect: true,
};

export function convertDisplayDate(val) {
  if (val) {
    const [year, month, day] = val.split('-');
    return `${day}/${month}/${year}`;
  } else {
    return '';
  }
}
