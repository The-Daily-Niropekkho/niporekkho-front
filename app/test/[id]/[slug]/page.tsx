import React from 'react'

function page({ slug,params }: any) {
    console.log('params', params, slug);
  return (
      <div>{params.id}/{params.slug}</div>
  )
}

export default page