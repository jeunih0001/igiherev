import { cache } from "react";
import { parseArticles, parseHeadlines, getHtml } from "./[lib]/actions";
import { baseUrl } from "./[lib]/schema";
import Link from "next/link";
import Image from "next/image";

export const revalidate = 3600;

export default async function Home() {
  const html = await getHtml(baseUrl)
  const [headlines, articles] = await Promise.all([
    parseHeadlines(html),
    parseArticles(html)
  ])

  const categories = articles.reduce((acc: string[], article) => {
    if (!acc.includes(article.category!)) acc.push(article.category!)
    return acc
  }, [])
  return (
    <main className="container px-4 lg:px-8 mx-auto max-w-6xl space-y-16">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold">Headlines</h2>
        <div className="grid gap-8 grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
          {headlines.map((article, index) =>
            <div key={index} className="space-y-4">
              <Link href={`article?q=${article.url}`} className="contents">
                <Image width={0} height={0} className="w-full object-cover aspect-video" src={article.image} alt={article.title} />
              </Link>
              <div>
                <Link href={`article?q=${article.url}`}>
                  <h3 className="line-clamp-2 text-sm font-semibold hover:underline">{article.title}</h3>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="grid items-start gap-12 md:grid-cols-[3fr,1fr]">
        <div className="space-y-4 py-4">
          <h2 className="text-3xl font-bold">Latest</h2>
          <div className="grid divide-y">
            {articles.map((article, index) =>
              <div key={index} className="py-3 grid gap-4 grid-cols-[auto,1fr] items-start">
                <Link href={`article?q=${article.url}`} className="contents">
                  <Image width={0} height={0}  src={article.image} className="aspect-video w-28 md:w-44  object-cover" alt={article.title} />
                </Link>
                <div className="max-w-md space-y-2">
                  <Link href={`article?q=${article.url}`}>
                    <h3 className="text-sm font-semibold hover:underline">
                      {article.title}
                    </h3>
                  </Link>
                  <div className="font-semibold text-sm">
                    <span className="text-slate-500">
                      {article.category}
                    </span>
                    <span className="mx-2">|</span>
                    <span>
                      {article.createdAt}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="hidden md:block space-y-4 py-4 sticky top-14">
          <h2 className="text-3xl font-bold">Categories</h2>
          <div className="grid divide-y">
            {categories.sort().map((category, index) =>
              <Link key={index} href={'/'} className="text-slate-500 font-semibold py-2 hover:text-slate-800 transition-colors text-sm">
                {category}
              </Link>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
