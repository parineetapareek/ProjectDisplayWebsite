import React from 'react';
import Cards from './Cards';
import list from "../../public/list.json";

function Browse() {
  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 grid">
        <div className=" mt-28 items-center justify-center text-center">
          <h1 className=" text-2xl md:text-4xl">We're Delighted to have you here</h1>
          <p className='mt-7'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti esse accusamus odit accusantium impedit iste aliquid suscipit a quos ipsam?Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam sunt laborum explicabo tenetur quae iusto repudiandae fugiat eligendi pariatur optio! Quaerat excepturi ad accusantium odit pariatur quo autem cumque aut.
          </p>
        </div>
        <div className=" mt-12 grid grid-cols-1 md:grid-cols-3 ">
          {
            list.map((item) => (
              <Cards key={item.id} item={item} />
            ))
          }
        </div>
      </div>
    </>
  );
}

export default Browse;