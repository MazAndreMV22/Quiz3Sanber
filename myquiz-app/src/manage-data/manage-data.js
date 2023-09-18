import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function App(){
    const [data, setData] = useState(null);
    const [input, setInput] = useState(
        {
          id:"", 
          name: "", 
          description:"" , 
          category :"",
          size:"", 
          price: "", 
          rating:"" , 
          image_url :"",
          release_year:"", 
          is_android_app: "", 
          is_ios_app:"" 
        }
      )

    const [fetchStatus, setFetchStatus] = useState(true)
    const [currentId, setCurrentId] = useState(-1)

    useEffect(() => {
        //fetch data dengan kondisi
        if (fetchStatus === true) {
          axios.get("https://backendexample.sanbercloud.com/api/mobile-apps")
            .then((res) => {
              setData([...res.data])
              console.log(res.data);
            })
            .catch((error) => {
              console.log(error);
            })
          setFetchStatus(false)
        }
    
      }, [fetchStatus, setFetchStatus])

    const handleInput = (event) => {
        const {name, value} = event.target;
        setInput({...input,[name]:value});
    
      };

    const handleSubmit = (event) => {
        event.preventDefault()
    
       
        let {
          id 
        } = input;

      if (currentId === -1) {

        //create data
        axios.post('https://backendexample.sanbercloud.com/api/mobile-apps', { id })
        .then((res) => {
            console.log(res);
            setFetchStatus(true);
          })
          .catch((error) => {
            alert(error);
          }, [fetchStatus, setFetchStatus])
  
      }else{
  
          // update data
          axios.put(`https://backendexample.sanbercloud.com/api/mobile-apps/${currentId}`, {id})
          .then((res) => {
            setFetchStatus(true)
          })
          .catch((error) => {
            alert(error);
          }, [fetchStatus, setFetchStatus])
      }

    setCurrentId(-1)


    setInput(
      {
        id:"", 
          name: "", 
          description:"" , 
          category :"",
          size:"", 
          price: "", 
          rating:"" , 
          image_url :"",
          release_year:"", 
          is_android_app: "", 
          is_ios_app:"" 
      }
    )
    
  }

  const handleEdit = (event) => {
    event.preventDefault()

    let id = parseInt(event.target.value)

    setCurrentId(id)

    axios.get(`https://backendexample.sanbercloud.com/api/mobile-apps/${id}`)
  .then((res) => {
    let data = res.data


setInput(
  {
    id: data.id, 
      name: data.name, 
      description:data.description , 
      category :data.category,
      size:data.size, 
      price: data.price, 
      rating:data.rating , 
      image_url :data.image_url,
      release_year : data.release_year, 
      is_android_app: data.is_android_app, 
      is_ios_app:data.is_ios_app 
  }
)

}
  )
  }
  

  const handleDelete = (event) => {

    let id = parseInt(event.target.value)

    axios.delete (`https://backendexample.sanbercloud.com/api/mobile-apps/${id}`)
    .then((res) => {
        console.log(res);
      setFetchStatus(true)
    })
    .catch((error) => {
      alert(error);
    }, [fetchStatus, setFetchStatus])

  }


    return(
        
        <>
        <div className="flex justify-center mt-20">
          <div className="rounded-xl overflow-hidden shadow-xl shadow-grey">
              <table className="p-12 text-center">
                  <thead className="bg-black text-white margin-top: 100px;">
                      <tr>
                      <th scope="col" className="px-6 py-3">
                          No.
                      </th>
                      <th scope="col" className="px-6 py-3">
                          ID
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Nama
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Desciption
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Category
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Size
                      </th><th scope="col" className="px-6 py-3">
                          Price
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Rating
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Image
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Year
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Android
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Ios
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Action
                      </th>
                      </tr>
                  </thead>
                  <tbody>
                  { data !== null &&
                    data.map ((res, index) => {
                        return (
                            <>
                            <tr key={index} className='bg-white border-b'>
                              <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                              {index+1}
                              </td>
                              <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                                {res.id}
                              </td>
                              <td className='px-6 py-4 whitespace-nowrap text-sm font-light text-gray-900'>
                              {res.name}
                              </td>
                              <td className='px-2 py-2 font-light text-gray-900'>
                              {res.description}
                              </td>
                              <td className='px-6 py-4 whitespace-nowrap text-sm font-light text-gray-900'>
                              {res.category}
                              </td>
                              <td className='px-6 py-4 whitespace-nowrap text-sm font-light text-gray-900'>
                              {res.size}
                              </td>
                              <td className='px-6 py-4 whitespace-nowrap text-sm font-light text-gray-900'>
                              {res.price}
                              </td>
                              <td className='px-6 py-4 whitespace-nowrap text-sm font-light text-gray-900'>
                              {res.rating}
                              </td>
                              <td className='px-6 py-4  font-light text-gray-900'>
                              {res.image_url}
                              </td>
                              <td className='px-6 py-4 whitespace-nowrap text-sm font-light text-gray-900'>
                              {res.release_year}
                              </td>
                              <td className='px-6 py-4 whitespace-nowrap text-sm font-light text-gray-900'>
                              {res.is_android_app}
                              </td>
                              <td className='px-6 py-4 whitespace-nowrap text-sm font-light text-gray-900'>
                              {res.is_ios_app}
                              </td>
                              <td className="px-6 py-4 flex">
                        <button type="button" class="text-white bg-green-900 hover:bg-grey focus:ring-4 focus:ring-grey font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-900 dark:hover:bg-green-900 focus:outline-none dark:focus:ring-green-900 border-2">Display</button>
                        <button type="button" class="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-red-900"
                        onClick={handleEdit} value={res.id}>Edit</button>
                        <button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                        onClick={handleDelete} value={res.id}>Delete</button>
                         </td>
                            </tr>
                                                      </>
                          );
                        })}
                  </tbody>
            </table>
        </div>
        </div>
        <div className="flex justify-center mt-10" >
      <div className="rounded-xl overflow-hidden shadow-xl shadow-grey ">
        <div className='px-10 py-3' >
<form onSubmit= {handleSubmit} >
  <div className="mb-6" >
    <label htmlFor="id" className=" mb-2 text-sm font-medium text-gray-900 dark:text-white">Masukkan ID</label>
    <input type="text" onChange={handleInput} value={input.id} name='id' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Masukkan ID" required />
  </div>
  <div className="mb-6">
    <label htmlFor="nama" className=" mb-2 text-sm font-medium text-gray-900 dark:text-white">Masukkan Nama</label>
    <input type="text" onChange={handleInput} value={input.name} name='name' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Masukkan Nama" required />
  </div>
  <div className="mb-6">
    <label htmlFor="description" className=" mb-2 text-sm font-medium text-gray-900 dark:text-white">Masukkan Deskripsi</label>
    <input type="text" onChange={handleInput} value={input.description} name='description' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Masukkan Deskripsi" required />
  </div>
  <div className="mb-6">
    <label htmlFor="category" className=" mb-2 text-sm font-medium text-gray-900 dark:text-white">Masukkan Category</label>
    <input type="text" onChange={handleInput} value={input.category} name='category' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-60 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Masukkan Category" required />
  </div>
  <div className="mb-6">
    <label htmlFor="size" className=" mb-2 text-sm font-medium text-gray-900 dark:text-white">Masukkan Size</label>
    <input type="text" onChange={handleInput} value={input.size} name='size' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Masukkan Size" required />
  </div>
  <div className="mb-6">
    <label htmlFor="price" className=" mb-2 text-sm font-medium text-gray-900 dark:text-white">Masukkan Price</label>
    <input type="text" onChange={handleInput} value={input.price} name='price'className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Masukkan Price" required />
  </div>
  <div className="mb-6">
    <label htmlFor="rating" className=" mb-2 text-sm font-medium text-gray-900 dark:text-white">Masukkan Rating</label>
    <input type="text" onChange={handleInput} value={input.rating} name='rating'className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Masukkan Rating" required />
  </div>
  <div className="mb-6">
    <label htmlFor="image_url" className=" mb-2 text-sm font-medium text-gray-900 dark:text-white">Masukkan url Image</label>
    <input type="text" onChange={handleInput} value={input.image_url} name='image_url' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-60 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Masukkan Url Image" required />
  </div>
  <div className="mb-6">
    <label htmlFor="release_year" className=" mb-2 text-sm font-medium text-gray-900 dark:text-white">Masukkan Tahun</label>
    <input type="text" onChange={handleInput} value={input.release_year} name='release_year' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Masukkan Tahun" required />
  </div>
  <div className="mb-6">
    <label htmlFor="is_android_app" className=" mb-2 text-sm font-medium text-gray-900 dark:text-white">Ada Android ?</label>
    <input type="text" onChange={handleInput} value={input.is_android_app} name='is_android_app' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Masukkan Android" required />
  </div>
  <div className="mb-6">
    <label htmlFor="is_ios_app" className=" mb-2 text-sm font-medium text-gray-900 dark:text-white">Ada IOS ?</label>
    <input type="text" onChange={handleInput} value={input.is_ios_app} name='is_ios_app' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-60 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Masukkan Ios" required />
  </div>
  <button type={'submit'} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
</form>
</div>
</div>
</div>

                    </>
                    )
}