const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export", // Gera um site estático
  images: {
    unoptimized: true, // Evita problemas com otimização de imagens no GitHub Pages
  },
  basePath: isProd ? "/desafio3-ecommerce-compass-uol" : "", // Caminho base do repositório
  assetPrefix: isProd ? "/desafio3-ecommerce-compass-uol/" : "", // Prefixo dos assets
};

module.exports = nextConfig;
