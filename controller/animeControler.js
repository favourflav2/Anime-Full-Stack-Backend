import Jikan from "jikan4.js";
import mongoose from "mongoose";
import User from "../model/userModal.js";

export async function printSearch(req, res) {
  const { title } = req.body;
  //console.log(title);
  const { page } = req.query;

  let p = "Attack on Titan";
  let g = "Attack On Titan";

  const limit = 8;
  const startIndex = Number(page - 1) * limit;
  const endIndex = page * limit;

  try {
    if (title == p) {
      const client = new Jikan.Client();
      const result = await client.anime.search("Shingeki no Kyojin");
      let newResult2 = result.map(item => {
        return {
        id:item.id,
        score:item.score,
        title:item.title,
        url:item.url,
        image:item.image,
        genres: item.genres,
        episodes: item.episodes,
        synopsis: item.synopsis,
        trailer: item.trailer? item.trailer : null
        }
      })
      const total = result.length;
      const resultData = newResult2;
      const newResult = {
        data: resultData,
        currentPage: Number(page),
        total: total,
        numberOfPages: Math.ceil(total / limit),
      };

      res.status(200).json(newResult);
    } else if (title == g) {
      const client = new Jikan.Client();
      const result = await client.anime.search("Shingeki no Kyojin");
      let newResult2 = result.map(item => {
        return {
        id:item.id,
        score:item.score,
        title:item.title,
        url:item.url,
        image:item.image,
        genres: item.genres,
        episodes: item.episodes,
        synopsis: item.synopsis,
        trailer: item.trailer? item.trailer : null
        }
      })
      const total = result.length;
      const resultData = newResult2;
      const newResult = {
        data: resultData,
        currentPage: Number(page),
        total: total,
        numberOfPages: Math.ceil(total / limit),
      };

      res.status(200).json(newResult);
    } else {
      const client = new Jikan.Client();
      const result = await client.anime.search(title);
      let newResult2 = result.map(item => {
        return {
        id:item.id,
        score:item.score,
        title:item.title,
        url:item.url,
        image:item.image,
        genres: item.genres,
        episodes: item.episodes,
        synopsis: item.synopsis,
        trailer: item.trailer? item.trailer : null
        }
      })
      const total = result.length;
      const resultData = newResult2;
      const newResult = {
        data: resultData,
        currentPage: Number(page),
        total: total,
        numberOfPages: Math.ceil(total / limit),
      };

      res.status(200).json(newResult);
    }

    // const client = new Jikan.Client();
    //    const result = await client.anime.search(title);
    //     res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res.status(404).json({ msg: e.message });
  }
}

export async function topAnime(req, res) {
  try {
    const client = new Jikan.Client();
    const result = await client.top.listAnime({ filter: "bypopularity" });
    const gas = (await client.anime.listTop({ filter: "bypopularity" })).slice(
      10
    );
    let result2 = result.slice(10);
    //console.log(result2);
    res.status(200).json(gas);
  } catch (e) {
    console.log(e);
    res.status(200).json({ msg: e.message });
  }
}

export async function topAnimeQuery(req, res) {
  const { page } = req.query;
  const limit = 8;
  try {
    const client = new Jikan.Client();
    const result = await client.top.listAnime({ filter: "bypopularity" });
    let result2 = result.slice(10);
    const total = result.length;

    let newResult2 = result.map(item => {
      return {
      id:item.id,
      score:item.score,
      title:item.title,
      url:item.url,
      image:item.image,
      genres: item.genres,
      episodes: item.episodes,
      synopsis: item.synopsis,
      trailer: item.trailer? item.trailer : null
      }
    })
    //console.log(newResult2)

    // let newResult = {
    //   id:result.id,
    //   score:result.score,
    //   title:result.title,
    //   url:result.url,
    //   image:result.image,
    //   genres: result.genres,
    //   episodes: result.episodes,
    //   synopsis: result.synopsis,
    //   trailer: result.trailer? result.trailer : null
    // }

    //console.log(result)

    res.status(200).json({
      data: newResult2,
      currentPage: Number(page),
      total: total,
      numberOfPages: Math.ceil(total / limit),
    });
  } catch (e) {
    console.log(e);
    res.status(200).json({ msg: e.message });
  }
}

export async function bestAnime(req, res) {
  const client = new Jikan.Client();
  try {
    // const data = await client.anime.get()
    // ,42310,
    // 34599,
    // 54385,
    // 36903,
    // 1575,
    // 31966,
    // 32827,
    // 44511,
    // 11061,
    // 34572,
    // 10218,
    // 1535,
    // 38000,
    // 777,
    // 37520,
    // 39535,
    // 37569,
    // 28623,
    // 31580,
    // 39519
    let array = [
      16498, 37521, 53323, 41457, 42310, 34599, 54385, 36903, 1575, 31966,
      32827, 44511, 11061, 34572, 10218, 1535, 38000, 777, 37520, 39535, 37569,
      28623, 31580, 39519,
    ];
    const anohter = "parasyte";

    async function getAnime(){
      
      let arr = []
      for(const item of array){
         const data = await client.anime.get(item)
         if(data){
          //console.log(data.id)
          //score
          //title
          //url
          let newResult = {
            id:data.id,
            score:data.score,
            title:data.title,
            url:data.url,
            image:data.image
          }
          //console.log(newResult)
          arr.push(newResult)
         }
         
      }
      //const data = await client.anime.get(id)
      
      return arr
  }

   
  
  
  let result = await getAnime()
  res.status(200).json(result)
  } catch (e) {
    console.log(e);
    res.status(200).json({ msg: e.message });
  }
}
