# @use-sptruz/axios

This is a package for a React hook called `@use-sptruz/axios`, which handles the state for an API call using axios. It returns the state of the API call, including `response`, `error`, `loading`, and a `refetch` function.

## Installation

To install `@use-sptruz/axios`, use the following command:

```bash
# npm
npm install --save @use-sptruz/axios

# yarn
yarn add @use-sptruz/axios

# pnpm
pnpm add @use-sptruz/axios
```

## Usage

```jsx
import React from 'react';
import { useAxios } from '@use-sptruz/axios';

const MyComponent = () => {
  const { response, error, loading, refetch } = useAxios({
    url: 'https://jsonplaceholder.typicode.com/posts/1',
    method: 'get',
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error!</p>;
  }

  return (
    <div>
      <h1>{response.data.title}</h1>
      <button onClick={refetch}>Refetch</button>
    </div>
  );
};

export default MyComponent;
```

## API

### useAxios

```tsx
useAxios<T>({
  axios?: AxiosInstance;
  url: string;
  method?: Method;
  options?: AxiosRequestConfig;
  trigger?: object | string;
  forceDispatchEffect?: () => boolean;
  customHandler?: (error: AxiosError<T> | unknown | null, response: AxiosResponse<T> | null) => void;
}): ResponseState
```

This hook takes the following parameters:

- `options` (optional): An object that contains the following properties:

  - `axios` (optional): An axios instance to use. Defaults to the global axios instance.
  - `url`: The URL to make the API call to.
  - `method` (optional): The HTTP method to use for the API call. Defaults to 'get'.
  - `options` (optional): Additional options to pass to the axios request.
  - `trigger` (optional): A value that, when changed, triggers a refetch of the API call.
  - `forceDispatchEffect` (optional): A function that determines whether the API call should be made.
  - `customHandler` (optional): A custom handler function for the API call response and error.

The hook returns an object that contains the following properties:

- `response`: The response from the API call, if successful.
- `error`: The error from the API call, if failed.
- `loading`: Whether the API call is currently loading or not.
- `refetch`: A function to refetch the data.

## License

This package is licensed under the MIT License.
