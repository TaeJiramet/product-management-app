import React, { useState } from "react";
import { useNavigate } from "react-router";
import ProductForm from "../components/ProductForm";
import { createProduct } from "../services/productService";
import { showError, showSuccess } from "../services/alertService";

const AddProductPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setIsSubmitting(true);
    try {
      await createProduct({
        name,
        price: Number(price),
        description,
        image,
      });
      showSuccess("สำเร็จ", "เพิ่มสินค้าเรียบร้อยแล้ว");
      navigate("/products");
    } catch (error) {
      showError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <ProductForm
        name={name}
        price={price}
        description={description}
        image={image}
        isSubmitting={isSubmitting}
        onNameChange={setName}
        onPriceChange={setPrice}
        onDescriptionChange={setDescription}
        onImageChange={setImage}
        onSubmit={handleSubmit}
        onCancel={() => navigate("/products")}
      />
    </div>
  );
};

export default AddProductPage;
