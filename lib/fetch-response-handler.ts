/****************************************************
 * Check if the fetch response is ok and return the data
 * if response is 404 return undefined to indicate not found
 * if response is not ok return isError as true
 * @param res fetch response
 * @returns data and isError
 ***************************************************/
export async function handleFetchResponse<T>(res: Response) {
  let data: T | undefined = undefined;
  let error: boolean = false;

  if (res.ok) {
    data = await res.json();
  } else if (res.status == 404) {
    data = undefined;
  } else {
    error = true;
  }

  return { data, error };
}
