import Image from "next/image"
import Link from "next/link"

import Head from "next/head"

import { HomeContainer, Product } from "@/styles/pages/home"

import { useKeenSlider } from 'keen-slider/react'

import "keen-slider/keen-slider.min.css"

import 'keen-slider/keen-slider.min.css'
import { stripe } from "@/lib/stripe"
import { GetStaticProps } from "next"
import Stripe from "stripe"

interface HomeProps {
  products: {
    id: string,
    name: string,
    imageUrl: string,
    price: number,
  }[]
}

const animation = { duration: 20000, easing: (t: number) => t }

// A função principal que renderiza a página Home
export default function Home({ products }: HomeProps) {
  // Configuração e uso do slider do Keen Slider
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: "auto",
      spacing: 48,
    },
    loop: true,
    renderMode: "performance",
    drag: true,
    created(s) {
      s.moveToIdx(0.5, true, animation)
    },
    updated(s) {
      s.moveToIdx(s.track.details.abs + 0.5, true, animation)
    },
    animationEnded(s) {
      s.moveToIdx(s.track.details.abs + 0.5, true, animation)
    },
  });

  // Renderização dos produtos utilizando o Link do Next.js e o componente de estilização Product
  return (
    <>
      <HomeContainer ref={sliderRef} className="keen-slider">

        <Head>
          <title>Home | Al Shop</title>
        </Head>

        {products.map(product => {
          return (
            <Link href={`/product/${product.id}`} key={product.id} prefetch={false}>
              <Product className="keen-slider__slide" >
                <Image src={product.imageUrl} width={520} height={480} alt="" />
                <footer>
                  <strong>{product.name}</strong>
                  <span>{product.price}</span>
                </footer>
              </Product>
            </Link>
          )
        })}

      </HomeContainer>
    </>
  )
}

// Função assíncrona que busca os produtos do Stripe e retorna como props para a Home
export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price;

    // Formatação do preço utilizando o Intl.NumberFormat e o Real Brasileiro (BRL)
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(price?.unit_amount ? price.unit_amount / 100 : 0),
    }
  })

  // Retorno dos produtos e o tempo de revalidação em segundos
  return {
    props: {
      products,
      revalidate: 60 * 60 * 2, // 2 horas,
    },
  }
}
