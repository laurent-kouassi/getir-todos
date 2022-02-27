import { BASE_URL } from "./Env";

// get request
export const get = request => {
  return new Promise(async (resolve, reject) => {
    request.method = "GET";
    await makeRequest(request)
      .then(e => resolve(e))
      .catch(reject);
  });
};

// post request
export const post = request => {
  return new Promise(async (resolve, reject) => {
    request.method = "POST";
    await makeRequest(request)
      .then(e => resolve(e))
      .catch(reject);
  });
};

//delete request
export const del = request => {
  return new Promise(async (resolve, reject) => {
    request.method = "DELETE";
    await makeRequest(request)
      .then(e => resolve(e))
      .catch(reject);
  });
};

// make request function
const makeRequest = request => {
  return new Promise( async function (resolve, reject) {
   await fetch( new Request(BASE_URL + request.url, request))
      .then(response => {
        var finalize = function () {
          if (response.status < 400) {
            return resolve(response);
          }
          return reject(response);
        };
        if (response.json) {
          return response
            .json()
            .then(function (entity) {
              response.entity = entity;
              return finalize();
            })
            .catch(finalize);
        }
        return finalize();
      })
      .catch(response => {
        return reject(response);
      });
  });
};
