import { styled } from "..";

export const ProductContainer = styled('main', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  alignItems: 'stretch',
  gap: '4rem',
  maxWidth: 1180,
  margin: '0 auto',
  '@media (max-width: 768px)': {
    gridTemplateColumns: '1fr',
    gap: '2rem',
    padding: '0 2rem'
  }
});

export const ImageContainer = styled('div', {
  width: '100%',
  maxWidth: 576,
  height: 656,
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  padding: '0.25rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  img: {
    objectFit: 'contain',
    maxWidth: '100%',
    maxHeight: '100%',
  }
});

export const ProductDetails = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%',
  h1: {
    fontSize: '$2xl',
    color: '$gray300',
  },
  span: {
    marginTop: '1rem',
    display: 'block',
    fontSize: '$2xl',
    color: '$green300',
  },
  p: {
    marginTop: '2.5rem',
    fontSize: '$md',
    lineHeight: 1.6,
    color: '$gray300',
  },
  button: {
    height: '5rem',
    marginTop: 'auto',
    backgroundColor: '$green500',
    border: 0,
    color: '$white',
    borderRadius: 8,
    padding: '1.25rem',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '$md',
    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
    },
    '&:not(:disabled):hover': {
      backgroundColor: '$green300',
    }
  },
  a: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textDecoration: 'none',
    height: '5rem',
    marginTop: '2rem',
    backgroundColor: '$green500',
    border: 0,
    color: '$white',
    borderRadius: 8,
    padding: '1.25rem',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '$md',
    textAlign: 'center',
    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
    },
    '&:not(:disabled):hover': {
      backgroundColor: '$green300',
    },
    '@media (max-width: 768px)': {
      marginTop: '1rem'
    }
  },
});
