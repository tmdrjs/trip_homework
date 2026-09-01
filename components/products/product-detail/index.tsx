"use client";

import { useQuery } from "@apollo/client";
import { FETCH_USED_ITEMS } from "@/graphql/queries";
import type { Product } from "@/types/product";
import styles from "./styles.module.css";
import Link from "next/link";

const ICONS = ["/delete.png", "/link.png", "/location.png"];
const IMAGES = [
  "/f71f586e48aa048c2fa07145d5b85734bd66003b.jpg",
  "/b099db67daa04d8d9feb8f33b8753fbc63587552.jpg",
  "/e5c2acc669e397de5dea5dfc4cf5a747b7fc6f14.jpg",
  "/b099db67daa04d8d9feb8f33b8753fbc63587552.jpg",
  /* "/b099db67daa04d8d9feb8f33b8753fbc63587552.jpg", */
];
export default function ProductList() {

}
