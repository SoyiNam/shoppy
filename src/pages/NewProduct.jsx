import React, { useState } from "react";
import Input from "../components/ui/Input";
import ButtonSubmit from "../components/ui/ButtonSubmit";
import { getImageURL } from "../api/firebase";
import useProducts from "../hooks/useProducts";

export default function NewProduct() {
  const [productName, setProductName] = useState("");
  const [productNum, setProductNum] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCate, setProductCate] = useState("");
  const [productImg, setProductImg] = useState("");
  const [localFile, setLocalFile] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState();
  const { addProduct } = useProducts();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    getImageURL(localFile)
      .then((url) => {
        addProduct.mutate(
          {
            productName,
            productPrice,
            productNum,
            productCate,
            url,
          },
          {
            onSuccess: () => {
              setSuccess("성공적으로 제품이 추가되었습니다.");
              setTimeout(() => {
                setSuccess(null);
              }, 4000);
            },
          }
        );
      })
      //   return UploadNewProduct(
      //     productName,
      //     productPrice,
      //     productNum,
      //     productCate,
      //     url
      //   );
      // })
      // .then(() => {
      //   setSuccess("성공적으로 제품이 추가되었습니다.");
      //   setTimeout(() => {
      //     setSuccess(null);
      //   }, 4000);
      // })
      .finally(() => {
        setIsUploading(false);
      });
  };

  return (
    <section className="w-full h-screen text-center px-4">
      <h2 className="h-16 flex items-center justify-center my-4 text-2xl font-bold">
        새로운 제품 등록🛍️
      </h2>
      {success && <p className="my-2">✅ {success} </p>}
      {productImg && (
        <img src={productImg} alt="" className="w-96 mx-auto mb-2" />
      )}
      <form className="flex flex-col gap-2 px-12" onSubmit={handleFormSubmit}>
        <Input
          type="file"
          accept={"image/*"}
          onChange={(e) => {
            const imgFile = e.target.files[0];
            const imageUrl = URL.createObjectURL(imgFile);
            setProductImg(imageUrl);
            return setLocalFile(imgFile);
          }}
        />
        <Input
          name="productName"
          id="name"
          type="text"
          placeholder="제품명"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <Input
          name="productPrice"
          id="name"
          type="number"
          placeholder="가격"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
        />
        <Input
          name="productNum"
          type="number"
          placeholder="quantity"
          value={productNum}
          onChange={(e) => setProductNum(e.target.value)}
        />
        <Input
          name="productCate"
          type="text"
          placeholder="category"
          value={productCate}
          onChange={(e) => setProductCate(e.target.value)}
        />
        <ButtonSubmit text={isUploading ? "업로드 중..." : "제품 등록하기"} />
      </form>
    </section>
  );
}
