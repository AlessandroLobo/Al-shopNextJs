import { globalStyles } from '@/styles/global'
import { Container, Header } from '@/styles/pages/app';
import type { AppProps } from 'next/app'

import Image from 'next/image';

import homeImg from '../../public/assets/logo.svg'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {

  return (

    <Container >
      <Header>

        <Image src={homeImg} alt="Logo" width={70} />
        Shop

      </Header>

      <Component {...pageProps} />
    </Container>
  )
}
