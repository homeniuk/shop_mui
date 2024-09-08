
export type TypePropsGoodsList = {
    section:    string
}

export interface TypeGoodsState {
    goodsList:      TypeOfMassivGoods[],
    singleGood:     TypeOfSingleGood, 
    isGoodsLoading: boolean,
    errorOnGoods:   string|null,
}

export interface TypeOfMassivGoods {
    id:         number,
    name:       string,
    image:      string,
    price:      number,
    rating:     number,
}

export interface TypeOfSingleGood {
    id:         number,
    name:       string,
    description:string,
    image:      string,
    price:      number,
    rating:     number,
    catalog:    string,
}

export interface TypeGoodsListReturn{
    message:    string,
    goodsList:  TypeOfMassivGoods[]
}
export interface TypeSingleGoodReturn{
    message:    string,
    id:         number,
    name:       string,
    description:string,
    image:      string,
    price:      number,
    rating:     number,
    catalog:    string,
}

export interface TypeGoodsListEnter{
    section:    string,
}

export interface TypePropsGoodElement {
    id:         number,
    section:    string,
    name:       string,
    image:      string,
    price:      number, 
    rating:     number,
    inBasket:   boolean,
    isAdding:   boolean,
    token:      string,
}

export interface TypePropsBuyIcon {
    id:         number,
    token:      string,
    isAdding:   boolean,
    inBasket:   boolean,
}

export interface TypeOfSingleGoodEnter {
    id:         number|undefined,
}

export interface TypeOfMassivToDisplay {
    id:         number,
    name:       string,
    image:      string,
    price:      number,
    rating:     number,
    inBasket:   boolean,
    isAdding:   boolean,
}