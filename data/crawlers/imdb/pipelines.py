# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html
import uuid
import logging
from config.db import graph
from resources.genre.genre_model import GenreModel
from resources.movie.movie_model import MovieModel
from resources.person.person_model import PersonModel


class ImdbPipeline(object):
    def open_spider(self, spider):
        logging.warning("SPIDER OPENED FROM PIPELINE")

    def close_spider(self, spider):
        logging.warning("SPIDER CLOSED FROM PIPELINE")

    def process_item(self, item, spider):
        print("Processing item in Neo4j: " + item['title'])

        # Step 1 - Creat root movie node
        movie = MovieModel(
            id=str(uuid.uuid4()),
            title=item['title'],
            year=item['year'],
            duration=item['duration'],
            summary=item['summary'],
            rating=item['rating'],
            movieUrl=item['movieUrl'])

        # Step 2 - Iterate through directors, writers and actors node, creating node and relations
        for director in item['directors']:
            person = PersonModel(id=str(uuid.uuid4()), name=director)
            person.directed.add(movie)
            person.save()

        for writer in item['writers']:
            person = PersonModel(id=str(uuid.uuid4()), name=writer)
            person.wrote.add(movie)
            person.save()

        for actor in item['actors']:
            person = PersonModel(id=str(uuid.uuid4()), name=actor)
            person.acted_in.add(movie)
            person.save()

        # Step 3 - Iterate through genre nodes, creating node and relations
        for genre in item['genres']:
            genre = GenreModel(id=str(uuid.uuid4()), name=genre.strip())
            movie.in_genre.add(genre)

        movie.save()
        return item
