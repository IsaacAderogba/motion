# -*- coding: utf-8 -*-
import scrapy
from scrapy.linkextractors import LinkExtractor
from scrapy.spiders import CrawlSpider, Rule


class BestMoviesSpider(CrawlSpider):
    name = 'best_movies'
    allowed_domains = ['imdb.com']
    user_agent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.122 Safari/537.36'

    rules = (
        Rule(LinkExtractor(
            restrict_xpaths="//h3[@class='lister-item-header']/a"),
            callback='parse_movie',
            follow=True,
            process_request="set_user_agent"),
        Rule(LinkExtractor(
            restrict_xpaths="(//a[@class='lister-page-next next-page'])[2]"),
            process_request="set_user_agent")
    )

    def start_requests(self):
        yield scrapy.Request(url='https://www.imdb.com/search/title/?genres=drama&groups=top_250&sort=user_rating,desc', headers={
            'User-Agent': self.user_agent
        })

    def set_user_agent(self, request):
        request.headers['User-Agent'] = self.user_agent
        return request

    def parse_movie(self, response):

        yield {
            "title": response.xpath("normalize-space(//div[@class='title_wrapper']/h1/text())").get(),
            "year": int(response.xpath("//span[@id='titleYear']/a/text()").get()),
            "duration": response.xpath("normalize-space(//time[1]/text())").get(),
            'summary': response.xpath("normalize-space(//div[@class='summary_text']/text())").get(),
            "rating": float(response.xpath("//span[@itemprop='ratingValue']/text()").get()),
            "movie_url": response.url,
            "genres": response.xpath("//div[contains(@class, 'see-more') and contains(@class, 'canwrap')]//a[contains(@href, 'genre')]/text()").getall(),
            'directors': response.xpath("//div[contains(@class, 'credit_summary_item') and contains(h4, 'Director')]//a[contains(@href, 'name')]/text()").getall(),
            'writers': response.xpath("//div[contains(@class, 'credit_summary_item') and contains(h4, 'Writer')]//a[contains(@href, 'name')]/text()").getall(),
            'actors': response.xpath("//div[contains(@class, 'credit_summary_item') and contains(h4, 'Star')]//a[contains(@href, 'name')]/text()").getall(),
        }
