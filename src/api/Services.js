/* eslint-disable */
import { get, post, del } from './Ajax';

export function Services() {

    var that = this;

    this.getTodos = () => {
        return new Promise(async (resolve, reject) =>{
            return await get({
                url: '/'
            }).then(e => resolve(e))
              .catch(that.handleError.bind(null, reject));
        })
    };

    this.postTodos = todo_data => {
        return new Promise(async (resolve, reject) =>{
            return await post({
                url: '/',
                body: JSON.stringify(todo_data),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }).then(e => resolve(e))
              .catch(that.handleError.bind(null, reject));
        })
    };

    this.deleteTodos = id => {
        return new Promise(async (resolve, reject) =>{
            return await del({
                url: `/${id}`
            }).then(e => resolve(e))
              .catch(that.handleError.bind(null, reject));
        })
    };

    this.handleError = function (reject, response) {
        if (response.message === "Failed to fetch") {
            return reject({ message: "server_is_down" });
        }
        
        let entity = response.entity;

        if (response.status && response.status === 401) {
            return Promise.resolve(response);
        }

       return reject({ message: entity.message });
    };
};