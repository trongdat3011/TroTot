import scrapy
import re

class Crawler(scrapy.Spider):
    name = "crawler"
    """
    start_urls = ['https://www.airbnb.com/s/Hanoi--Vietnam?s_tag=Q4DFLfAC&allow_override%5B%5D=']

    def parse(self , response):
        yield {
            'href' : response.css('meta.itemprop="url" ::attr(content)').extract()
        }
        for href in response.css('.content ::text').extract():
            yield scrapy.Request(response.urljoin(href) , callback=self.parse_item)
    
    def parse_item(self , response) :
        def parse_price(response):
            price = response.css('.priceAmountWrapper_17axpax ::text').extract_first()
            return price[1 : ]
        
        def parse_description(response):
            return "\n".join(response.css('.description ::text').extract())
        
        def parse_phone(response):
            return "0903401996"
        def room_type(response):
            return "Entire home/apt"
        def parse_pictures_url(response) :
            return response.css('.slideshow-inline-preload ::attr(src)').extract()
        def parse_picture_url(response) :
            return response.css('.cover-photo ::attr(src)').extract_first()

        def parse_public_address(response):
            return ""
        def parse_name(response):
            return response.css('#listing_name ::text').extract()
        def parse_lat(response):
            src = response.css('.location-panel ::attr(src)').extract_first()
            res =  src[76 , 93].split(',')
            return res[0]
        def parse_lng(response):            
            src = response.css('.location-panel ::attr(src)').extract_first()
            res =  src[76 , 93].split(',')
            return res[1]
        
            
        yield{
            'city' : 'Ha Noi',
            'lat' : parse_lat(response),
            'lng' :  parse_lng(response),
            'name' : parse_name(response),
            'person_capacity' : 2,
            'description' : parse_description(response),
            'price' : parse_price(response),
            'phone_number' : '0903401996',
            'public_address' : parse_public_address(response),
            'room_type' : 'Entire home/apt',
            'picture_url' : parse_picture_url(response),
            'pictures_url' : parse_pictures_url(response),
        }
        """

    start_urls = ['https://phongtro123.com/tinh-thanh/ha-noi']

    def parse(self , response):
        for href in response.css('.post-link ::attr(href)').extract():
            yield scrapy.Request(response.urljoin(href) , 
                                callback=self.parse_item)
        
        curr_page = response.css('.current ::text').extract_first()
        next_page = response.css('.next ::attr(href)').extract_first()
        
        
        if int(curr_page)  < 4:
            yield scrapy.Request(response.urljoin(next_page), callback = self.parse)
        
    def parse_item(self , response):
        house = response.css('div.list-post')[0]
        picture = house.css('.photo_item_image ::attr(data-image)').extract()
        descriptionList = house.css('#motachitiet p ::text').extract()
        description = [] 
        for text in descriptionList :
            description.append(' '.join(text.split()))

        
        yield{
            'city' : response.css('.ad-breadcrumbs ::text').extract()[2],
            'lat' : house.css('.maps_wrapper ::attr(data-lat)').extract_first(),
            'lng' :  house.css('.maps_wrapper ::attr(data-long)').extract_first(),
            'name' : response.css('.post-title-lg ::text').extract_first().strip(),
            'person_capacity' : 2,
            'description' : '\n'.join(description),
            'price' : float(house.css('.summary_item_info_price ::text').extract_first().strip().split(' ')[0]  ) * 1000000.0 ,
            'phone_number' : '0903401996',
            'public_address' : house.css('.summary_item_info ::text').extract_first().strip(),
            'room_type' : 'Entire home/apt',
            'picture_url' : picture[0],
            'pictures_url' : picture,
        }        
