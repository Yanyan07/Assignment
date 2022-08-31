import React from 'react';
import axios from 'axios';
import './index.css';

export default function() {

  const [people, setPeople] = React.useState([]);
  const [languages, setlanguages] = React.useState([]);
  const [name, setName] = React.useState('');
  const [pages, setPages] = React.useState([]);

  React.useEffect(()=>{
    axios.get('http://localhost:3000/api/v1/people').then(
      response => {
        setPeople(people => response.data);
      },
      error => {
        console.log('fail', error);
      }
    )
    axios.get('http://localhost:3000/api/v1/languages').then(
      response => {
        setlanguages(languages => response.data);
      },
      error => {
        console.log('fail', error);
      }
    )
  }, [])

  // function async search(e){
  const search = async(e)=>{
    const name = e.target.innerHTML.replace(' ','_');
    let item = null;
    let itemId = null;
    let sites = null;
    let pagesTemp = [];
    setName(name => e.target.innerHTML);

    try {
      const res1 = await axios.get(`https://en.wikipedia.org/w/api.php?action=query&prop=pageprops&format=json&origin=*&titles=${name}`);
      item = res1.data.query.pages;
      const pageAttr = Object.keys(item)[0];
      itemId = item[pageAttr].pageprops.wikibase_item;

      const res2 = await axios.get(`https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&origin=*&props=sitelinks&ids=${itemId}`);
      sites = res2.data.entities[itemId].sitelinks;
      let page = {};
      for(const site of Object.keys(sites)) {
        const abbrStr = site.replace('wiki', '');
        for(const language of languages) {
          page = {};
          if(language.abbr === abbrStr){
            const res3 = await axios.get(`http://${abbrStr}.wikipedia.org/w/api.php?format=json&origin=*&action=query&list=search&srwhat=nearmatch&srlimit=1&srsearch=${name}`);
            page.lang = language.name;
            page.link = `https://${abbrStr}.wikipedia.org/wiki/${e.target.innerHTML}`;

            if(res3.data.query.search.length !== 0){
              page.word_count = res3.data.query.search[0].wordcount;
            }else {
              page.word_count = 'UNKNOWN';
            }  
            pagesTemp.push(page);   
          }
        }
      } 
      setPages(pages => pagesTemp);
    }catch(error) {
      console.log('request error', error);
    }
  }
  
  return (
    <div className='container'>
      <h2>Click famous people to show their pages in different languages</h2>
      <table className='tab tab1'>
        <thead>
          <tr>
            <th colSpan={2}>Famous people:</th>
          </tr>
        </thead>
        <tbody>
          {
            people.map(person => {
              return (
                <tr key={person.id} onClick={search}>
                  <td>{person.name}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>

      {
        pages.length===0 ? null : 
        <table className='tab tab2'>
          <thead>
            <tr>
              <th colSpan={3}>Wikipedia pages for {name}:</th>
            </tr>
          </thead>
          <tbody>
            {
              pages.map((page,index) => {
                return (
                  <tr key={index}>
                    <td>{page.lang}</td>
                    <td><a href={page.link} target='_blank' rel="noreferrer">Link</a></td>
                    <td>Word count: {page.word_count}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      }   
    </div>
  )
}