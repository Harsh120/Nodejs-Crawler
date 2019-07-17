//To crawl areas from sitemap of a city

const rp = require('request-promise');
var request = require('request');
const $ = require('cheerio');
const url = 'https://www.practo.com/sitemap/indore-listings/localities-listings/page-1';
const split_city_name1 = url.split('https://www.practo.com/sitemap/'); 
split_city_name2 = split_city_name1[1].split('/');
city = split_city_name2[0]; // To get city name
scrap(url,city);
const remain = [];
var flag = 0;
var flag1 = 0;
const pages = [];
var loop =true;
function scrap(url,city)
{
    rp(url)
    .then(function(html){
        //success!
        const Urls = [];
        
        for (var i=0;i<200;i++) {
            try
            {
                var a = ($('a', html)[i].attribs.href);  // get href
                if(a.startsWith('/sitemap/'+city+'/'))    // if href is like /sitemap/agra-listings/MG-road
                {
                    var fields = a.split(city+'/');
                    var area = fields[1];
                    console.log(area);
                    if(area.startsWith('localities-listings'))  // if href is like /sitemap/agra-listings/localities-listings/page-2 then save in remain for another page
                    {
                        if(flag==0)
                        {
                            remain.push(area);
                        }   
                    }
                    else
                    {
                        Urls.push(area);
                    }   
                }
            }
            catch(err)
            {
                console.log('Nothing');  // if area are less than number of loop then do nothing 
            }   
        }
        flag++;
        console.log(Urls);
        console.log(remain);
        if(flag1==0)
        {
            remaining(remain);
        }
        flag1++; 
    })
    .catch(function(err){
        //handle error
    });
}


function remaining(remain)  // To scrap other pagination pages
{
    console.log(remain.length);
    for(var i=0;i<remain.length;i++)
    {
        full_remain_link = 'https://www.practo.com/sitemap/'+city+'/'+remain[i];
        console.log(full_remain_link);
        scrap(full_remain_link,city);
    }
}
