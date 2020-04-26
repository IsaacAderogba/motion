# -*- coding: utf-8 -*-
import scrapy
from scrapy.linkextractors import LinkExtractor
from scrapy.spiders import CrawlSpider, Rule


class BestMoviesSpider(CrawlSpider):
    name = 'best_movies'
    allowed_domains = ['imdb.com']
    start_urls = [
        'https://www.imdb.com/search/title/?genres=drama&groups=top_250&sort=user_rating,desc']

    rules = (
        Rule(LinkExtractor(
            restrict_xpaths="//h3[@class='lister-item-header']/a"), callback='parse_movie', follow=True),

    )

    def parse_movie(self, response):
        print(response.url)

    def parse_person(self, response):
        print(response.url)
