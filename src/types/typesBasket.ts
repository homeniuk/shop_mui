export interface TypeOfBasketList {
    quantity:   number,
    product:    TypeOfBasketProd
}

export interface TypeOfBasketProd {
    id:         number,
    name:       string,
    price:      number,
    catalog:    string,
    imageSmall: string,
}

export interface TypeBasketState {
    list:           TypeOfBasketList[],
    listOfAdding:   number[],
    isLoading:      boolean,
    basketError:    string|null,
}

export interface TypeBasketListReturn{
    message:    string,
    list:       TypeOfBasketList[]
}
export interface TypeBasketListEnter{
    token:      string,
}

export interface TypePropsBasketElement{
    id:         number,
    quantity:   number,
    name:       string,
    price:      number,
    section:    string,
    imageSmall: string,
    token:      string,
    isAdding:   boolean,  
}

export interface TypeBasketDropEnter{
    token:      string,
    id:         number
}

export interface TypeBasketAddEnter{
    token:      string,
    id:         number
}

export interface TypeChangeQuantityReturn {
    message:    string,
    id:         number,
    quantity:   number,
}
export interface TypeChangeQuantityEnter {
    token:      string,
    id:         number,
    quantity:   number,
}