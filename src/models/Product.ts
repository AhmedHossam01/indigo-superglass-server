import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: "Please define a name for the product" },
    price: { type: Number, required: "true" },
    isDiscount: { type: Boolean, default: false },
    oldPrice: { type: Number },
    imagePath: { type: String, default: "static/images/fixture.png" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IProduct>("product", productSchema);

export interface IProduct extends mongoose.Document {
  createdAt: Date;
  name: string;
  isDiscount: boolean;
  oldPrice: number;
  price: number;
  imagePath: string;
}
