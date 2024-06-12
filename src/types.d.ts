export interface ProductBasic {

    name: string,
    category: string,
    gender: string,
    promo: boolean,
    favorite: boolean,
    photo: string
}

export interface ProductFull extends ProductBasic {
    id: bigint,
    created_at: Date,
}