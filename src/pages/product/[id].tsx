import { stripe } from '@/lib/stripe' // Importações no início do arquivo
import { ImageContainer, ProductContainer, ProductDetails } from '@/styles/pages/product'
import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Stripe from 'stripe'

interface ProductProps {
  product: {
    id: string,
    name: string,
    imageUrl: string,
    price: string,
    description: string,
  }
}

export default function Product({ product }: ProductProps) {
  const { query } = useRouter() // Obtenção de rota

  return (
    <ProductContainer>
      <ImageContainer>
        {/* // Uso de imagem otimizada */}
        <Image src={product.imageUrl} width={520} height={480} alt='imagem de uma camiseta' />
      </ImageContainer>

      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>
        <p>{product.description}</p>
        <button>
          Comprar agora
        </button>
        <Link href="/" prefetch={false}>
          Voltar
        </Link>
      </ProductDetails>

    </ProductContainer>
  )
}

export const getStaticPaths: GetStaticPaths = async () => { // Uso de tipos explícitos para funções
  const products = await stripe?.products?.list({ limit: 100 });
  const paths = products?.data.map((product) => ({
    params: { id: product.id },
  }));
  return {
    paths: paths || [], // Uso do operador OR para fornecer um valor padrão
    fallback: 'blocking', // Uso de fallback 'blocking' para melhorar a experiência do usuário
  };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  const productId = params?.id;
  const product = productId ? await stripe?.products?.retrieve(productId, {
    expand: ['default_price']
  }) : null;

  if (!product) {
    return {
      notFound: true, // Retorno de erro caso o produto não seja encontrado
    }
  }

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id || '',
        name: product.name || '',
        imageUrl: product.images?.[0] || '',
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(price?.unit_amount ? price.unit_amount / 100 : 0), // Formatação de preço
        description: product.description || ''
      }
    },
    revalidate: 60 * 60 * 1 // 1 hora de revalidação
  }
}
