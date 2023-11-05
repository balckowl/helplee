import React from 'react'
import { Helmet } from 'react-helmet-async'

const CommonMeta = ({ title }) => {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  )
}

export default CommonMeta