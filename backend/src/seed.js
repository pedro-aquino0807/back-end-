require('dotenv').config();
const { sequelize, Category, Product, ProductImage } = require('./models');

const items = [
  { name:'Tênis Urban Pro', category:'Tênis', price:399.90, discount:299.90, description:'Um clássico repaginado para acompanhar sua rotina. O Urban Pro combina conforto, versatilidade e um visual contemporâneo.', image:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85', stock:25 },
  { name:'Tênis Cloud Runner', category:'Tênis', price:529.90, discount:459.90, description:'Leveza e conforto em cada passo. Ideal para quem busca praticidade sem abrir mão do estilo.', image:'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=900&q=85', stock:18 },
  { name:'Bolsa Minimal', category:'Acessórios', price:189.90, discount:189.90, description:'Design minimalista, espaço inteligente e acabamento elegante para acompanhar todos os momentos.', image:'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85', stock:12 },
  { name:'Relógio Horizon', category:'Acessórios', price:429.90, discount:349.90, description:'Um acessório atemporal que une personalidade e funcionalidade em um só produto.', image:'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85', stock:9 },
  { name:'Jaqueta Street', category:'Roupas', price:279.90, discount:279.90, description:'Uma peça versátil para transformar produções básicas em combinações cheias de atitude.', image:'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=85', stock:15 },
  { name:'Óculos Solar Wave', category:'Acessórios', price:199.90, discount:159.90, description:'Visual marcante e proteção para os dias ensolarados. Um detalhe que faz diferença.', image:'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=85', stock:20 },
  { name:'Camiseta Essential', category:'Roupas', price:89.90, discount:89.90, description:'Conforto para todos os dias, com caimento moderno e estilo que combina com tudo.', image:'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85', stock:40 },
  { name:'Tênis Retro Classic', category:'Tênis', price:389.90, discount:329.90, description:'Inspirado nos modelos clássicos, com personalidade e conforto para o seu dia a dia.', image:'https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?auto=format&fit=crop&w=900&q=85', stock:22 }
];

(async () => {
  try {
    await sequelize.authenticate();
    const categories = {};
    for (const name of [...new Set(items.map(x => x.category))]) {
      const [category] = await Category.findOrCreate({ where:{ name }, defaults:{ name, slug:name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\s+/g,'-'), use_in_menu:true } });
      categories[name] = category;
    }
    for (const item of items) {
      const slug = item.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
      const [product] = await Product.findOrCreate({
        where:{ slug },
        defaults:{ enabled:true, name:item.name, slug, use_in_menu:false, stock:item.stock, description:item.description, price:item.price, price_with_discount:item.discount }
      });
      await product.setCategories([categories[item.category]]);
      await ProductImage.findOrCreate({ where:{ product_id:product.id, path:item.image }, defaults:{ product_id:product.id, path:item.image, enabled:true } });
    }
    console.log('Produtos e categorias demonstrativos cadastrados com sucesso.');
  } catch (error) {
    console.error('Erro ao cadastrar dados iniciais:', error.message);
    process.exitCode = 1;
  } finally {
    await sequelize.close();
  }
})();
