// Importe o PrismaClient da maneira correta
import { PrismaClient } from '@prisma/client';

// Crie o cliente fora da função main para evitar múltiplas instâncias
const prisma = new PrismaClient();

async function main() {
  try {
    // Primeiro, vamos criar as categorias específicas para o e-commerce de roupas
    const categories = [
      { name: 'Casual' },
      { name: 'Academia' },
      { name: 'Formal' },
      { name: 'Party' },
    ];

    // Inserir categorias e armazenar os resultados
    const createdCategories = await Promise.all(
      categories.map((category) =>
        prisma.category.upsert({
          where: { name: category.name },
          update: {},
          create: category,
        }),
      ),
    );

    console.log(`Criadas ${createdCategories.length} categorias.`);

    // Mapear categorias por nome para facilitar o acesso
    const categoryMap: { [key: string]: number } = {};
    createdCategories.forEach((cat) => {
      categoryMap[cat.name] = cat.id;
    });

    // Array de produtos para e-commerce de roupas
    const products = [
      // Casual
      {
        title: 'Camiseta Básica Algodão',
        slug: 'camiseta-basica-algodao',
        description:
          'Camiseta confortável 100% algodão, perfeita para uso diário. Disponível em várias cores.',
        image: 'https://example.com/images/camiseta-basica.jpg',
        price: 59.9,
        originalPrice: 79.9,
        discount: 25,
        rating: 4.7,
        categoryId: categoryMap['Casual'],
      },
      {
        title: 'Jeans Slim Fit',
        slug: 'jeans-slim-fit',
        description:
          'Calça jeans com corte slim fit, design moderno e confortável para o dia a dia.',
        image: 'https://example.com/images/jeans-slim.jpg',
        price: 129.9,
        originalPrice: 169.9,
        discount: 24,
        rating: 4.5,
        categoryId: categoryMap['Casual'],
      },
      {
        title: 'Moletom Oversized',
        slug: 'moletom-oversized',
        description:
          'Moletom estilo oversized com capuz, tecido macio e quente, ideal para dias frios.',
        image: 'https://example.com/images/moletom-oversized.jpg',
        price: 149.9,
        originalPrice: 199.9,
        discount: 25,
        rating: 4.8,
        categoryId: categoryMap['Casual'],
      },

      // Academia
      {
        title: 'Camiseta Dry Fit',
        slug: 'camiseta-dry-fit',
        description:
          'Camiseta esportiva com tecnologia de secagem rápida, ideal para treinos intensos.',
        image: 'https://example.com/images/camiseta-dry-fit.jpg',
        price: 79.9,
        originalPrice: 99.9,
        discount: 20,
        rating: 4.8,
        categoryId: categoryMap['Academia'],
      },
      {
        title: 'Legging Compressão',
        slug: 'legging-compressao',
        description:
          'Legging de alta compressão com tecido respirável e cintura alta para maior suporte.',
        image: 'https://example.com/images/legging-compressao.jpg',
        price: 119.9,
        originalPrice: 149.9,
        discount: 20,
        rating: 4.9,
        categoryId: categoryMap['Academia'],
      },
      {
        title: 'Conjunto Fitness Premium',
        slug: 'conjunto-fitness-premium',
        description:
          'Conjunto fitness composto por top e legging, ideal para treinos de alta intensidade.',
        image: 'https://example.com/images/conjunto-fitness.jpg',
        price: 199.9,
        originalPrice: 249.9,
        discount: 20,
        rating: 4.7,
        categoryId: categoryMap['Academia'],
      },

      // Formal
      {
        title: 'Camisa Social Slim',
        slug: 'camisa-social-slim',
        description:
          'Camisa social com corte slim, tecido de alta qualidade e acabamento impecável.',
        image: 'https://example.com/images/camisa-social.jpg',
        price: 129.9,
        originalPrice: 169.9,
        discount: 24,
        rating: 4.6,
        categoryId: categoryMap['Formal'],
      },
      {
        title: 'Blazer Clássico',
        slug: 'blazer-classico',
        description:
          'Blazer clássico em tecido premium, perfeito para ocasiões formais ou ambiente corporativo.',
        image: 'https://example.com/images/blazer-classico.jpg',
        price: 299.9,
        originalPrice: 399.9,
        discount: 25,
        rating: 4.8,
        categoryId: categoryMap['Formal'],
      },
      {
        title: 'Calça Social Alfaiataria',
        slug: 'calca-social-alfaiataria',
        description:
          'Calça social em tecido de alfaiataria, corte reto e acabamento premium.',
        image: 'https://example.com/images/calca-social.jpg',
        price: 159.9,
        originalPrice: 199.9,
        discount: 20,
        rating: 4.7,
        categoryId: categoryMap['Formal'],
      },

      // Party
      {
        title: 'Vestido Festa Brilhante',
        slug: 'vestido-festa-brilhante',
        description:
          'Vestido de festa com aplicações de paetês, modelo justo e elegante para noites especiais.',
        image: 'https://example.com/images/vestido-festa.jpg',
        price: 259.9,
        originalPrice: 329.9,
        discount: 21,
        rating: 4.9,
        categoryId: categoryMap['Party'],
      },
      {
        title: 'Camisa Estampada Festa',
        slug: 'camisa-estampada-festa',
        description:
          'Camisa com estampa exclusiva, perfeita para festas e eventos noturnos.',
        image: 'https://example.com/images/camisa-estampada.jpg',
        price: 139.9,
        originalPrice: 179.9,
        discount: 22,
        rating: 4.6,
        categoryId: categoryMap['Party'],
      },
      {
        title: 'Conjunto Duas Peças Luxo',
        slug: 'conjunto-duas-pecas-luxo',
        description:
          'Conjunto de festa com duas peças em tecido premium, design moderno e elegante.',
        image: 'https://example.com/images/conjunto-festa.jpg',
        price: 279.9,
        originalPrice: 349.9,
        discount: 20,
        rating: 4.8,
        categoryId: categoryMap['Party'],
      },
    ];

    // Inserir produtos
    const createdProducts = await Promise.all(
      products.map((product) =>
        prisma.product.upsert({
          where: { slug: product.slug },
          update: {},
          create: product,
        }),
      ),
    );

    console.log(`Criados ${createdProducts.length} produtos.`);
  } catch (error) {
    console.error('Erro durante o seeding:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
