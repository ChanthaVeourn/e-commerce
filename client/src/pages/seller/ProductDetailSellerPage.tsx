import React, { useEffect, useState } from "react";
import ProductDetailSeller from "../../components/seller/ProductDetailSeller";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import DeshboardSidebar from "../../components/seller/DeshboardSidebar";

const ProductDetailSellerPage = () => {
  const [params] = useSearchParams();
  const [cookie] = useCookies(["token"]);
  const [pDtail, setPDtail] = useState<any>();
  const fetchDetail = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/seller/product/${params.get(
          "id"
        )}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${cookie.token}`,
          },
        }
      )
      .then((res) => {
        setPDtail(res.data.data);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  useEffect(() => {
    fetchDetail();
  }, []);

  return (
      <>
      <DeshboardSidebar>
        <ProductDetailSeller {...pDtail} />
      </DeshboardSidebar>
      </>
    );
};

export default ProductDetailSellerPage;
