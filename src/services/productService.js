import { request } from "../api/apiClient";

export const FALLBACK_PRODUCTS = [
  {
    id: "prd_ds_guide",
    name: "Devenir Data Scientist : Le Guide de Référence",
    slug: "data-science",
    description: "De la première ligne de code Python au déploiement de modèles d'Intelligence Artificielle : tout le parcours du Data Scientist moderne dans un seul ouvrage.",
    type: "downloadable",
    category: { value: "education_and_learning", label: "Éducation & Livre" },
    status: "published",
    is_free: false,
    pictures: {
      cover: "https://images.chariowcdn.com/cdn-cgi/image/format=auto,onerror=redirect,quality=medium-high,slow-connection-quality=50/https://assets.chariowcdn.com/assets/store_7382zxlal36g/P2JnZvXTEb67qF6eHvnHcG2GNc5v6GYcJI82VodP.png",
      thumbnail: "https://images.chariowcdn.com/cdn-cgi/image/format=auto,onerror=redirect,quality=medium-high,slow-connection-quality=50/https://assets.chariowcdn.com/assets/store_7382zxlal36g/VIJBlzOKdVbFHtceC9WoDStAVoARGl6fxngxsMKH.png"
    },
    pricing: {
      type: "one_time",
      current_price: { formatted: "F CFA 2,000", value: 2000, currency: "XOF" },
      price: { formatted: "F CFA 10,000", value: 10000, currency: "XOF" },
      price_off: "80%"
    },
    buy_url: "https://cykrhzat.mychariow.shop/data-science"
  },
  {
    id: "prd_f2qmj4",
    name: "Boostez vos Compétences en IA grâce au Prompt Engineering Expert",
    slug: "prompt",
    description: "Cinq (05) techniques infaillibles pour transformer votre compétence en une source de revenus et maîtriser ChatGPT, Gemini et VEO3.",
    type: "downloadable",
    category: { value: "education_and_learning", label: "Guide Pratique" },
    status: "published",
    is_free: false,
    pictures: {
      cover: "https://images.chariowcdn.com/cdn-cgi/image/format=auto,onerror=redirect,quality=medium-high,slow-connection-quality=50,width=702,height=260/https://assets.chariowcdn.com/cover_pictures/NvifMb8189RPJSr8Hs8pvGqe8AGUmYgabq7xLb6N.jpg",
      thumbnail: "https://images.chariowcdn.com/cdn-cgi/image/format=auto,onerror=redirect,quality=medium-high,slow-connection-quality=50,width=600,height=600/https://assets.chariowcdn.com/thumbnail_pictures/SmL5ycC4xqomsfw32k5F8CbKEYUkxBPsITB03dQV.png"
    },
    pricing: {
      type: "one_time",
      current_price: { formatted: "F CFA 12,500", value: 12500, currency: "XOF" }
    },
    buy_url: "https://cykrhzat.mychariow.shop/prompt"
  }
];

export const ProductService = {
  getAll: async () => {
    try {
      const data = await request("products");
      if (Array.isArray(data?.products) && data.products.length > 0) {
        return data.products;
      }
      return FALLBACK_PRODUCTS;
    } catch (error) {
      console.warn("[ProductService] API network error, serving static catalog fallback:", error.message);
      return FALLBACK_PRODUCTS;
    }
  }
};
