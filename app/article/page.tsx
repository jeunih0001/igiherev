import React, { Suspense } from 'react'
import { getHtml, parseArticle } from '../[lib]/actions'
import Link from 'next/link'
import Image from 'next/image'

export const revalidate = 0

interface Props {
  searchParams: {
    q: string,
  }
}


export default async function Article({ searchParams }: Props) {
  const html = await getHtml(searchParams.q)
  const article = parseArticle(html)
  return (
    <main className="container px-4 lg:px-8 mx-auto max-w-6xl space-y-16">
      <Suspense
        fallback={
          <div className='flex items-center justify-center'>
            <div className='border-4 w-10 aspect-square border-sky-600 animate-spin border-l-transparent'></div>
          </div>
        }>
        <div className='space-y-4'>
          <h1 className='text-3xl font-bold'>
            {article.title}
            <Link href={searchParams.q} className='contents'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-2 inline size-6 text-sky-800">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
              <span className='sr-only'>View Article on Igihe</span>
            </Link>
          </h1>
          <div className='space-y-2'>
            <p className='font-medium'>
              {article.summary}
            </p>
            <div className='grid gap-1'>
              <span className='font-semibold text-sky-800'>{article.author}</span>
              <span className='text-slate-500 text-sm font-medium'>{article.createdAt}</span>
            </div>
          </div>
        </div>
        <div>
          <Image width={0} height={0} className='w-auto h-auto mx-auto' src={article.image} alt={article.title} />
        </div>
        <div className='space-y-4'>
          {article.paragraphs.map((p, index) =>
            <div className='text-slate-700' key={index} dangerouslySetInnerHTML={{ __html: p }}></div>
          )}
        </div>
        <div className='space-y-12'>
          {article.images.map((image, index) =>
            <div key={index} className='space-y-2'>
              <Image width={0} height={0}  className='w-auto h-auto mx-auto' src={image.url} alt={image.alt} />
              <p className='max-w-screen-sm mx-auto text-sm text-center text-slate-500 font-medium'>{image.alt}</p>
            </div>
          )}
        </div>
      </Suspense>
    </main>
  )
}
