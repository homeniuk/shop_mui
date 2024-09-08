import axios from "axios";
import { TypeBasketListReturn } from "../types/typesBasket";
import { TypeGoodsListReturn, TypeSingleGoodReturn } from "../types/typesGoods";
import { TypeLoginReturn, TypeRegisterReturn } from "../types/typesUser";

const baseUrl = "http://localhost:5000/";

const getConfig = (token:string) => {
    return {
      headers: {
        Authorization: 'Bearer ' + token,
      }
    }
  }

//-------------------------------------------------------- UserAPI
const loginOnServer = async (email:string, password:string) => {
    return axios.post<TypeLoginReturn>(baseUrl + "auth/login", {email, password}).then(res=>res)
}

const registerOnServer = async (login:string, email:string, password:string) => {
    return axios.post<TypeRegisterReturn>(baseUrl + "auth/register", {login, email, password}).then(res=>res)
}

export const UserAPI = {loginOnServer, registerOnServer}

//-------------------------------------------------------- GoodAPI

const downloadSectionOfGoods = async (section:string) => {
    return axios.get<TypeGoodsListReturn>(baseUrl + "product/catalog/" + section).then(res=>res)
}

const downloadGoodInfo = async (id: number|undefined) => {
    const _id = String(id);
    return axios.get<TypeSingleGoodReturn>(baseUrl + "product/" + _id).
    then(res=>
        res)
}

export const GoodAPI = {downloadSectionOfGoods, downloadGoodInfo}


//-------------------------------------------------------- BasketAPI

const getBasket = async (token: string) => {
    const config = getConfig(token);
    return axios.get<TypeBasketListReturn>(baseUrl + "basket/", config).then(res=>res)
}

const dropFromBasket = (token: string, id:number) => {
  const config = getConfig(token);
  return axios.delete(baseUrl + "basket/" + id, config)
}

const addToBasket = (token: string, productId:number) => {
  const config = getConfig(token);
  return axios.post(baseUrl + "basket", {productId, quantity:1}, config)
}

const changeQuantity = (token: string, productId:number, quantity:number) => {
  const config = getConfig(token);
  return axios.patch(baseUrl + "basket", {productId, quantity}, config)
}

export const BasketAPI = {getBasket, dropFromBasket, addToBasket, changeQuantity}