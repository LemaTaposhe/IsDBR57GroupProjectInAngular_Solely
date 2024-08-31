import { Product } from "../product/product.model"

export interface Pagination {
    pageIndex: number
    pageSize: number
    count: number
    data: Product[]
  }