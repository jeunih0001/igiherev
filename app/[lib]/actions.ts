import axios from "axios";
import cheerio from 'cheerio'
import { Article, ArticlePreview, baseUrl } from "./schema";



export async function getHtml(url: string): Promise<string>{
  const response = await axios.get(url, 
    {
      
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36',
        'Accept-Encoding': 'gzip, compress, deflate, br',
        'Host': 'igihe.com',
        'Connection': 'keep-alive'      }
    }
  )
  console.log(response)
  return response.data
}

export function parseHeadlines(html: string): ArticlePreview[]{
  const $ = cheerio.load(html)
  const headlines: ArticlePreview[] = []
  $(".news_y").each(function () {
    const image = baseUrl + $(this).find('.img-responsive').attr('src')
    const url = baseUrl + $(this).find('a').attr('href')
    const title = $(this).find('.homenews-title').text()
    const headline: ArticlePreview = {image,url,title}
    headlines.push(headline)
  })

  return headlines

}
export function parseArticles(html: string): ArticlePreview[]{
  const $ = cheerio.load(html)

  const articles: ArticlePreview[] = []

  $(".article-wrap").each(function () {
    const category = $(this).find('.hierarchi-rubrique').text()
    const createdAt = $(this).find('.time a').text()
    const image = baseUrl + $(this).find('.lazy.img-responsive').attr('data-original');
    const title = $(this).find('.homenews-title').text();
    const url = baseUrl + $(this).find(".homenews-title a").attr("href");
    const article: ArticlePreview = {image,url,title,category,createdAt}

    articles.push(article)

  });

  return articles
}

export function parseArticle(html: string): Article {
  const $ = cheerio.load(html)
  const author = $(".author").text().trim();
  const createdAt = $(".date_x").text().replace("Kuya", "").replace(" saa", "").trim();
  const title = $(".title-article").text();
  const summary = $(".surtitre").text();
  const image = baseUrl + $(".text-article img").first().attr("src");
  const paragraphs: string[] = [];
  $(".fulltext > p").each(function () {
    paragraphs.push($(this).text());
  });
const images: {url: string,alt: string}[] = [];
  $(".fulltext center").each(function () {
    const url = baseUrl + $(this).find("img").attr("src");
    const alt = $(this).text().replace(/\n/g, "");
    images.push({url,alt});
  })
  return {author,createdAt,title,summary,image,images,paragraphs}
}