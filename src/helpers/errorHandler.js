const serverErrorStatus = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  500: 'Internal Server Error',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
};

export const errorStatusHandler = error => {
  const errorKey = Object.keys(serverErrorStatus).find(key => {
    return key === error.toString();
  });

  let statusError;

  if (errorKey) {
    statusError = errorKey;
  } else {
    statusError = Object.keys(serverErrorStatus).find(key => key === '500');
  }

  const errorJson = {
    ok: false,
    status: statusError,
    message: serverErrorStatus[error] || serverErrorStatus[500],
  };

  return errorJson;
};
