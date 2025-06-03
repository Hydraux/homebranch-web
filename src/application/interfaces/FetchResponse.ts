export default interface FetchResponse<T> {
  data: T;
  status: number;
  statusText: string;
};