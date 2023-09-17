import React, { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { addDoc } from "firebase/firestore";
import { moviesCollectionRef } from "./firebase/firebase";
import swal from "sweetalert";


const AddMovie = () => {

  // useState that handle form data (add movie form)
  const [form, setForm] = useState({
    title: "",
    year: '',
    description: "",
    image: ""
  });

  // useState that handle loading spinner state
  const [loading, setLoading] = useState(false)

  // function that send data in database
  const addMovie = async () => {
    setLoading(true)
    try {
      await addDoc(moviesCollectionRef, form);
      swal({
        title: "Successfully Added",
        icon: "success",
        buttons: false,
        timer: 3000
      })
    }
    catch(err){
      swal({
        title: err,
        icon: "error",
        buttons: false,
        timer: 3000
      })
    }
    setLoading(false)
  }

  return (
    <div>
      <section className="text-white body-font relative">
        <div className="container px-5 py-8 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">
              Add New Movie
            </h1>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              {/* Title field */}
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label htmlFor="title" className="leading-7 text-sm text-white">
                    Title
                  </label>

                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="Title of Movie"
                    className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>

              {/* Year field */}
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label htmlFor="year" className="leading-7 text-sm text-white">
                    Year
                  </label>

                  <input
                    type="number"
                    placeholder="YYYY"
                    min="1900"
                    max="2050"
                    id="year"
                    name="year"
                    value={form.year}
                    onChange={(e) => setForm({ ...form, year: e.target.value })}
                    className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>

              {/* image url field */}
              <div className="p-2 w-full">
                <div className="relative">
                  <label htmlFor="image" className="leading-7 text-sm text-white">
                    Image
                  </label>

                  <input
                    id="image"
                    name="image"
                    placeholder="Movie Image Link"
                    value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                    className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  ></input>
                </div>
              </div>

              {/* description field */}
              <div className="p-2 w-full">
                <div className="relative">
                  <label htmlFor="description" className="leading-7 text-sm text-white">
                    Description
                  </label>

                  <textarea
                    id="description"
                    name="description"
                    placeholder="About Movie"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  ></textarea>
                </div>
              </div>

              {/* add button */}
              <div className="p-2 w-full">
                <button onClick={addMovie} className="flex mx-auto text-white bg-green-500 border-0 py-2 px-7 focus:outline-none hover:bg-green-600 rounded text-lg">
                  {loading ? <TailSpin height={28} color="#fff" /> : 'Add Movie'}
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddMovie;
