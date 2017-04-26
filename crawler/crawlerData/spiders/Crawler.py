import scrapy

class Crawler(scrapy.Spider):
    name = "crawler"
    start_urls = ['https://phongtro123.com/tinh-thanh/ha-noi']

    def parse(self , response):
        for href in response.css('.post-link ::attr(href)').extract():
            yield scrapy.Request(response.urljoin(href) , 
                                callback=self.parse_item)
        
        curr_page = response.css('.paging ::text').extract_first()
        next_page = response.css('.next ::attr(href)').extract_first()

        if int(curr_page)  < 10:
            yield scrapy.Request(response.urljoin(next_page), callback = self.parse)
        
    def parse_item(self , response):
        house = response.css('div.list-post')[0]
        picture = house.css('.photo_item_image ::attr(data-image)').extract()
       
        
        yield{
            'city' : response.css('.ad-breadcrumbs ::text').extract()[2],
            'lat' : house.css('.maps_wrapper ::attr(data-lat)').extract_first(),
            'lng' :  house.css('.maps_wrapper ::attr(data-long)').extract_first(),
            'name' : response.css('.post-title-lg ::text').extract_first().strip(),
            'person_capacity' : 2,
            'description' : ' '.join(house.css('#motachitiet p ::text').extract()),
            'price' : house.css('.summary_item_info_price ::text').extract_first().strip(),
            'phone_number' : '0903401996',
            'public_address' : house.css('.summary_item_info ::text').extract_first().strip(),
            'room_type' : 'Entire home/apt',
            'picture_url' : picture[0],
            'pictures_url' : picture,
            }        

