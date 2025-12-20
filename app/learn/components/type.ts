export type Chuong = {
    id_chuong: string;
    TenChuong: string;
    ThuTu: number;
  };

export  type BaiHoc = {
    id_baihoc: string;
    id_chuong: string;
    TenBaiHoc: string;
    IconBaiHoc: string
    ThuTu: number;
  };