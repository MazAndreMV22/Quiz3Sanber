import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';


export default function App (){
  const [data, setData] = useState(null);

    useEffect(() => {
        axios
          .get( "https://backendexample.sanbercloud.com/api/mobile-apps" )
          .then( (res) => {
            setData([...res.data]);
            console.log(res.data);
          } )
          .catch((error) => {
            console.log(error);
          });
      
          },[]);
      
          console.log(data);

          const handleIndexAndroid = (param) => {
            if (param == 1 ) {
              return "Android";
          } else {
            return "Tidak Support Android";
          }
          };
          const handleIndexios = (param) => {
            if (param == 1 ) {
              return "Ios";
          } else {
            return "Tidak Support Ios";
          }
          };

          const handleIndexgiga = (param) => {
           return param / 1000 
              
          };
          const handleIndexfree = (param) => {
            if (param == 0 ) {
              return "FREE"; 
            }else{
              return param;
            }
           };


  return (
  
  <div>
  <section className="bg-gray-200 p-5">
    <div className="container mx-auto mt-10">
      <h1 className="text-xl font-bold ">Find your data that you need!</h1>
    </div>
    <div className="container mx-auto flex-wrap flex gap-10 items-center justify-start">
      {/* Batas awal Card section */}
      { data !== null &&
                    data.map ((res) => {
                        return (
                          <div className="mt-10 h-72 flex max-w-xl bg-white shadow-lg rounded-lg overflow-hidden">
        <img src={res.image_url} className="w-1/3 bg-cover bg-center bg-landscape" />
        <div className="w-2/3 p-4">
          
          <h1 className="text-gray-900 font-bold text-2xl">
            {res.name}
          </h1>
          <small>{res.year}</small>
          <p className="mt-2 text-gray-600 text-sm">
          {res.description}
          </p>
          <div className=" item-center mt-2 text-gray-500">
            <p><span>{res.category}</span></p>
            <span>{handleIndexgiga(res.size)}</span> .Gb
            <span>, {handleIndexAndroid(res.is_android_app)} &amp; {handleIndexios(res.is_ios_app)}</span>
          </div>
          <div className="flex item-center justify-between mt-3">
            
            <h1 className="text-gray-700 font-bold text-xl"  id="rupiah"  > 
            {handleIndexfree(res.price)}
            </h1>
            <button className="px-3 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded">
            {res.rating}
            </button>
          </div>
        </div>
      </div>
                        )
                    })
                  }
      
    </div>
  </section>
                      
</div>

);

}