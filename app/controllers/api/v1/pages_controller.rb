class Api::V1::PeopleController < ApplicationController
  def index 
    # res1 = axios.get(`https://en.wikipedia.org/w/api.php?action=query&prop=pageprops&format=json&origin=*&titles=${name}`);
    # item = res1.data.query.pages;
    # pageAttr = Object.keys(item)[0];
    # itemId = item[pageAttr].pageprops.wikibase_item;
    render json: res1
  end
end