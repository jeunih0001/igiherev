export const baseUrl = 'https://igihe.com/'

export interface ArticlePreview {
  image: string,
  url: string,
  title: string,
  category?: string,
  createdAt?: string,
}

export interface Article {
  author: string,
  createdAt: string,
  title: string,
  summary: string,
  image: string,
  paragraphs: string[],
  images: {url: string,alt: string}[]
}