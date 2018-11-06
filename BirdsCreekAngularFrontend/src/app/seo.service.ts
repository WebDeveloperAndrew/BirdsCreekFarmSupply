import { Injectable } from '@angular/core';
import { Meta} from '@angular/platform-browser';

@Injectable()
export class SeoService {

  constructor(private meta: Meta) { }

  generateTags(config)
  {
    var siteurl= "irwinprogramming.com";
    config = {
      title: 'Home Page',
      description: 'A family-owned farm supply business in Birds Creek just north of Bancroft, Ontario',
      image: '/assets/img/logo.jpg',
      slug: '',
      ...config

    }

    this.meta.updateTag({name: 'twitter:card', content:'summary'});
    this.meta.updateTag({name: 'twitter:site', content:'Birdsreekfarmsupply'});
    this.meta.updateTag({name: 'twitter:title', content:config.title});
    this.meta.updateTag({name: 'twitter:description', content:config.description});
    this.meta.updateTag({name: 'twitter:image', content:siteurl+config.image});
    this.meta.updateTag({name: 'description', content:config.description});
    this.meta.updateTag({property: 'og:title', content:config.title});
    this.meta.updateTag({property: 'og:image', content:siteurl+config.image});
    this.meta.updateTag({property: 'og:description', content:config.description});
    this.meta.updateTag({property: 'og:url', content:siteurl+config.slug});

  }
}
